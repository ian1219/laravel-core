/* ==========================================================================
   Live demos — interactive "play with it" widgets.
   Usage:  <div class="demo" data-demo="api-playground"></div>
   Demos:  api-playground, encapsulation, inheritance, abstraction,
           polymorphism, di, put-patch, journey (wraps authored .j-step items)
   Also:   .flip-card buttons flip on click.
   ========================================================================== */

(function () {
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Tiny PHP-ish colouring for one-line snippets shown in consoles */
  function php(code) {
    if (window.LBHighlight) {
      return window.LBHighlight.tokenize(code, "php")
        .map(function (t) {
          return t[0] ? '<span class="tok-' + t[0] + '">' + esc(t[1]) + "</span>" : esc(t[1]);
        })
        .join("");
    }
    return esc(code);
  }

  function json(value) {
    if (value === undefined) return "";
    var str = JSON.stringify(value, null, 2);
    return window.LBHighlight
      ? window.LBHighlight.tokenize(str, "json")
          .map(function (t) {
            return t[0] ? '<span class="tok-' + t[0] + '">' + esc(t[1]) + "</span>" : esc(t[1]);
          })
          .join("")
      : esc(str);
  }

  function shell(el, icon, title, bodyHtml) {
    el.innerHTML =
      '<div class="demo-head"><span aria-hidden="true">' + icon + "</span><strong>" + esc(el.getAttribute("data-title") || title) +
      '</strong><span class="live-dot">LIVE</span></div><div class="demo-body">' + bodyHtml + "</div>";
    return el.querySelector(".demo-body");
  }

  function makeConsole(pre, max) {
    var lines = [];
    return {
      log: function (html) {
        lines.push('<span class="flash">' + html + "</span>");
        if (lines.length > (max || 8)) lines.shift();
        pre.innerHTML = lines.join("\n");
        pre.scrollTop = pre.scrollHeight;
      },
      clear: function (html) {
        lines = [];
        pre.innerHTML = html || "";
      },
    };
  }

  var DEMOS = {};

  /* ------------------------------------------------------------------------
     API playground: a fake Laravel API with soft deletes, running in the page
     ------------------------------------------------------------------------ */
  DEMOS["api-playground"] = function (el) {
    var seed = function () {
      return [
        { id: 1, title: "Hello Laravel", body: "My first post", status: "published", deleted_at: null },
        { id: 2, title: "PUT vs PATCH", body: "Explained simply", status: "draft", deleted_at: null },
        { id: 3, title: "Soft deletes", body: "Gone, but not forever", status: "published", deleted_at: null },
      ];
    };
    var posts = seed();
    var nextId = 4;
    var lastChanged = null;

    var PRESETS = [
      { label: "📋 Get all", m: "GET", u: "/api/posts" },
      { label: "🔎 Get one", m: "GET", u: "/api/posts/1" },
      { label: "➕ Create", m: "POST", u: "/api/posts", b: { title: "My new post", body: "Hello world!", status: "draft" } },
      { label: "♻️ Replace (PUT)", m: "PUT", u: "/api/posts/1", b: { title: "Brand new title", body: "Brand new body", status: "draft" } },
      { label: "✏️ Edit part (PATCH)", m: "PATCH", u: "/api/posts/2", b: { status: "published" } },
      { label: "🗑️ Soft delete", m: "DELETE", u: "/api/posts/3" },
      { label: "👻 Get incl. trashed", m: "GET", u: "/api/posts?with_trashed=1" },
      { label: "↩️ Restore", m: "POST", u: "/api/posts/3/restore" },
      { label: "💥 Force delete", m: "DELETE", u: "/api/posts/3/force" },
    ];

    var body = shell(
      el,
      "🛰️",
      "API Playground — a pretend Laravel API",
      '<p class="demo-hint">Click a preset (or type your own request) and press <b>Send</b>. The table at the bottom is the “database” — watch it change.</p>' +
        '<div class="demo-btns">' +
        PRESETS.map(function (p, i) {
          return '<button type="button" class="dbtn" data-preset="' + i + '">' + p.label + "</button>";
        }).join("") +
        '<button type="button" class="dbtn danger" data-reset>🔄 Reset data</button></div>' +
        '<div class="pg-grid"><div>' +
        '<span class="pg-label">Request</span>' +
        '<div class="pg-reqline"><select aria-label="HTTP method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select>' +
        '<input type="text" aria-label="URL" value="/api/posts" spellcheck="false"></div>' +
        '<span class="pg-label">JSON body</span><textarea class="pg-body" spellcheck="false" aria-label="JSON body"></textarea>' +
        '<button type="button" class="dbtn primary pg-send">🚀 Send request</button>' +
        "</div><div>" +
        '<span class="pg-label">Response</span><span class="pg-status">waiting…</span>' +
        '<pre class="console pg-out">Press “Send request” to see the JSON response here.</pre>' +
        '<div class="pg-explain">👋 Pick a preset above to start.</div>' +
        "</div></div>" +
        '<div class="pg-table-wrap"><span class="pg-label">🗄️ posts table (the database)</span><table class="pg-table"><thead><tr><th>id</th><th>title</th><th>body</th><th>status</th><th>deleted_at</th></tr></thead><tbody></tbody></table></div>'
    );

    var method = body.querySelector("select");
    var url = body.querySelector("input");
    var bodyInput = body.querySelector(".pg-body");
    var statusEl = body.querySelector(".pg-status");
    var out = body.querySelector(".pg-out");
    var explain = body.querySelector(".pg-explain");
    var tbody = body.querySelector("tbody");

    function cell(v) {
      return v === null ? '<span class="nullv">null</span>' : esc(v);
    }

    function renderTable() {
      tbody.innerHTML = posts
        .map(function (p) {
          var cls = (p.deleted_at ? "trashed" : "") + (p.id === lastChanged ? " changed" : "");
          return (
            '<tr class="' + cls + '"><td>' + p.id + "</td><td>" + cell(p.title) + "</td><td>" + cell(p.body) + "</td><td>" + cell(p.status) +
            "</td><td>" + (p.deleted_at ? "🗑️ " + esc(p.deleted_at) : '<span class="dim">null</span>') + "</td></tr>"
          );
        })
        .join("") || '<tr><td colspan="5">Table is empty — press Reset.</td></tr>';
      lastChanged = null;
    }

    function now() {
      var d = new Date();
      function p(n) { return n < 10 ? "0" + n : n; }
      return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
    }

    function show(p) {
      return { id: p.id, title: p.title, body: p.body, status: p.status };
    }

    function notFound(id) {
      return { status: 404, json: { message: "No query results for model [App\\Models\\Post] " + id + "." }, why: "There's no (active) post with id <code>" + esc(id) + "</code>. <code>findOrFail()</code> turns that into a 404 automatically." };
    }

    function validate(data, rules) {
      var errors = {};
      Object.keys(rules).forEach(function (field) {
        var r = rules[field];
        var has = Object.prototype.hasOwnProperty.call(data, field);
        if (!has) {
          if (r.required) errors[field] = ["The " + field + " field is required."];
          return;
        }
        var v = data[field];
        if (typeof v !== "string" || !v.trim()) errors[field] = ["The " + field + " field must be a non-empty string."];
        else if (r.in && r.in.indexOf(v) === -1) errors[field] = ["The selected " + field + " is invalid (use: " + r.in.join(", ") + ")."];
      });
      return Object.keys(errors).length ? errors : null;
    }

    function rules(required) {
      return {
        title: { required: required },
        body: { required: required },
        status: { required: required, in: ["draft", "published"] },
      };
    }

    function invalid(errors, verb) {
      return {
        status: 422,
        json: { message: "The given data was invalid.", errors: errors },
        why: "Validation failed, so Laravel stopped before touching the database and replied <b>422 Unprocessable Content</b>." + (verb === "PUT" ? " Remember: <b>PUT replaces the whole post</b>, so every field is required." : ""),
      };
    }

    function route(m, path, query, data) {
      var all = /^\/api\/posts\/?$/.test(path);
      var one = path.match(/^\/api\/posts\/(\d+)\/?$/);
      var restore = path.match(/^\/api\/posts\/(\d+)\/restore\/?$/);
      var force = path.match(/^\/api\/posts\/(\d+)\/force\/?$/);
      var find = function (id, withTrashed) {
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].id === +id && (withTrashed || !posts[i].deleted_at)) return posts[i];
        }
        return null;
      };

      if (all && m === "GET") {
        var withTrashed = /(^|&)with_trashed=1/.test(query);
        var list = posts.filter(function (p) { return withTrashed || !p.deleted_at; });
        return {
          status: 200,
          json: { data: list.map(function (p) { return withTrashed ? { id: p.id, title: p.title, deleted_at: p.deleted_at } : show(p); }) },
          code: withTrashed ? "Post::withTrashed()->get();" : "Post::all();",
          why: withTrashed
            ? "<code>withTrashed()</code> includes soft-deleted posts too — they were never really gone."
            : "<b>Get all</b>: returns every post that is <i>not</i> soft-deleted. Soft-deleted rows are hidden automatically.",
        };
      }
      if (all && m === "POST") {
        var e = validate(data, rules(true));
        if (e) return invalid(e);
        var p = { id: nextId++, title: data.title, body: data.body, status: data.status, deleted_at: null };
        posts.push(p);
        lastChanged = p.id;
        return { status: 201, json: { data: show(p) }, code: "Post::create($request->validated());", why: "<b>Create</b>: a new row was inserted. <b>201 Created</b> means “done, and here's the new thing”." };
      }
      if (one) {
        var id = one[1];
        var post = find(id);
        if (m === "GET") {
          if (!post) return notFound(id);
          return { status: 200, json: { data: show(post) }, code: "Post::findOrFail(" + id + ");", why: "<b>Get one</b>: finds a single post by its id." };
        }
        if (m === "PUT") {
          if (!post) return notFound(id);
          var e2 = validate(data, rules(true));
          if (e2) return invalid(e2, "PUT");
          post.title = data.title; post.body = data.body; post.status = data.status;
          lastChanged = post.id;
          return { status: 200, json: { data: show(post) }, code: "$post->update($request->validated()); // all fields", why: "<b>PUT</b> = replace the <i>whole</i> post. You must send every field. Try deleting the <code>body</code> line and sending again." };
        }
        if (m === "PATCH") {
          if (!post) return notFound(id);
          var e3 = validate(data, rules(false));
          if (e3) return invalid(e3);
          var changed = Object.keys(data).filter(function (k) { return k in rules(false); });
          if (!changed.length) return { status: 422, json: { message: "Send at least one field: title, body or status." }, why: "PATCH needs at least one field to change." };
          changed.forEach(function (k) { post[k] = data[k]; });
          lastChanged = post.id;
          return { status: 200, json: { data: show(post) }, code: "$post->update($request->validated()); // only: " + changed.join(", "), why: "<b>PATCH</b> = change <i>only</i> what you send (" + changed.map(function (c) { return "<code>" + c + "</code>"; }).join(", ") + "). Everything else stays the same." };
        }
        if (m === "DELETE") {
          if (!post) return notFound(id);
          post.deleted_at = now();
          lastChanged = post.id;
          return { status: 204, json: undefined, code: "$post->delete(); // soft delete", why: "<b>Soft delete</b>: the row is still in the table — Laravel just filled in <code>deleted_at</code>. It's hidden from <i>Get all</i> but can be restored. <b>204 No Content</b> = done, nothing to send back." };
        }
        return { status: 405, json: { message: "The " + m + " method is not supported for route api/posts/" + id + "." }, why: "This URL exists, but not with that method. <b>405 Method Not Allowed</b>." };
      }
      if (restore && m === "POST") {
        var tp = find(restore[1], true);
        if (!tp) return notFound(restore[1]);
        if (!tp.deleted_at) return { status: 200, json: { data: show(tp) }, code: "Post::withTrashed()->findOrFail(" + tp.id + ")->restore();", why: "That post wasn't deleted — nothing to restore." };
        tp.deleted_at = null;
        lastChanged = tp.id;
        return { status: 200, json: { data: show(tp) }, code: "Post::withTrashed()->findOrFail(" + tp.id + ")->restore();", why: "<b>Restore</b>: <code>deleted_at</code> is back to <code>null</code>, so the post shows up again. That's the magic of soft deletes!" };
      }
      if (force && m === "DELETE") {
        var fp = find(force[1], true);
        if (!fp) return notFound(force[1]);
        posts = posts.filter(function (p) { return p !== fp; });
        return { status: 204, json: undefined, code: "Post::withTrashed()->findOrFail(" + fp.id + ")->forceDelete();", why: "<b>Force delete</b>: the row is permanently removed. No undo this time! 💥" };
      }
      return { status: 404, json: { message: "The route " + path.replace(/^\//, "") + " could not be found." }, why: "No route matches this URL. Check the spelling — routes are like signposts." };
    }

    var TEXT = { 200: "OK", 201: "Created", 204: "No Content", 400: "Bad Request", 404: "Not Found", 405: "Method Not Allowed", 422: "Unprocessable Content" };

    function send() {
      var m = method.value;
      var raw = url.value.trim();
      var path = raw.split("?")[0];
      var query = raw.split("?")[1] || "";
      var data = {};
      var res;
      if (bodyInput.value.trim() && m !== "GET" && m !== "DELETE") {
        try {
          data = JSON.parse(bodyInput.value);
        } catch (e) {
          res = { status: 400, json: { message: "Your JSON body has a typo: " + e.message }, why: "JSON needs double quotes around keys and text, and commas between fields." };
        }
      }
      if (!res) res = route(m, path, query, data || {});

      statusEl.className = "pg-status s" + String(res.status)[0];
      statusEl.textContent = res.status + " " + (TEXT[res.status] || "");
      out.innerHTML = res.json === undefined ? '<span class="dim">(empty body — 204 means success with nothing to return)</span>' : json(res.json);
      explain.innerHTML = res.why + (res.code ? '<br><span class="dim">Laravel ran:</span> <code>' + esc(res.code) + "</code>" : "");
      renderTable();
    }

    body.addEventListener("click", function (e) {
      var pre = e.target.closest("[data-preset]");
      if (pre) {
        var p = PRESETS[+pre.getAttribute("data-preset")];
        method.value = p.m;
        url.value = p.u;
        bodyInput.value = p.b ? JSON.stringify(p.b, null, 2) : "";
        body.querySelectorAll("[data-preset]").forEach(function (b) { b.classList.toggle("is-active", b === pre); });
        send();
        return;
      }
      if (e.target.closest("[data-reset]")) {
        posts = seed();
        nextId = 4;
        statusEl.className = "pg-status";
        statusEl.textContent = "waiting…";
        out.textContent = "Data reset. Try a request!";
        explain.innerHTML = "🔄 The database is back to its starting rows.";
        renderTable();
        return;
      }
      if (e.target.closest(".pg-send")) send();
    });

    url.addEventListener("keydown", function (e) {
      if (e.key === "Enter") send();
    });

    renderTable();
  };

  /* ------------------------------------------------------------------------
     Encapsulation: a bank account you can't hack
     ------------------------------------------------------------------------ */
  DEMOS.encapsulation = function (el) {
    var balance = 100;
    var body = shell(
      el,
      "🏦",
      "Try to break the bank account",
      '<p class="demo-hint">The <code>$balance</code> is <b>private</b>. You can only change it through the public buttons (methods). Try the hack!</p>' +
        '<div class="demo-btns">' +
        '<button type="button" class="dbtn" data-a="dep">💰 deposit(50)</button>' +
        '<button type="button" class="dbtn" data-a="wd">💸 withdraw(30)</button>' +
        '<button type="button" class="dbtn" data-a="big">🤑 withdraw(9999)</button>' +
        '<button type="button" class="dbtn" data-a="neg">🙃 deposit(-500)</button>' +
        '<button type="button" class="dbtn danger" data-a="hack">🕵️ $account-&gt;balance = 1000000</button>' +
        '<button type="button" class="dbtn" data-a="get">👀 getBalance()</button></div>' +
        '<pre class="console"></pre>'
    );
    var c = makeConsole(body.querySelector(".console"), 9);
    c.log('<span class="dim">// $account = new BankAccount(); balance starts at 100</span>');

    body.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "dep") { balance += 50; c.log(php("$account->deposit(50);") + '  <span class="ok">✓ balance is now ' + balance + "</span>"); }
      if (a === "wd") {
        if (balance >= 30) { balance -= 30; c.log(php("$account->withdraw(30);") + '  <span class="ok">✓ balance is now ' + balance + "</span>"); }
        else c.log(php("$account->withdraw(30);") + '  <span class="err">✗ Exception: Not enough money!</span>');
      }
      if (a === "big") c.log(php("$account->withdraw(9999);") + '  <span class="err">✗ Exception: Not enough money!</span> <span class="dim">(the method protects the data)</span>');
      if (a === "neg") c.log(php("$account->deposit(-500);") + '  <span class="err">✗ Exception: Amount must be positive.</span>');
      if (a === "hack") c.log(php("$account->balance = 1000000;") + '\n  <span class="err">💥 Error: Cannot modify private property BankAccount::$balance</span>\n  <span class="warn">🔒 Nice try! Private data can only be changed by the class itself.</span>');
      if (a === "get") c.log(php("$account->getBalance();") + '  <span class="hi">→ ' + balance + "</span>");
    });
  };

  /* ------------------------------------------------------------------------
     Inheritance: Car vs SportsCar
     ------------------------------------------------------------------------ */
  DEMOS.inheritance = function (el) {
    var current = "Car";
    var body = shell(
      el,
      "🚗",
      "Parent vs child class",
      '<p class="demo-hint"><code>SportsCar extends Car</code>. Pick an object, then call methods. The child gets the parent\'s methods for free — plus its own.</p>' +
        '<div class="demo-btns"><button type="button" class="dbtn is-active" data-o="Car">🚙 new Car()</button><button type="button" class="dbtn" data-o="SportsCar">🏎️ new SportsCar()</button></div>' +
        '<div class="demo-btns"><button type="button" class="dbtn" data-m="drive">drive()</button><button type="button" class="dbtn" data-m="honk">honk()</button><button type="button" class="dbtn" data-m="turbo">turbo()</button></div>' +
        '<pre class="console"></pre>'
    );
    var c = makeConsole(body.querySelector(".console"), 8);
    c.log('<span class="dim">// class SportsCar extends Car { public function turbo() {...} }</span>');
    body.addEventListener("click", function (e) {
      var o = e.target.closest("[data-o]");
      if (o) {
        current = o.getAttribute("data-o");
        body.querySelectorAll("[data-o]").forEach(function (b) { b.classList.toggle("is-active", b === o); });
        c.log(php("$car = new " + current + "();") + '  <span class="ok">✓ created</span>');
        return;
      }
      var m = e.target.closest("[data-m]");
      if (!m) return;
      var name = m.getAttribute("data-m");
      var call = php("$car->" + name + "();");
      if (name === "drive") c.log(call + '  <span class="ok">→ "Vroom! Driving…"</span>' + (current === "SportsCar" ? ' <span class="dim">(inherited from Car)</span>' : ""));
      if (name === "honk") c.log(call + '  <span class="ok">→ "Beep beep!"</span>' + (current === "SportsCar" ? ' <span class="dim">(inherited from Car)</span>' : ""));
      if (name === "turbo") {
        if (current === "SportsCar") c.log(call + '  <span class="hi">→ "🔥 TURBO BOOST!"</span> <span class="dim">(only SportsCar has this)</span>');
        else c.log(call + '  <span class="err">✗ Error: Call to undefined method Car::turbo()</span> <span class="dim">— parents don\'t get the child\'s extras</span>');
      }
    });
  };

  /* ------------------------------------------------------------------------
     Abstraction: the TV remote
     ------------------------------------------------------------------------ */
  DEMOS.abstraction = function (el) {
    var peek = false;
    var vol = 10;
    var on = false;
    var INSIDE = {
      power: ["check battery voltage (3.0V ✓)", "encode IR signal 0x20DF10EF", "pulse LED at 38kHz", "TV: boot firmware, warm up panel"],
      up: ["read button matrix row 2", "encode IR signal 0x20DF40BF", "TV: amplifier gain +3dB", "TV: draw volume bar overlay"],
      ch: ["debounce button press (20ms)", "encode IR signal 0x20DF00FF", "TV: tune tuner to 615.25 MHz", "TV: decode MPEG stream"],
    };
    var body = shell(
      el,
      "📺",
      "The TV remote (abstraction)",
      '<p class="demo-hint">You only see simple buttons. Flip <b>“Peek inside”</b> to see the complicated work that\'s hidden from you.</p>' +
        '<div class="demo-btns"><button type="button" class="dbtn" data-b="power">⏻ power()</button><button type="button" class="dbtn" data-b="up">🔊 volumeUp()</button><button type="button" class="dbtn" data-b="ch">📡 nextChannel()</button>' +
        '<button type="button" class="dbtn" data-peek>🔍 Peek inside: OFF</button></div><pre class="console"></pre>'
    );
    var c = makeConsole(body.querySelector(".console"), 12);
    c.log('<span class="dim">// $remote = new Remote(); — you never see the wiring</span>');
    body.addEventListener("click", function (e) {
      var p = e.target.closest("[data-peek]");
      if (p) {
        peek = !peek;
        p.textContent = "🔍 Peek inside: " + (peek ? "ON" : "OFF");
        p.classList.toggle("is-active", peek);
        return;
      }
      var b = e.target.closest("[data-b]");
      if (!b) return;
      var k = b.getAttribute("data-b");
      var names = { power: "power", up: "volumeUp", ch: "nextChannel" };
      var result;
      if (k === "power") { on = !on; result = on ? "📺 TV is ON" : "⚫ TV is OFF"; }
      if (k === "up") result = on ? "🔊 volume " + (vol = Math.min(vol + 1, 100)) : "(TV is off)";
      if (k === "ch") result = on ? "📡 now showing channel " + (Math.floor(Math.random() * 90) + 2) : "(TV is off)";
      var html = php("$remote->" + names[k] + "();") + '  <span class="ok">→ ' + result + "</span>";
      if (peek) html += "\n" + INSIDE[k].map(function (s) { return '    <span class="dim">⚙️ hidden: ' + s + "</span>"; }).join("\n");
      c.log(html);
    });
  };

  /* ------------------------------------------------------------------------
     Polymorphism: one checkout, many payment methods
     ------------------------------------------------------------------------ */
  DEMOS.polymorphism = function (el) {
    var M = {
      CardPayment: { icon: "💳", steps: ["Contacting the bank…", "Charging card **** 4242", "✓ Paid with card"] },
      PayPalPayment: { icon: "🅿️", steps: ["Redirecting to PayPal…", "User approved", "✓ Paid with PayPal"] },
      CashOnDelivery: { icon: "💵", steps: ["Marking order as unpaid", "Courier will collect cash", "✓ Pay when it arrives"] },
      CryptoPayment: { icon: "🪙", steps: ["Generating wallet address…", "Waiting for 1 confirmation", "✓ Paid with crypto"] },
    };
    var pick = "CardPayment";
    var body = shell(
      el,
      "🛒",
      "One checkout, many ways to pay",
      '<p class="demo-hint">The checkout code never changes: <code>$method-&gt;pay(500)</code>. Swap the object and the <b>same call</b> does something different.</p>' +
        '<div class="demo-btns">' +
        Object.keys(M).map(function (k, i) {
          return '<button type="button" class="dbtn' + (i === 0 ? " is-active" : "") + '" data-p="' + k + '">' + M[k].icon + " " + k + "</button>";
        }).join("") +
        '</div><div class="demo-btns"><button type="button" class="dbtn primary" data-go>▶ checkout($method, 500)</button></div><pre class="console"></pre>'
    );
    var c = makeConsole(body.querySelector(".console"), 10);
    c.log('<span class="dim">// function checkout(PaymentMethod $method, int $amount) { $method->pay($amount); }</span>');
    body.addEventListener("click", function (e) {
      var p = e.target.closest("[data-p]");
      if (p) {
        pick = p.getAttribute("data-p");
        body.querySelectorAll("[data-p]").forEach(function (b) { b.classList.toggle("is-active", b === p); });
        return;
      }
      if (!e.target.closest("[data-go]")) return;
      c.log(php("checkout(new " + pick + "(), 500);") + "\n" + M[pick].steps.map(function (s, i) {
        return "  " + (i === M[pick].steps.length - 1 ? '<span class="ok">' : '<span class="dim">') + M[pick].icon + " " + esc(s) + "</span>";
      }).join("\n"));
    });
  };

  /* ------------------------------------------------------------------------
     Dependency Injection: plug in any notifier
     ------------------------------------------------------------------------ */
  DEMOS.di = function (el) {
    var N = {
      EmailNotifier: { icon: "📧", msg: "Email sent to ana@example.com: “Your order #1024 is confirmed!”" },
      SmsNotifier: { icon: "📱", msg: "SMS sent to +1 555 0100: “Order #1024 confirmed ✓”" },
      SlackNotifier: { icon: "💬", msg: "Posted in #orders: “New order #1024 🎉”" },
      FakeNotifier: { icon: "🧪", msg: "Nothing sent — just recorded “order #1024” so a test can check it." },
    };
    var withDi = true;
    var pick = "EmailNotifier";
    var body = shell(
      el,
      "🔌",
      "Plug a notifier into OrderService",
      '<p class="demo-hint">With DI, <code>OrderService</code> receives its notifier from outside. Switch DI off to see what “glued in” code feels like.</p>' +
        '<div class="demo-btns"><button type="button" class="dbtn is-active" data-mode="on">✅ With DI</button><button type="button" class="dbtn" data-mode="off">🧱 Without DI (glued in)</button></div>' +
        '<div class="demo-btns">' +
        Object.keys(N).map(function (k, i) {
          return '<button type="button" class="dbtn' + (i === 0 ? " is-active" : "") + '" data-n="' + k + '">' + N[k].icon + " " + k + "</button>";
        }).join("") +
        '</div><pre class="console di-code"></pre><div class="demo-btns" style="margin-top:12px"><button type="button" class="dbtn primary" data-go>🛍️ $service-&gt;placeOrder()</button></div><pre class="console di-out"></pre>'
    );
    var codeEl = body.querySelector(".di-code");
    var c = makeConsole(body.querySelector(".di-out"), 6);
    c.log('<span class="dim">// output appears here</span>');

    function renderCode() {
      if (withDi) {
        codeEl.innerHTML =
          php("class OrderService {") + "\n" +
          php("    public function __construct(private Notifier $notifier) {}") + '  <span class="ok">← slot</span>\n' +
          php("}") + "\n\n" +
          php("$service = new OrderService(new " + pick + "());") + '  <span class="hi">← plug in!</span>';
      } else {
        codeEl.innerHTML =
          php("class OrderService {") + "\n" +
          php("    private $notifier;") + "\n" +
          php("    public function __construct() {") + "\n" +
          php("        $this->notifier = new EmailNotifier();") + '  <span class="err">← glued in 🧱</span>\n' +
          php("    }") + "\n" + php("}") + "\n\n" + php("$service = new OrderService();");
      }
    }

    body.addEventListener("click", function (e) {
      var mode = e.target.closest("[data-mode]");
      if (mode) {
        withDi = mode.getAttribute("data-mode") === "on";
        body.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("is-active", b === mode); });
        renderCode();
        return;
      }
      var n = e.target.closest("[data-n]");
      if (n) {
        var k = n.getAttribute("data-n");
        if (!withDi && k !== "EmailNotifier") {
          c.log('<span class="err">✗ Can\'t switch to ' + k + '!</span> <span class="dim">The class creates EmailNotifier itself — you\'d have to edit OrderService. That\'s the problem DI solves.</span>');
          return;
        }
        pick = k;
        body.querySelectorAll("[data-n]").forEach(function (b) { b.classList.toggle("is-active", b === n); });
        renderCode();
        return;
      }
      if (e.target.closest("[data-go]")) {
        var used = withDi ? pick : "EmailNotifier";
        c.log(N[used].icon + ' <span class="ok">' + esc(N[used].msg) + "</span>");
      }
    });
    renderCode();
  };

  /* ------------------------------------------------------------------------
     PUT vs PATCH side by side
     ------------------------------------------------------------------------ */
  DEMOS["put-patch"] = function (el) {
    var ORIGINAL = { title: "Old title", body: "Some long text…", status: "published" };
    var body = shell(
      el,
      "🆚",
      "PUT vs PATCH — send the same thing, see the difference",
      '<p class="demo-hint">We send only <code>{"title": "New title"}</code>. Watch what happens to the other fields.</p>' +
        '<div class="demo-btns"><button type="button" class="dbtn" data-v="PUT"><span class="m put">PUT</span> send</button><button type="button" class="dbtn" data-v="PATCH"><span class="m patch">PATCH</span> send</button><button type="button" class="dbtn" data-v="reset">🔄 reset</button></div>' +
        '<div class="records"></div><div class="pg-explain" style="margin-top:14px">👆 Press PUT or PATCH.</div>'
    );
    var rec = body.querySelector(".records");
    var ex = body.querySelector(".pg-explain");

    function card(title, obj, marks) {
      return '<div class="record"><h4>' + title + "</h4>{<br>" + Object.keys(ORIGINAL).map(function (k) {
        var v = obj[k];
        var cls = marks && marks[k] ? ' class="' + marks[k] + '"' : "";
        return '&nbsp;&nbsp;<span class="k">"' + k + '"</span>: <span' + cls + ">" + (v === null ? "null" : '"' + esc(v) + '"') + "</span>";
      }).join(",<br>") + "<br>}</div>";
    }

    function render(v) {
      if (v === "PUT") {
        rec.innerHTML = card("📦 Before", ORIGINAL) + card("📨 You sent", { title: "New title", body: null, status: null }, { body: "lost", status: "lost" }) + card("♻️ After PUT", { title: "New title", body: null, status: null }, { title: "changed", body: "lost", status: "lost" });
        ex.innerHTML = "<b>PUT replaces the whole thing.</b> Fields you didn't send are wiped (or, with validation, the request is rejected with 422). Use PUT when you send the <i>complete</i> new version.";
      } else if (v === "PATCH") {
        rec.innerHTML = card("📦 Before", ORIGINAL) + card("📨 You sent", { title: "New title", body: null, status: null }, { body: "lost", status: "lost" }).replace(/null/g, '<span class="dim">—</span>') + card("✏️ After PATCH", { title: "New title", body: ORIGINAL.body, status: ORIGINAL.status }, { title: "changed" });
        ex.innerHTML = "<b>PATCH changes only what you send.</b> The title changed; body and status stayed exactly as they were. Use PATCH for small edits.";
      } else {
        rec.innerHTML = card("📦 Current post", ORIGINAL);
        ex.innerHTML = "👆 Press PUT or PATCH.";
      }
    }

    body.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]");
      if (b) render(b.getAttribute("data-v"));
    });
    render("reset");
  };

  /* ------------------------------------------------------------------------
     Journey: animate authored .j-step items one by one
     ------------------------------------------------------------------------ */
  DEMOS.journey = function (el) {
    var steps = Array.prototype.slice.call(el.querySelectorAll(".j-step"));
    var holder = document.createElement("div");
    holder.className = "journey";
    steps.forEach(function (s) { holder.appendChild(s); });
    var body = shell(el, "🍕", "Follow one request", "");
    var btns = document.createElement("div");
    btns.className = "demo-btns";
    btns.innerHTML = '<button type="button" class="dbtn primary" data-play>▶ Send a request</button><button type="button" class="dbtn" data-next>⏭ Step</button><button type="button" class="dbtn" data-reset>🔄 Reset</button>';
    body.appendChild(btns);
    body.appendChild(holder);

    var i = -1;
    var timer = null;
    function paint() {
      steps.forEach(function (s, n) {
        s.classList.toggle("active", n === i);
        s.classList.toggle("done", n < i);
      });
    }
    function next() {
      if (i < steps.length - 1) { i++; paint(); return true; }
      return false;
    }
    function stop() { clearInterval(timer); timer = null; }
    btns.addEventListener("click", function (e) {
      if (e.target.closest("[data-play]")) {
        stop();
        i = -1;
        next();
        timer = setInterval(function () { if (!next()) stop(); }, 1100);
      }
      if (e.target.closest("[data-next]")) { stop(); next(); }
      if (e.target.closest("[data-reset]")) { stop(); i = -1; paint(); }
    });
  };

  /* ------------------------------------------------------------------------ */

  document.querySelectorAll(".demo[data-demo]").forEach(function (el) {
    var fn = DEMOS[el.getAttribute("data-demo")];
    if (fn) {
      try { fn(el); } catch (err) { console.error("Demo failed:", err); }
    }
  });

  /* Flip cards */
  document.addEventListener("click", function (e) {
    var card = e.target.closest(".flip-card");
    if (card) {
      card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", card.classList.contains("is-flipped") ? "true" : "false");
    }
  });
})();
