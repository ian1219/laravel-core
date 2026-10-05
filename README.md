# Laravel Blueprint 🚀

A visual, hands-on Laravel learning kit that runs from PHP fundamentals to advanced architecture, **one idea per page**.

It's built with **plain HTML, CSS and JavaScript**. There's no build step, no framework and no server.

## Open it

Double-click `index.html`, or:

```bash
# Windows
start index.html
# macOS
open index.html
```

All you need for the full experience is an internet connection for the Google Fonts, which fall back to system fonts when you're offline.

## What's inside

| # | Module | Level |
|---|--------|-------|
| 00 | ✨ Fundamentals: the 4 pillars of OOP, Dependency Injection, REST APIs, a full CRUD API (PUT vs PATCH, soft delete), how Laravel works and a glossary | Start Here |
| 01 | PHP Foundations: variables, arrays, functions, classes | Beginner |
| 02 | Object-Oriented PHP: encapsulation, inheritance, abstraction, polymorphism | Beginner |
| 03 | Web Fundamentals: HTTP, request/response, MVC | Beginner |
| 04 | Laravel Basics: installation, structure, routing, controllers, Blade | Beginner |
| 05 | Database & Eloquent: migrations, models, queries, relationships | Intermediate |
| 06 | Building CRUD: resource controllers, validation, create/read/update/delete | Intermediate |
| 07 | Authentication: concepts, starter kits, guards, password reset | Intermediate |
| 08 | Authorization: gates, policies, roles & permissions | Intermediate |
| 09 | API Development: REST, resources, Sanctum, versioning | Intermediate |
| 10 | Laravel Core: container, providers, facades, middleware, lifecycle, events | Advanced |
| 11 | Testing: basics, feature, unit, factories & seeders | Advanced |
| 12 | Security: CSRF/XSS, SQL injection, hashing, rate limiting | Advanced |
| 13 | Performance: eager loading, caching, queues, optimisation | Advanced |
| 14 | Architecture: services, repositories, actions/DTOs, folder strategies | Advanced |
| ★ | Projects: Todo app, Blog CMS, REST API, Mini shop | Practice |

Every lesson follows the same rhythm:

**One-sentence idea + analogy → Why it matters → Diagram → Step-by-step code → ❌ Avoid / ✅ Do → Try it yourself → Key takeaways → Mini quiz**

## What makes it different from the docs

- **🧒 The simple version:** every lesson opens with a one-line, explain-like-I'm-5 summary.
- **🏠 Real life ↔ 💻 Code:** each concept is shown as a real-world analogy next to the code.
- **🕹️ Live demos:** click and learn with a pretend REST API with soft deletes, a bank account you can't hack, a TV remote with "peek inside", a payment-method swapper, a dependency-injection plug board, a PUT vs PATCH comparison and an animated request journey.
- **🔁 Flip-card glossary** and **💬 chat-style** explanations.

## Project structure

```
index.html                 Landing page + roadmap
assets/
  css/tokens.css           Colours, fonts, spacing (dark + light themes)
  css/base.css             Reset, app shell (topbar, sidebar)
  css/components.css       Every lesson component
  css/home.css             Landing page only
  js/curriculum.js         ⭐ Single source of truth: modules & lessons
  js/layout.js             Builds topbar, sidebar, hero, overview, prev/next
  js/highlight.js          Syntax highlighting + copy button
  js/quiz.js               Interactive quizzes
  js/theme.js              Dark / light toggle
  js/home.js               Landing page roadmap & animations
  js/demos.js              Live interactive demos (<div class="demo" data-demo="…">)
modules/
  01-php-foundations/      index.html (overview) + one file per lesson
  …
  projects/
```

## Adding a lesson

1. Add an entry to the module's `lessons` array in `assets/js/curriculum.js` (`slug`, `title`, `time`, `summary`).
2. Copy `modules/04-laravel-basics/routing.html` to `modules/<module>/<slug>.html`.
3. Set `<body data-module="..." data-lesson="<slug>">` and replace the content.

The sidebar, hero, breadcrumbs, module overview and prev/next links update automatically.

### Component cheat-sheet

```html
<!-- Code block (php, blade, html, bash, sql, json, js, env, text) -->
<pre><code class="lang-php" data-file="routes/web.php" data-hl="2-3">…escaped code…</code></pre>

<!-- Callouts: info | tip | warn | try -->
<div class="callout tip"><div class="callout-title">💡 Pro tip</div><p>…</p></div>

<!-- Avoid / Do -->
<div class="compare">
  <div class="compare-card bad"><div class="compare-label">❌ Avoid</div>…</div>
  <div class="compare-card good"><div class="compare-label">✅ Do</div>…</div>
</div>

<!-- Flow diagram -->
<figure class="diagram"><div class="flow">
  <div class="flow-node"><span class="flow-icon">🌐</span><strong>Browser</strong><small>GET /</small></div>
  <div class="flow-node accent">…</div>
</div><figcaption>…</figcaption></figure>

<!-- Quiz -->
<script type="application/json" class="quiz-data">
{ "questions": [ { "q": "…", "options": ["…", "…"], "answer": 0, "explain": "…" } ] }
</script>
```

Also available: `.steps > .step`, `.why-grid > .why`, `.card-grid > .mini-card`, `.layers > .layer`, `pre.tree`, `.table-wrap`, `dl.terms`, `ul.takeaways` and `ol.milestones`.
