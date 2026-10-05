/* Landing page: stats, roadmap, level filter, scroll-filled path, typing hero. */
(function () {
  var C = window.CURRICULUM;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Stats ---------------------------------------------------------------- */
  var t = C.totals();
  var stats = document.querySelector("[data-stats]");
  if (stats) {
    stats.innerHTML =
      "<div><dt>modules</dt><dd>" + (t.modules - 1) + "</dd></div>" +
      "<div><dt>lessons</dt><dd>" + C.modules.reduce(function (n, m) { return m.id === "P" ? n : n + m.lessons.length; }, 0) + "</dd></div>" +
      "<div><dt>guided projects</dt><dd>" + C.findModule("P").lessons.length + "</dd></div>" +
      "<div><dt>hours of lessons</dt><dd>~" + Math.round(C.modules.reduce(function (n, m) {
        return m.id === "P" ? n : n + m.lessons.reduce(function (s, l) { return s + l.time; }, 0);
      }, 0) / 60) + "</dd></div>";
  }

  var countEl = document.querySelector("[data-stop-count]");
  if (countEl) countEl.textContent = C.modules.length;

  /* Roadmap --------------------------------------------------------------- */
  var path = document.querySelector("[data-path]");
  var BANNERS = { "Start Here": "✨ Start Here", Beginner: "🌱 Beginner", Intermediate: "🌿 Intermediate", Advanced: "🌳 Advanced", Practice: "🏗️ Practice" };
  if (path) {
    var html = "";
    var lastLevel = "";
    C.modules.forEach(function (m, i) {
      if (m.level !== lastLevel) {
        html += '<div class="level-banner" data-level="' + m.level + '">' + BANNERS[m.level] + "</div>";
        lastLevel = m.level;
      }
      var mins = m.lessons.reduce(function (s, l) { return s + l.time; }, 0);
      var isP = m.id === "P";
      html +=
        '<div class="stop reveal' + (i % 2 ? " right" : "") + '" data-level="' + m.level + '" style="--c1:' + m.colors[0] + ";--c2:" + m.colors[1] + '">' +
        '<span class="stop-dot">' + (isP ? "★" : m.id) + "</span>" +
        '<a class="stop-card" href="modules/' + m.slug + '/index.html">' +
        '<div class="stop-top"><span class="stop-icon">' + m.icon + "</span><h3>" + esc(m.title) + "</h3></div>" +
        "<p>" + esc(m.summary) + "</p>" +
        '<div class="stop-meta"><span>📚 ' + m.lessons.length + (isP ? " projects" : " lessons") + "</span>" +
        "<span>⏱ " + (isP ? "~" + Math.round(mins / 60) + " h" : mins + " min") + "</span>" +
        '<span class="go">Open →</span></div>' +
        "</a></div>";
    });
    path.insertAdjacentHTML("beforeend", html);

    /* Level filter */
    var filters = document.querySelector("[data-filters]");
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var level = btn.getAttribute("data-level");
      filters.querySelectorAll(".filter").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      path.querySelectorAll(".stop").forEach(function (s) {
        s.classList.toggle("is-dim", level !== "all" && s.getAttribute("data-level") !== level);
      });
      if (level !== "all") {
        var first = path.querySelector('.level-banner[data-level="' + level + '"]');
        if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    /* Fill the path line as you scroll */
    var fill = path.querySelector(".path-fill");
    var ticking = false;
    function updateFill() {
      ticking = false;
      var r = path.getBoundingClientRect();
      var progress = (window.innerHeight * 0.6 - r.top) / r.height;
      progress = Math.max(0, Math.min(1, progress));
      fill.style.height = progress * 100 + "%";
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateFill);
        }
      },
      { passive: true }
    );
    updateFill();
  }

  /* Typing hero code ------------------------------------------------------- */
  var target = document.querySelector("[data-typing]");
  if (target) {
    var tokens = [
      ["keyword", "use"], [null, " "], ["class", "Illuminate\\Support\\Facades\\Route"], [null, ";\n\n"],
      ["class", "Route"], ["operator", "::"], ["function", "get"], [null, "("], ["string", "'/'"], [null, ", "],
      ["keyword", "function"], [null, " () {\n    "], ["keyword", "return"], [null, " "], ["function", "view"],
      [null, "("], ["string", "'welcome'"], [null, ");\n});\n\n"],
      ["class", "Route"], ["operator", "::"], ["function", "get"], [null, "("], ["string", "'/posts/{post}'"], [null, ", "],
      [null, "["], ["class", "PostController"], ["operator", "::"], ["keyword", "class"], [null, ", "], ["string", "'show'"], [null, "])\n    "],
      ["operator", "->"], ["function", "name"], [null, "("], ["string", "'posts.show'"], [null, ");\n\n"],
      ["comment", "// You'll understand every line. 🚀"],
    ];
    var total = tokens.reduce(function (n, tk) { return n + tk[1].length; }, 0);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render(count) {
      var out = "";
      var left = count;
      for (var i = 0; i < tokens.length && left > 0; i++) {
        var text = tokens[i][1].slice(0, left);
        left -= text.length;
        out += tokens[i][0] ? '<span class="tok-' + tokens[i][0] + '">' + esc(text) + "</span>" : esc(text);
      }
      target.innerHTML = out + '<span class="caret"></span>';
    }

    if (reduce) {
      render(total);
    } else {
      var n = 0;
      (function step() {
        n += 2;
        render(n);
        if (n < total) setTimeout(step, 28);
      })();
    }
  }
})();
