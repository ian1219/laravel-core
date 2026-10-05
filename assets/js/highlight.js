/* ==========================================================================
   Tiny syntax highlighter + code-block chrome (filename, language, copy).
   Usage:  <pre><code class="lang-php" data-file="routes/web.php" data-hl="3,5-6">…</code></pre>
   Languages: php, blade, html, bash, sql, json, js, env, text
   Rule regexes must only use non-capturing groups (?: ).
   ========================================================================== */

(function () {
  function ci(words) {
    return words
      .map(function (w) {
        return w + "|" + w.toUpperCase();
      })
      .join("|");
  }

  var STR = /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\])*"/;
  var NUM = /\b\d[\d_]*(?:\.\d+)?\b/;
  var PHP_KW =
    /\b(?:abstract|as|break|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|enum|extends|final|finally|fn|for|foreach|function|global|if|implements|include|instanceof|interface|match|namespace|new|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|use|while|yield|self|parent)\b/;
  var PHP_BUILTIN = /\b(?:true|false|null|int|string|bool|float|array|void|mixed|object|iterable|callable|never)\b/;
  var FN = /\b[a-zA-Z_]\w*(?=\s*\()/;

  var LANGS = {
    php: [
      ["comment", /\/\*[\s\S]*?\*\/|\/\/[^\n]*|#(?!\[)[^\n]*/],
      ["string", STR],
      ["tag", /<\?php|\?>/],
      ["variable", /\$[A-Za-z_]\w*/],
      ["keyword", PHP_KW],
      ["builtin", PHP_BUILTIN],
      ["number", NUM],
      ["class", /\b[A-Z][A-Za-z0-9_]*\b/],
      ["function", FN],
      ["operator", /\?->|->|=>|::|===|!==|<=>|&&|\|\||\?\?=?|\.=/],
    ],
    blade: [
      ["comment", /\{\{--[\s\S]*?--\}\}|<!--[\s\S]*?-->/],
      ["directive", /@[a-zA-Z]+/],
      ["operator", /\{\{|\}\}|\{!!|!!\}|->|=>|::/],
      ["tag", /<\/?[A-Za-z][\w:.-]*|\/?>/],
      ["attr", /[:@]?[a-zA-Z_][\w:.-]*(?==["'])/],
      ["string", STR],
      ["variable", /\$[A-Za-z_]\w*/],
      ["builtin", /\b(?:true|false|null)\b/],
      ["number", NUM],
    ],
    html: [
      ["comment", /<!--[\s\S]*?-->/],
      ["tag", /<\/?[A-Za-z][\w:.-]*|\/?>/],
      ["attr", /[:@]?[a-zA-Z_][\w:.-]*(?==["'])/],
      ["string", STR],
    ],
    bash: [
      ["comment", /(?:^|\s)#[^\n]*/],
      ["string", STR],
      ["variable", /\$\{?[A-Za-z_]\w*\}?/],
      ["function", /\b(?:php|composer|npm|npx|git|laravel|curl|cd|mkdir|sudo|sail|herd|pnpm|yarn|cp|mv|ls|cat|echo|export|touch|rm)\b/],
      ["builtin", /\bartisan\b/],
      ["attr", /(?:^|(?<=\s))--?[A-Za-z][\w-]*(?:=)?/],
      ["number", NUM],
    ],
    sql: [
      ["comment", /--[^\n]*/],
      ["string", /'(?:''|[^'])*'/],
      [
        "keyword",
        new RegExp(
          "\\b(?:" +
            ci([
              "select", "from", "where", "and", "or", "not", "insert", "into", "values", "update", "set", "delete",
              "create", "table", "alter", "drop", "primary", "key", "foreign", "references", "join", "left", "right",
              "inner", "on", "order", "by", "group", "having", "limit", "offset", "as", "in", "is", "null", "like",
              "unique", "index", "default", "asc", "desc", "count", "distinct", "union", "exists", "between",
            ]) +
            ")\\b"
        ),
      ],
      ["builtin", new RegExp("\\b(?:" + ci(["int", "integer", "bigint", "varchar", "text", "timestamp", "boolean", "unsigned", "auto_increment"]) + ")\\b")],
      ["number", NUM],
      ["function", FN],
    ],
    json: [
      ["attr", /"(?:\\.|[^"\\])*"(?=\s*:)/],
      ["string", /"(?:\\.|[^"\\])*"/],
      ["builtin", /\b(?:true|false|null)\b/],
      ["number", /-?\b\d+(?:\.\d+)?\b/],
    ],
    js: [
      ["comment", /\/\*[\s\S]*?\*\/|\/\/[^\n]*/],
      ["string", /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/],
      [
        "keyword",
        /\b(?:const|let|var|function|return|if|else|for|while|of|in|new|class|extends|import|export|from|default|async|await|try|catch|throw|this|typeof)\b/,
      ],
      ["builtin", /\b(?:true|false|null|undefined)\b/],
      ["number", NUM],
      ["class", /\b[A-Z][A-Za-z0-9_]*\b/],
      ["function", FN],
      ["operator", /=>|===|!==|&&|\|\||\?\?/],
    ],
    env: [
      ["comment", /#[^\n]*/],
      ["attr", /^[A-Z0-9_]+(?==)/],
      ["string", STR],
      ["builtin", /\b(?:true|false|null)\b/],
      ["number", NUM],
    ],
    text: [],
  };

  var LABELS = {
    php: "PHP",
    blade: "Blade",
    html: "HTML",
    bash: "Terminal",
    sql: "SQL",
    json: "JSON",
    js: "JavaScript",
    env: ".env",
    text: "Text",
  };

  var ALIASES = { shell: "bash", sh: "bash", terminal: "bash", javascript: "js", plain: "text", txt: "text" };

  var compiled = {};

  function regexFor(lang) {
    if (!compiled[lang]) {
      var rules = LANGS[lang];
      compiled[lang] = rules.length
        ? new RegExp(
            rules
              .map(function (r) {
                return "(" + r[1].source + ")";
              })
              .join("|"),
            "gm"
          )
        : null;
    }
    return compiled[lang];
  }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function tokenize(text, lang) {
    var rules = LANGS[lang];
    var re = regexFor(lang);
    var out = [];
    if (!re) return [[null, text]];
    re.lastIndex = 0;
    var last = 0;
    var m;
    while ((m = re.exec(text))) {
      if (m[0] === "") {
        re.lastIndex++;
        continue;
      }
      if (m.index > last) out.push([null, text.slice(last, m.index)]);
      for (var i = 1; i < m.length; i++) {
        if (m[i] !== undefined) {
          out.push([rules[i - 1][0], m[0]]);
          break;
        }
      }
      last = re.lastIndex;
    }
    if (last < text.length) out.push([null, text.slice(last)]);
    return out;
  }

  /* Tokens → array of HTML lines (tokens that span lines are split) */
  function toLines(tokens) {
    var lines = [""];
    tokens.forEach(function (t) {
      var parts = t[1].split("\n");
      parts.forEach(function (part, i) {
        if (i > 0) lines.push("");
        if (!part) return;
        lines[lines.length - 1] += t[0] ? '<span class="tok-' + t[0] + '">' + esc(part) + "</span>" : esc(part);
      });
    });
    return lines;
  }

  function parseRanges(spec) {
    var set = {};
    (spec || "").split(",").forEach(function (part) {
      var bits = part.trim().split("-");
      var a = parseInt(bits[0], 10);
      var b = bits.length > 1 ? parseInt(bits[1], 10) : a;
      if (isNaN(a)) return;
      for (var n = a; n <= b; n++) set[n] = true;
    });
    return set;
  }

  /* Remove the indentation that comes from nesting <pre> inside HTML */
  function dedent(text) {
    text = text.replace(/^\s*\n/, "").replace(/\s+$/, "");
    var lines = text.split("\n");
    var min = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var ind = l.match(/^[ \t]*/)[0].length;
      if (ind < min) min = ind;
    });
    if (!isFinite(min) || min === 0) return text;
    return lines
      .map(function (l) {
        return l.slice(min);
      })
      .join("\n");
  }

  function detectLang(code) {
    var m = (code.className || "").match(/(?:lang|language)-([\w-]+)/);
    var lang = m ? m[1].toLowerCase() : "text";
    lang = ALIASES[lang] || lang;
    return LANGS[lang] ? lang : "text";
  }

  var COPY_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  var CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function enhance(code) {
    var pre = code.parentNode;
    if (!pre || pre.tagName !== "PRE" || pre.closest(".code-block")) return;

    var lang = detectLang(code);
    var raw = dedent(code.textContent);
    var hl = parseRanges(code.getAttribute("data-hl"));
    var lines = toLines(tokenize(raw, lang)).map(function (line, i) {
      return hl[i + 1] ? '<span class="hl">' + (line || " ") + "</span>" : line;
    });

    var file = code.getAttribute("data-file") || (lang === "bash" ? "Terminal" : LABELS[lang]);

    var block = document.createElement("div");
    block.className = "code-block";
    block.innerHTML =
      '<div class="code-head">' +
      '<span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="code-file"></span>' +
      '<span class="code-lang">' + LABELS[lang] + "</span>" +
      '<button type="button" class="copy-btn" aria-label="Copy code">' + COPY_ICON + "<span>Copy</span></button>" +
      "</div>" +
      '<pre tabindex="0"><code class="lang-' + lang + '">' + lines.join("\n") + "</code></pre>";
    block.querySelector(".code-file").textContent = file;

    var btn = block.querySelector(".copy-btn");
    var timer;
    btn.addEventListener("click", function () {
      copyText(raw).then(
        function () {
          btn.classList.add("copied");
          btn.innerHTML = CHECK_ICON + "<span>Copied!</span>";
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.classList.remove("copied");
            btn.innerHTML = COPY_ICON + "<span>Copy</span>";
          }, 1800);
        },
        function () {
          btn.innerHTML = "<span>Press Ctrl+C</span>";
        }
      );
    });

    pre.parentNode.replaceChild(block, pre);
  }

  function run(scope) {
    var codes = (scope || document).querySelectorAll("pre > code");
    Array.prototype.forEach.call(codes, enhance);
  }

  window.LBHighlight = { run: run, tokenize: tokenize };
  run();
})();
