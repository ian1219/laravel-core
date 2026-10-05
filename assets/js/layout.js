/* ==========================================================================
   Layout: builds the topbar, sidebar, lesson hero, module overview and
   prev/next pager from window.CURRICULUM.

   <body data-root="../../" data-module="04" data-lesson="routing">
     data-lesson="index"  → module overview page
     data-page="home"     → landing page (no sidebar)
   ========================================================================== */

(function () {
  var C = window.CURRICULUM;
  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var page = body.getAttribute("data-page") || "";
  var mod = C.findModule(body.getAttribute("data-module") || "");
  var lessonSlug = body.getAttribute("data-lesson") || "";
  var lesson = null;
  var lessonIndex = -1;

  if (mod && lessonSlug && lessonSlug !== "index") {
    mod.lessons.forEach(function (l, i) {
      if (l.slug === lessonSlug) {
        lesson = l;
        lessonIndex = i;
      }
    });
  }

  var ICONS = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    chev: '<svg class="side-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function isProjects(m) {
    return m && m.id === "P";
  }

  function duration(min, m) {
    if (isProjects(m)) return min >= 60 ? "~" + Math.round(min / 60) + " h build" : min + " min build";
    return min + " min read";
  }

  function moduleMinutes(m) {
    return m.lessons.reduce(function (sum, l) {
      return sum + l.time;
    }, 0);
  }

  function moduleLabel(m) {
    if (m.id === "00") return "Start Here";
    return isProjects(m) ? "Projects" : "Module " + m.id;
  }

  /* Module accent colours ------------------------------------------------ */
  if (mod) {
    document.documentElement.style.setProperty("--mod", mod.colors[0]);
    document.documentElement.style.setProperty("--mod-2", mod.colors[1]);
  }

  /* Topbar --------------------------------------------------------------- */
  var hasSidebar = page !== "home";
  var topbar = document.createElement("header");
  topbar.className = "topbar";

  var crumbs = "";
  if (mod) {
    crumbs =
      '<nav class="crumbs" aria-label="Breadcrumb">' +
      '<span class="sep">/</span>' +
      (lesson
        ? '<a class="crumb-module" href="' + C.moduleHref(root, mod) + '">' + esc(mod.icon + " " + mod.title) + '</a><span class="sep crumb-module">/</span><span class="current">' + esc(lesson.title) + "</span>"
        : '<span class="current">' + esc(mod.icon + " " + mod.title) + "</span>") +
      "</nav>";
  }

  topbar.innerHTML =
    (hasSidebar ? '<button type="button" class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false">' + ICONS.menu + "</button>" : "") +
    '<a class="brand" href="' + root + 'index.html"><img class="brand-mark" src="' + root + 'assets/img/logo.svg" alt="" width="36" height="36"><span class="brand-name">Laravel Blueprint</span><small>/ learning kit</small></a>' +
    crumbs +
    '<span class="topbar-spacer"></span>' +
    (page === "home"
      ? '<a class="btn ghost home-nav" href="#roadmap">Roadmap</a>'
      : "") +
    '<button type="button" class="icon-btn theme-toggle" aria-label="Toggle dark / light theme">' + ICONS.moon + ICONS.sun + "</button>";

  body.insertBefore(topbar, body.firstChild);

  topbar.querySelector(".theme-toggle").addEventListener("click", function () {
    window.toggleTheme();
  });

  /* Sidebar -------------------------------------------------------------- */
  if (hasSidebar) {
    body.classList.add("has-sidebar");
    var side = document.createElement("aside");
    side.className = "sidebar";
    side.setAttribute("aria-label", "Curriculum");

    var html = '<p class="side-label">Curriculum</p>';
    C.modules.forEach(function (m) {
      var current = mod && m.id === mod.id;
      html +=
        '<details class="side-module"' + (current ? " open" : "") + ' style="--c1:' + m.colors[0] + ";--c2:" + m.colors[1] + '">' +
        '<summary><span class="side-num">' + (isProjects(m) ? "★" : m.id) + '</span><span class="side-title">' + esc(m.title) + "</span>" + ICONS.chev + "</summary>" +
        '<ul class="side-lessons">' +
        '<li><a href="' + C.moduleHref(root, m) + '"' + (current && !lesson ? ' aria-current="page"' : "") + ">Overview</a></li>";
      m.lessons.forEach(function (l) {
        var here = current && lesson && l.slug === lesson.slug;
        html += '<li><a href="' + C.lessonHref(root, m, l) + '"' + (here ? ' aria-current="page"' : "") + ">" + esc(l.title) + "</a></li>";
      });
      html += "</ul></details>";
    });
    side.innerHTML = html;

    var scrim = document.createElement("div");
    scrim.className = "scrim";

    body.insertBefore(scrim, topbar.nextSibling);
    body.insertBefore(side, scrim);

    var menuBtn = topbar.querySelector(".menu-btn");
    function setNav(open) {
      body.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    menuBtn.addEventListener("click", function () {
      setNav(!body.classList.contains("nav-open"));
    });
    scrim.addEventListener("click", function () {
      setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });

    var active = side.querySelector('[aria-current="page"]');
    if (active) {
      var top = active.offsetTop - side.clientHeight / 2;
      if (top > 0) side.scrollTop = top;
    }
  }

  /* Shell + footer ------------------------------------------------------- */
  var main = document.querySelector("main");
  if (main) {
    var shell = document.createElement("div");
    shell.className = "shell";
    main.parentNode.insertBefore(shell, main);
    shell.appendChild(main);
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      "Laravel Blueprint · a hands-on learning kit · built with plain HTML, CSS &amp; JavaScript";
    shell.appendChild(footer);
  }

  /* Hero ----------------------------------------------------------------- */
  var heroSlot = document.querySelector("[data-hero]");
  if (heroSlot && mod) {
    var hero = document.createElement("header");
    hero.className = "lesson-hero";
    var chips;
    if (lesson) {
      hero.setAttribute("data-num", pad(lessonIndex + 1));
      chips =
        '<span class="chip">⏱ ' + duration(lesson.time, mod) + "</span>" +
        '<span class="chip">📶 ' + esc(mod.level) + "</span>" +
        '<span class="chip">' + esc(mod.icon + " " + mod.title) + "</span>";
      hero.innerHTML =
        '<span class="hero-eyebrow">' + esc(moduleLabel(mod)) + " · " + (isProjects(mod) ? "Build" : "Lesson") + " " + (lessonIndex + 1) + " of " + mod.lessons.length + "</span>" +
        "<h1>" + esc(lesson.title) + "</h1>" +
        '<p class="hero-summary">' + esc(lesson.summary) + "</p>" +
        '<div class="chips">' + chips + "</div>";
    } else {
      hero.setAttribute("data-num", isProjects(mod) ? "★" : mod.id);
      chips =
        '<span class="chip">📚 ' + mod.lessons.length + (isProjects(mod) ? " projects" : " lessons") + "</span>" +
        '<span class="chip">⏱ ' + (isProjects(mod) ? "~" + Math.round(moduleMinutes(mod) / 60) + " h total" : moduleMinutes(mod) + " min total") + "</span>" +
        '<span class="chip">📶 ' + esc(mod.level) + "</span>";
      hero.innerHTML =
        '<span class="hero-eyebrow">' + esc(mod.icon) + " " + esc(moduleLabel(mod)) + "</span>" +
        "<h1>" + esc(mod.title) + "</h1>" +
        '<p class="hero-summary">' + esc(mod.summary) + "</p>" +
        '<div class="chips">' + chips + "</div>";
    }
    heroSlot.parentNode.replaceChild(hero, heroSlot);

    /* 🧒 Simple version — curriculum text is trusted, so it may hold <code> */
    if (lesson && lesson.simple) {
      var eli5 = document.createElement("aside");
      eli5.className = "eli5";
      eli5.innerHTML =
        '<span class="eli5-face" aria-hidden="true">🧒</span><div><span class="eli5-label">The simple version</span><p>' +
        lesson.simple +
        "</p></div>";
      hero.parentNode.insertBefore(eli5, hero.nextSibling);
    }
  }

  /* Module overview ------------------------------------------------------ */
  var overviewSlot = document.querySelector("[data-module-overview]");
  if (overviewSlot && mod) {
    var ov =
      '<div class="overview-grid">' +
      '<div class="panel reveal"><h3><span aria-hidden="true">🎯</span> What you\'ll learn</h3><ul class="takeaways" style="padding:0;border:0;background:none">' +
      mod.goals.map(function (g) {
        return "<li>" + esc(g) + "</li>";
      }).join("") +
      "</ul></div>" +
      '<div class="panel reveal"><h3><span aria-hidden="true">🎒</span> Before you start</h3><ul>' +
      mod.prereqs.map(function (p) {
        return "<li>" + esc(p) + "</li>";
      }).join("") +
      "</ul></div></div>" +
      '<section class="section"><div class="section-head"><span class="eyebrow">' + (isProjects(mod) ? "The builds" : "The lessons") + "</span><h2>" +
      (isProjects(mod) ? "Pick a project" : "Work through these in order") +
      '</h2></div><ol class="lesson-list">' +
      mod.lessons.map(function (l, i) {
        return (
          '<li class="reveal"><a class="lesson-card" href="' + C.lessonHref(root, mod, l) + '"><span class="n">' + pad(i + 1) +
          '</span><span class="t"><strong>' + esc(l.title) + '</strong><span class="s">' + esc(l.summary) +
          '</span></span><span class="time">⏱ ' + duration(l.time, mod) + "</span></a></li>"
        );
      }).join("") +
      "</ol></section>" +
      '<section class="section"><div class="section-head"><span class="eyebrow">Self-check</span><h2>You\'re ready to move on when…</h2></div>' +
      '<div class="panel reveal"><ul class="checklist">' +
      mod.ready.map(function (r) {
        return "<li>" + esc(r) + "</li>";
      }).join("") +
      "</ul></div></section>" +
      '<p style="text-align:center"><a class="btn" href="' + C.lessonHref(root, mod, mod.lessons[0]) + '">Start with “' + esc(mod.lessons[0].title) + "” →</a></p>";
    overviewSlot.innerHTML = ov;
  }

  /* Pager ---------------------------------------------------------------- */
  var pagerSlot = document.querySelector("[data-pager]");
  if (pagerSlot && mod) {
    var seq = C.sequence();
    var idx = -1;
    seq.forEach(function (s, i) {
      if (s.mod.id === mod.id && ((lesson && s.lesson && s.lesson.slug === lesson.slug) || (!lesson && !s.lesson))) idx = i;
    });

    function card(item, cls, label) {
      if (!item) return "";
      var href = item.lesson ? C.lessonHref(root, item.mod, item.lesson) : C.moduleHref(root, item.mod);
      var title = item.lesson ? item.lesson.title : item.mod.title + " — overview";
      var sub = item.lesson ? item.mod.icon + " " + item.mod.title : item.mod.icon + " " + moduleLabel(item.mod);
      return (
        '<a class="' + cls + '" href="' + href + '" style="--pc:' + item.mod.colors[0] + '"><small>' + label +
        "</small><strong>" + esc(title) + "</strong><span>" + esc(sub) + "</span></a>"
      );
    }

    var nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "Lesson navigation");
    nav.innerHTML = card(seq[idx - 1], "prev", "← Previous") + card(seq[idx + 1], "next", "Next →");
    pagerSlot.parentNode.replaceChild(nav, pagerSlot);
  }

  /* Reading helpers: progress bar, back-to-top, "On this page" ------------ */
  var bar = document.createElement("div");
  bar.className = "read-progress";
  bar.innerHTML = "<span></span>";
  body.appendChild(bar);
  var barFill = bar.firstChild;

  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.textContent = "↑";
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  body.appendChild(topBtn);

  var tocLinks = [];
  var tocTargets = [];
  var contentEl = document.querySelector(".content");
  if (contentEl && page !== "home") {
    var used = {};
    contentEl.querySelectorAll(":scope > section").forEach(function (sec) {
      var h = sec.querySelector(".topic-banner h2, .section-head h2, h2");
      if (!h) return;
      var text = h.textContent.replace(/\s+/g, " ").trim();
      if (!text) return;
      var target = sec.id ? sec : h;
      if (!target.id) {
        var slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
        while (used[slug]) slug += "-2";
        target.id = slug;
      }
      used[target.id] = true;
      tocTargets.push(target);
      tocLinks.push('<li><a href="#' + target.id + '">' + esc(text) + "</a></li>");
    });
    if (tocLinks.length >= 3) {
      var toc = document.createElement("nav");
      toc.className = "toc";
      toc.setAttribute("aria-label", "On this page");
      toc.innerHTML = '<p class="toc-title">On this page</p><ol>' + tocLinks.join("") + "</ol>";
      body.appendChild(toc);
      body.classList.add("has-toc");
      tocLinks = toc.querySelectorAll("a");
    } else {
      tocLinks = [];
    }
  }

  var scrollQueued = false;
  function onScroll() {
    scrollQueued = false;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY || window.pageYOffset;
    barFill.style.transform = "scaleX(" + (docH > 0 ? Math.min(1, y / docH) : 0) + ")";
    topBtn.classList.toggle("show", y > 900);
    if (tocLinks.length) {
      var current = 0;
      var line = window.innerHeight * 0.3;
      tocTargets.forEach(function (t, i) {
        if (t.getBoundingClientRect().top < line) current = i;
      });
      tocLinks.forEach(function (a, i) {
        a.classList.toggle("active", i === current);
      });
    }
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll);
  onScroll();

  /* Reveal on scroll ----------------------------------------------------- */
  var content = document.querySelector(".content");
  if (content) {
    content.querySelectorAll(":scope > section, :scope > .one-liner").forEach(function (el) {
      el.classList.add("reveal");
    });
  }

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }
})();
