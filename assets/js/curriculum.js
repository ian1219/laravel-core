/* ==========================================================================
   Laravel Blueprint — curriculum data (single source of truth)
   Sidebar, breadcrumbs, heroes, module overviews and prev/next links are all
   generated from this file. To add a lesson: add an entry here + create
   modules/<module.slug>/<lesson.slug>.html.
   ========================================================================== */

window.CURRICULUM = {
  modules: [
    {
      id: "00",
      slug: "00-fundamentals",
      title: "Fundamentals",
      icon: "✨",
      colors: ["#a855f7", "#22d3ee"],
      level: "Start Here",
      summary: "The big ideas explained like you're five: the 4 pillars of OOP, Dependency Injection, REST APIs, and a full CRUD API you can play with live.",
      goals: [
        "Explain the 4 pillars of OOP with everyday examples",
        "Understand Dependency Injection without the jargon",
        "Know what an API and a REST API really are",
        "Build create, get all, get one, PUT, PATCH, DELETE and soft delete endpoints",
        "Speak 'Laravel': the key words in plain English",
      ],
      prereqs: ["Nothing! Just curiosity ☕", "Come back here whenever a word in another lesson feels scary"],
      ready: [
        "I can explain each OOP pillar to a friend using a real-life example",
        "I can say why Dependency Injection makes code easier to change and test",
        "I know which HTTP method to use for create, read, update and delete",
        "I can explain PUT vs PATCH and what a soft delete is",
      ],
      lessons: [
        { slug: "four-pillars", title: "The 4 Pillars of OOP", time: 14, summary: "Encapsulation, Inheritance, Abstraction and Polymorphism, explained with ATMs, families, TV remotes and pets.", simple: "OOP is a way to organise code like real-world things. The 4 pillars are 4 good habits: hide the insides, reuse from parents, show only the buttons, and let different things answer the same command in their own way." },
        { slug: "dependency-injection", title: "Dependency Injection", time: 10, summary: "Hand a class the tools it needs instead of letting it build them itself.", simple: "Don't glue the battery inside the toy. Give the toy a battery slot, so you can plug in any battery you want: a real one, a test one or a bigger one." },
        { slug: "rest-api", title: "APIs & REST APIs", time: 10, summary: "A waiter between apps, and the simple rules REST adds so everyone understands each other.", simple: "An API is a waiter: your app tells the waiter what it wants, and the waiter brings it from the kitchen (the server). REST is a set of standard rules, so every waiter works the same way." },
        { slug: "crud-api", title: "Build a Simple CRUD API", time: 18, summary: "Create, get all, get one, PUT vs PATCH, DELETE and soft delete, then try every request live.", simple: "CRUD stands for Create, Read, Update and Delete: the 4 things you do with any data. You'll build each one as an API endpoint and test them in a live playground." },
        { slug: "how-laravel-works", title: "How Laravel Works: The Story", time: 9, summary: "Follow one click through Laravel like a pizza order, from the URL to the response.", simple: "Every click is like a pizza order. It arrives at the door, passes security, and the right chef cooks it with ingredients from the fridge. Then it's boxed and sent back." },
        { slug: "glossary", title: "Laravel Words in Plain English", time: 10, summary: "Flip cards for the Laravel words you'll hear every day: route, model, migration, middleware and more.", simple: "Laravel has its own vocabulary. Each card here turns one scary word into one friendly sentence." },
      ],
    },
    {
      id: "01",
      slug: "01-php-foundations",
      title: "PHP Foundations",
      icon: "🐘",
      colors: ["#8b5cf6", "#6366f1"],
      level: "Beginner",
      summary: "The language Laravel is written in. Learn to store data, loop over it and package logic into functions and classes.",
      goals: [
        "Store and change data with variables and types",
        "Group data with indexed and associative arrays",
        "Write reusable functions with typed parameters",
        "Create your first classes and objects",
      ],
      prereqs: ["A code editor (VS Code recommended)", "PHP 8.2+ installed, or an online PHP sandbox"],
      ready: [
        "I can explain the difference between a string, int, bool and array",
        "I can loop over an array with foreach",
        "I can write a function that takes arguments and returns a value",
        "I can create an object from a class and call its methods",
      ],
      lessons: [
        { slug: "variables", title: "Variables & Data Types", time: 8, summary: "Labelled boxes that hold your data — strings, numbers, booleans and null." , simple: "A variable is a labelled box. You put something inside (a name, a number, yes/no) and later ask for it by its label: <code>$name</code>." },
        { slug: "arrays", title: "Arrays", time: 10, summary: "Lists and key-value maps: the data structure you'll use everywhere in Laravel." , simple: "An array is a shopping list. It can be a numbered list (item 0, 1, 2…) or a list with labels like “name → Ana”, “age → 25”." },
        { slug: "functions", title: "Functions", time: 10, summary: "Package logic once, reuse it everywhere — with types, defaults and arrow functions." , simple: "A function is a recipe card. Write the steps once, give it a name, then “cook” it anytime by calling the name." },
        { slug: "classes-objects", title: "Classes & Objects", time: 12, summary: "Blueprints and the things built from them — the heart of every Laravel file." , simple: "A class is a cookie cutter; objects are the cookies. One cutter, many cookies — each can have its own sprinkles (data)." },
      ],
    },
    {
      id: "02",
      slug: "02-oop",
      title: "Object-Oriented PHP",
      icon: "🧩",
      colors: ["#ec4899", "#8b5cf6"],
      level: "Beginner",
      summary: "The four pillars of OOP. Laravel is built entirely from objects — this is how you read and extend it.",
      goals: [
        "Protect an object's data with visibility (encapsulation)",
        "Reuse code by extending parent classes",
        "Define contracts with abstract classes and interfaces",
        "Swap behaviour through polymorphism",
      ],
      prereqs: ["Module 01 — especially Classes & Objects"],
      ready: [
        "I know when to use public, protected and private",
        "I can extend a class and override a method",
        "I can explain what an interface is and why Laravel calls them 'contracts'",
        "I can write code that works with any class implementing an interface",
      ],
      lessons: [
        { slug: "encapsulation", title: "Encapsulation", time: 9, summary: "Hide the internals, expose a clean surface — public, protected and private." , simple: "Like an ATM: you press buttons (public methods) to get money, but you can't reach inside and grab the cash (private data)." },
        { slug: "inheritance", title: "Inheritance", time: 9, summary: "Children inherit from parents. Every Laravel model extends a base class." , simple: "A child inherits traits from a parent. A <code>SportsCar</code> gets everything a <code>Car</code> has — wheels, engine — and adds turbo." },
        { slug: "abstraction", title: "Abstraction & Interfaces", time: 11, summary: "Say what must happen without saying how —abstract classes, interfaces and traits." , simple: "A TV remote: you press “Volume +”, you don't need to know the electronics inside. Show the buttons, hide the wiring." },
        { slug: "polymorphism", title: "Polymorphism", time: 9, summary: "Many shapes, one interface — the trick that makes Laravel drivers swappable." , simple: "Tell any animal to “speak” — the dog barks, the cat meows. Same command, different behaviour depending on who receives it." },
      ],
    },
    {
      id: "03",
      slug: "03-web-fundamentals",
      title: "Web Fundamentals",
      icon: "🌐",
      colors: ["#06b6d4", "#3b82f6"],
      level: "Beginner",
      summary: "What actually happens when someone opens your site. HTTP, requests, responses and the MVC pattern.",
      goals: [
        "Understand HTTP methods, status codes and headers",
        "Follow a request from the browser to PHP and back",
        "Explain Model–View–Controller and why Laravel uses it",
      ],
      prereqs: ["Basic HTML knowledge", "Modules 01–02 recommended"],
      ready: [
        "I know the difference between GET and POST",
        "I can tell what a 200, 302, 404 and 500 mean",
        "I can explain which part of MVC does what",
      ],
      lessons: [
        { slug: "http", title: "How HTTP Works", time: 9, summary: "The language browsers and servers speak — methods, status codes and headers." , simple: "HTTP is the language browsers and servers use to talk. The browser asks (“GET me this page”), the server answers with a number (200 = OK, 404 = not found)." },
        { slug: "request-response", title: "Request & Response", time: 8, summary: "Every web app is one loop: a request comes in, a response goes out." , simple: "Ordering at a counter: you hand over an order slip (request), the kitchen prepares it, you get your food back (response). Every page works like this." },
        { slug: "mvc", title: "The MVC Pattern", time: 9, summary: "Models, Views, Controllers — three jobs, three places, one tidy app." , simple: "A restaurant: the Model is the kitchen storeroom (data), the View is the plate presentation (HTML), the Controller is the waiter who connects them." },
      ],
    },
    {
      id: "04",
      slug: "04-laravel-basics",
      title: "Laravel Basics",
      icon: "🚀",
      colors: ["#ff2d20", "#f97316"],
      level: "Beginner",
      summary: "Install Laravel, learn where everything lives, and build pages with routes, controllers and Blade.",
      goals: [
        "Create a new Laravel project and run it locally",
        "Know what each top-level folder is for",
        "Map URLs to code with routes",
        "Organise logic in controllers and render HTML with Blade",
      ],
      prereqs: ["Modules 01–03", "PHP 8.2+, Composer and Node.js installed"],
      ready: [
        "I can create a project and open it in the browser",
        "I know where routes, controllers and views live",
        "I can create a route with a parameter and a named route",
        "I can build a Blade layout and extend it from a page",
      ],
      lessons: [
        { slug: "installation", title: "Installation & Setup", time: 8, summary: "From zero to a running Laravel app in a few commands." , simple: "Installing Laravel is like unpacking a furniture kit — one command gives you all the parts already arranged, and <code>php artisan serve</code> turns the lights on." },
        { slug: "directory-structure", title: "Directory Structure", time: 9, summary: "A guided tour of every folder — and which ones you'll actually touch." , simple: "Laravel is a house with labelled rooms: <code>routes/</code> is the front door, <code>app/</code> is the brain, <code>resources/views</code> is the decoration, <code>database/</code> is the storage room." },
        { slug: "routing", title: "Routing", time: 12, summary: "Routes are the front door — they decide which code answers each URL." , simple: "A route is a signpost: “If someone visits <code>/about</code>, send them to this code.”" },
        { slug: "controllers", title: "Controllers", time: 10, summary: "Move logic out of route files into tidy, testable classes." , simple: "A controller is a manager. The route says “go to the manager”, and the manager decides what to fetch and which page to show." },
        { slug: "blade", title: "Blade Templates", time: 12, summary: "Laravel's templating engine — layouts, components, loops and safe output." , simple: "Blade is a fill-in-the-blanks HTML template. You write the page once and Laravel fills in the blanks like <code>{{ $name }}</code>." },
      ],
    },
    {
      id: "05",
      slug: "05-database",
      title: "Database & Eloquent",
      icon: "🗄️",
      colors: ["#10b981", "#06b6d4"],
      level: "Intermediate",
      summary: "Design tables with migrations and talk to them with Eloquent — Laravel's beautifully simple ORM.",
      goals: [
        "Version-control your schema with migrations",
        "Create Eloquent models and understand their conventions",
        "Query, filter, sort and paginate data",
        "Connect models with relationships",
      ],
      prereqs: ["Module 04", "Basic idea of what a database table is"],
      ready: [
        "I can create, run and roll back a migration",
        "I understand $fillable and mass assignment",
        "I can write where/orderBy/paginate queries",
        "I can define hasMany / belongsTo / belongsToMany",
      ],
      lessons: [
        { slug: "migrations", title: "Migrations", time: 10, summary: "Version control for your database — build tables with PHP, not SQL dumps." , simple: "Migrations are building instructions for your database tables, written in PHP. Share them and everyone builds the exact same tables." },
        { slug: "models", title: "Models", time: 9, summary: "One class per table. Your PHP window into the database." , simple: "A model is a PHP “remote control” for one database table. <code>Post</code> controls the <code>posts</code> table." },
        { slug: "eloquent", title: "Eloquent Queries", time: 12, summary: "Fetch, filter, create, update and delete — fluently and safely." , simple: "Eloquent lets you talk to the database in plain PHP sentences: <code>Post::where('published', true)-&gt;get()</code> instead of writing SQL." },
        { slug: "relationships", title: "Relationships", time: 13, summary: "Users have posts, posts have tags — express it in one line." , simple: "Relationships are family ties between tables: a User <em>has many</em> Posts, a Post <em>belongs to</em> a User." },
      ],
    },
    {
      id: "06",
      slug: "06-crud",
      title: "Building CRUD",
      icon: "🛠️",
      colors: ["#f59e0b", "#ef4444"],
      level: "Intermediate",
      summary: "Put it all together: Create, Read, Update and Delete — the backbone of almost every web app.",
      goals: [
        "Generate a resource controller with all 7 actions",
        "Build forms and validate input",
        "List, show and create records",
        "Edit and delete records safely",
      ],
      prereqs: ["Modules 04–05"],
      ready: [
        "I can name the 7 resource actions and their HTTP verbs",
        "I can validate a request and show errors in Blade",
        "I can use @csrf and @method in forms",
        "I can build a complete CRUD for one model",
      ],
      lessons: [
        { slug: "resource-controllers", title: "Resource Controllers", time: 9, summary: "One line of routing, seven ready-made actions." , simple: "One command creates a controller with the 7 standard actions (list, show, create, store, edit, update, delete) already named for you." },
        { slug: "forms-validation", title: "Forms & Validation", time: 13, summary: "Never trust user input — validate it, then show friendly errors." , simple: "Validation is the bouncer at the door: it checks every form field (is the email real? is the title filled in?) before letting data in." },
        { slug: "create-read", title: "Create & Read", time: 12, summary: "Build the index, show and create screens of a real CRUD." , simple: "Create = add a new row (write a new diary entry). Read = look at rows (flip through the diary)." },
        { slug: "update-delete", title: "Update & Delete", time: 11, summary: "Finish the cycle with edit forms, updates and safe deletes." , simple: "Update = edit an existing row (fix a typo in your diary). Delete = tear out the page." },
      ],
    },
    {
      id: "07",
      slug: "07-authentication",
      title: "Authentication",
      icon: "🔐",
      colors: ["#3b82f6", "#8b5cf6"],
      level: "Intermediate",
      summary: "Who are you? Logins, registration, sessions and password resets — mostly done for you.",
      goals: [
        "Understand how session-based login works",
        "Scaffold auth with a starter kit",
        "Protect routes and read the current user",
        "Add email verification and password reset",
      ],
      prereqs: ["Modules 04–06"],
      ready: [
        "I can explain authentication vs authorization",
        "I can install a starter kit and register a user",
        "I can protect routes with the auth middleware",
        "I can access the logged-in user anywhere",
      ],
      lessons: [
        { slug: "auth-concepts", title: "How Authentication Works", time: 9, summary: "Sessions, cookies and hashed passwords — the mechanics behind 'Log in'." , simple: "Authentication answers “Who are you?” — like showing your ID at the door and getting a wristband (session) so you don't show it again." },
        { slug: "starter-kits", title: "Starter Kits", time: 9, summary: "Get login, register and profile pages in one command." , simple: "A starter kit is a ready-made login system: register, login, forgot password — installed in one go so you don't build it from scratch." },
        { slug: "sessions-guards", title: "Guards & Protecting Routes", time: 10, summary: "Lock pages behind login and read the current user anywhere." , simple: "A guard is a security guard at specific pages: “Only people with a wristband (logged in) may enter.”" },
        { slug: "password-reset", title: "Email Verification & Password Reset", time: 9, summary: "The account features every real app needs." , simple: "Forgot your password? Laravel emails you a one-time link (like a spare key) and checks your email is real before you can use the account." },
      ],
    },
    {
      id: "08",
      slug: "08-authorization",
      title: "Authorization",
      icon: "🛡️",
      colors: ["#14b8a6", "#22c55e"],
      level: "Intermediate",
      summary: "What are you allowed to do? Gates, policies and roles keep users in their lane.",
      goals: [
        "Write simple permission checks with gates",
        "Group model permissions into policies",
        "Design a role/permission system",
      ],
      prereqs: ["Module 07"],
      ready: [
        "I can define and check a gate",
        "I can generate a policy and use it in a controller and Blade",
        "I can explain when to reach for roles & permissions",
      ],
      lessons: [
        { slug: "gates", title: "Gates", time: 8, summary: "Simple yes/no permission checks defined in one place." , simple: "A gate is a simple yes/no rule: “Can this user do this?” — like a turnstile that only opens for staff." },
        { slug: "policies", title: "Policies", time: 11, summary: "All the rules for one model, organised in one class." , simple: "A policy is a rulebook for one thing (e.g. Posts): who can view, edit or delete it — all rules in one file." },
        { slug: "roles-permissions", title: "Roles & Permissions", time: 11, summary: "Admins, editors, viewers — scale your rules as the team grows." , simple: "Roles are job titles (Admin, Editor). Permissions are keys (edit posts, delete users). Give a role a set of keys, then give users roles." },
      ],
    },
    {
      id: "09",
      slug: "09-api-development",
      title: "API Development",
      icon: "🔌",
      colors: ["#f97316", "#f59e0b"],
      level: "Intermediate",
      summary: "Serve JSON to mobile apps and JavaScript frontends with REST, API resources and Sanctum tokens.",
      goals: [
        "Design RESTful endpoints",
        "Shape JSON output with API resources",
        "Authenticate API clients with Sanctum",
        "Version your API and return consistent errors",
      ],
      prereqs: ["Modules 05–07"],
      ready: [
        "I can design REST URLs for a resource",
        "I can return a paginated API resource collection",
        "I can issue and use a Sanctum token",
        "I return proper status codes and validation errors as JSON",
      ],
      lessons: [
        { slug: "rest-basics", title: "REST Basics", time: 9, summary: "Nouns in URLs, verbs in methods, JSON in bodies." , simple: "REST is a set of manners for APIs: use nouns in URLs (<code>/posts</code>) and verbs in methods (GET reads, POST creates, DELETE removes)." },
        { slug: "api-routes-resources", title: "API Routes & Resources", time: 12, summary: "routes/api.php and API Resources: control exactly what JSON goes out." , simple: "API routes send JSON instead of web pages. API Resources are the packaging — they decide exactly which fields go in the box." },
        { slug: "sanctum", title: "Sanctum Authentication", time: 11, summary: "Lightweight token auth for SPAs and mobile apps." , simple: "Sanctum gives apps a token (like a hotel key card). The app shows the card with every request and Laravel knows who it is." },
        { slug: "versioning-errors", title: "Versioning & Error Handling", time: 10, summary: "Keep old clients working and make every error predictable." , simple: "Versioning = keep the old menu (<code>v1</code>) while launching a new one (<code>v2</code>). Good errors = always tell the customer clearly what went wrong." },
      ],
    },
    {
      id: "10",
      slug: "10-laravel-core",
      title: "Laravel Core Concepts",
      icon: "⚙️",
      colors: ["#ef4444", "#ec4899"],
      level: "Advanced",
      summary: "Look under the hood: the service container, providers, facades, middleware, the request lifecycle and events.",
      goals: [
        "Understand dependency injection and the service container",
        "Register services in providers",
        "Know what a facade really is",
        "Write middleware and follow the full request lifecycle",
        "Decouple code with events and listeners",
      ],
      prereqs: ["Modules 02 and 04–06"],
      ready: [
        "I can explain how Laravel 'magically' injects classes",
        "I can bind an interface to an implementation",
        "I can write and register custom middleware",
        "I can trace a request from public/index.php to the response",
      ],
      lessons: [
        { slug: "service-container", title: "The Service Container", time: 13, summary: "Laravel's factory that builds your classes — and their dependencies — for you." , simple: "The service container is a smart vending machine: ask for a class and it builds it — plus everything that class needs — automatically." },
        { slug: "service-providers", title: "Service Providers", time: 10, summary: "The boot-up scripts where services get registered and configured." , simple: "Service providers are the opening checklist of a shop: before customers arrive, they set up and register everything the app will need." },
        { slug: "facades", title: "Facades", time: 9, summary: "Static-looking shortcuts to real objects in the container." , simple: "A facade is a shortcut button. <code>Cache::get()</code> looks static, but behind the button Laravel finds the real cache object for you." },
        { slug: "middleware", title: "Middleware", time: 11, summary: "Layers every request passes through — like airport security checks." , simple: "Middleware is airport security: every request walks through checkpoints (logged in? not banned?) before it reaches the gate (controller)." },
        { slug: "request-lifecycle", title: "The Request Lifecycle", time: 12, summary: "Follow one request through Laravel, from first line to final byte." , simple: "The life of a request: enter the building (<code>public/index.php</code>), go through security (middleware), meet the right person (controller), leave with an answer (response)." },
        { slug: "events", title: "Events & Listeners", time: 10, summary: "Announce that something happened and let other code react." , simple: "Events are announcements: “An order was placed!” — and any listener who cares (email, stock, analytics) reacts on its own." },
      ],
    },
    {
      id: "11",
      slug: "11-testing",
      title: "Testing",
      icon: "🧪",
      colors: ["#22c55e", "#84cc16"],
      level: "Advanced",
      summary: "Ship with confidence. Write feature and unit tests with Pest/PHPUnit and fake data with factories.",
      goals: [
        "Run tests and read the results",
        "Write feature tests that hit routes",
        "Unit-test isolated classes",
        "Generate realistic test data with factories & seeders",
      ],
      prereqs: ["Modules 05–07"],
      ready: [
        "I can run php artisan test and understand failures",
        "I can test a route's status, view and database changes",
        "I can test a class in isolation",
        "I can create models with factories in tests",
      ],
      lessons: [
        { slug: "testing-basics", title: "Testing Basics", time: 9, summary: "Why test, what to test, and running your first test." , simple: "Tests are robots that click through your app for you and shout if something breaks — every time you change code." },
        { slug: "feature-tests", title: "Feature Tests", time: 12, summary: "Pretend to be a browser and check the whole flow works." , simple: "A feature test pretends to be a real user: visit a page, submit a form, then check the result is right." },
        { slug: "unit-tests", title: "Unit Tests", time: 9, summary: "Test one small piece of logic in isolation — fast and focused." , simple: "A unit test checks one tiny piece (one function) on its own — like testing a single light bulb before installing it." },
        { slug: "factories-seeders", title: "Factories & Seeders", time: 10, summary: "Generate realistic fake data for tests and local development." , simple: "Factories are fake-data machines (100 users with random names). Seeders press the button to fill your database with that data." },
      ],
    },
    {
      id: "12",
      slug: "12-security",
      title: "Security",
      icon: "🔒",
      colors: ["#f43f5e", "#f97316"],
      level: "Advanced",
      summary: "Know the common attacks and the Laravel features that stop them.",
      goals: [
        "Stop CSRF and XSS attacks",
        "Prevent SQL injection and mass-assignment bugs",
        "Hash passwords and encrypt sensitive data",
        "Rate-limit abusive traffic",
      ],
      prereqs: ["Modules 05–09"],
      ready: [
        "I can explain CSRF and XSS in plain words",
        "I never put raw user input into SQL",
        "I know the difference between hashing and encryption",
        "I can add a rate limiter to a route",
      ],
      lessons: [
        { slug: "csrf-xss", title: "CSRF & XSS", time: 10, summary: "Two classic attacks — and the two Blade habits that stop them." , simple: "CSRF = a stranger submitting forms in your name; Laravel adds a secret token so it can't. XSS = sneaking scripts into pages; Blade's <code>{{ }}</code> neutralises them." },
        { slug: "sql-injection-mass-assignment", title: "SQL Injection & Mass Assignment", time: 10, summary: "Keep attackers out of your queries and your model attributes." , simple: "SQL injection = sneaking commands into your database queries. Mass assignment = sneaking extra fields (like <code>is_admin</code>) into a form. Laravel blocks both if you use it right." },
        { slug: "hashing-encryption", title: "Hashing & Encryption", time: 9, summary: "One-way vs two-way: protect passwords and secrets correctly." , simple: "Hashing is a blender — you can't un-blend a smoothie (passwords). Encryption is a locked box — you can open it again with the key (secret data)." },
        { slug: "rate-limiting", title: "Rate Limiting", time: 8, summary: "Slow down brute-force and abusive clients." , simple: "Rate limiting is a “max 5 tries per minute” sign. It stops bots from hammering your login page." },
      ],
    },
    {
      id: "13",
      slug: "13-performance",
      title: "Performance",
      icon: "⚡",
      colors: ["#eab308", "#22c55e"],
      level: "Advanced",
      summary: "Make it fast: kill N+1 queries, cache smartly, push slow work to queues and optimise for production.",
      goals: [
        "Spot and fix N+1 query problems",
        "Cache expensive results",
        "Move slow tasks to background queues",
        "Optimise a production deployment",
      ],
      prereqs: ["Modules 05 and 10"],
      ready: [
        "I can use with() to eager load relationships",
        "I can use Cache::remember",
        "I can dispatch a job and run a queue worker",
        "I know which artisan commands to run on deploy",
      ],
      lessons: [
        { slug: "eager-loading", title: "Eager Loading & N+1", time: 10, summary: "The #1 Laravel performance bug — and its one-word fix." , simple: "Instead of going to the shop 50 times for 50 items (N+1), write one shopping list and go once. <code>with()</code> is the shopping list." },
        { slug: "caching", title: "Caching", time: 10, summary: "Remember expensive answers so you don't calculate them twice." , simple: "Caching is remembering an answer so you don't redo the hard maths every time someone asks." },
        { slug: "queues-jobs", title: "Queues & Jobs", time: 12, summary: "Send emails and process files in the background — users don't wait." , simple: "Queues are a to-do list for later: “Send this email” goes on the list and a worker does it in the background, so the user doesn't wait." },
        { slug: "optimization-commands", title: "Production Optimisation", time: 8, summary: "Cache config, routes and views — the deploy checklist." , simple: "Before launch day, pack everything tight: Laravel's cache commands bundle config, routes and views so the app starts faster." },
      ],
    },
    {
      id: "14",
      slug: "14-architecture",
      title: "Architecture",
      icon: "🏛️",
      colors: ["#6366f1", "#06b6d4"],
      level: "Advanced",
      summary: "Keep big apps clean: service classes, repositories, actions, DTOs and folder strategies.",
      goals: [
        "Keep controllers thin with service classes",
        "Know when the repository pattern helps (and when it doesn't)",
        "Use single-purpose actions and DTOs",
        "Choose a folder structure that scales",
      ],
      prereqs: ["Modules 02, 06 and 10"],
      ready: [
        "My controllers mostly just validate, delegate and respond",
        "I can extract business logic into an action or service",
        "I can explain trade-offs between architecture styles",
      ],
      lessons: [
        { slug: "service-classes", title: "Service Classes", time: 10, summary: "Fat models, fat controllers? Give business logic its own home." , simple: "Move the real work out of the controller into a specialist class — the waiter takes the order, the chef (service) cooks it." },
        { slug: "repository-pattern", title: "Repository Pattern", time: 10, summary: "Hide data access behind an interface — and know when not to." , simple: "A repository is a librarian: you ask “give me the latest posts” and don't care which shelf (database) it comes from." },
        { slug: "actions-dtos", title: "Actions & DTOs", time: 11, summary: "One class, one job — with typed data objects to carry inputs." , simple: "An Action is one class that does one job (<code>PublishPost</code>). A DTO is a neat, labelled envelope that carries the data in." },
        { slug: "folder-strategies", title: "Structuring Large Apps", time: 10, summary: "Default structure vs domain folders vs modules — choosing wisely." , simple: "As the app grows, organise like a supermarket: group things by aisle (feature/domain) so anyone can find them fast." },
      ],
    },
    {
      id: "P",
      slug: "projects",
      title: "Projects",
      icon: "🏗️",
      colors: ["#ff2d20", "#8b5cf6"],
      level: "Practice",
      summary: "Learn by building. Four guided projects that combine every module into real apps.",
      goals: [
        "Build a full CRUD app from scratch",
        "Add auth, authorization and relationships",
        "Ship a token-authenticated JSON API",
        "Combine queues, caching and architecture in a larger app",
      ],
      prereqs: ["Start Project 1 after Module 06; the rest map to later modules"],
      ready: [
        "I've built and deployed at least one project",
        "I can plan features as small milestones",
        "I know which lesson to revisit when I'm stuck",
      ],
      lessons: [
        { slug: "todo-app", title: "Project 1 · Todo App", time: 60, summary: "Your first full CRUD — tasks, validation, Blade and Tailwind." , simple: "Build a simple to-do list: add tasks, tick them off, edit and delete them. Your first complete Laravel app!" },
        { slug: "blog-cms", title: "Project 2 · Blog CMS", time: 120, summary: "Users, posts, categories, policies and image uploads." , simple: "Build a blog where people sign up, write posts with pictures, and can only edit their own work." },
        { slug: "rest-api", title: "Project 3 · REST API", time: 120, summary: "A token-protected JSON API with resources, tests and rate limits." , simple: "Build a JSON API that a mobile app could use — with login tokens, tests and speed limits." },
        { slug: "e-commerce-mini", title: "Project 4 · Mini Shop", time: 240, summary: "Products, cart, orders, queued emails and clean architecture." , simple: "Build a mini online shop: products, a cart, orders and order emails sent in the background." },
      ],
    },
  ],
};

/* Helpers ---------------------------------------------------------------- */

(function () {
  var C = window.CURRICULUM;

  C.findModule = function (id) {
    for (var i = 0; i < C.modules.length; i++) {
      if (C.modules[i].id === id) return C.modules[i];
    }
    return null;
  };

  C.moduleHref = function (root, mod) {
    return root + "modules/" + mod.slug + "/index.html";
  };

  C.lessonHref = function (root, mod, lesson) {
    return root + "modules/" + mod.slug + "/" + lesson.slug + ".html";
  };

  /* Flat reading order: module overview, then its lessons, then next module */
  C.sequence = function () {
    var seq = [];
    C.modules.forEach(function (m) {
      seq.push({ mod: m, lesson: null });
      m.lessons.forEach(function (l) {
        seq.push({ mod: m, lesson: l });
      });
    });
    return seq;
  };

  C.totals = function () {
    var lessons = 0;
    var minutes = 0;
    C.modules.forEach(function (m) {
      lessons += m.lessons.length;
      m.lessons.forEach(function (l) {
        minutes += l.time;
      });
    });
    return { modules: C.modules.length, lessons: lessons, minutes: minutes };
  };
})();
