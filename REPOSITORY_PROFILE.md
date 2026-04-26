# Repository Profile: LightLine

## 1) Purpose
Hello, I am **LightLine**.

I am mainly a faith-based educational platform that teaches Bible truth through interactive content. My main goal is to make Scripture learning practical, engaging, and easy to explore for different types of learners.

I serve:
- People looking for Bible studies and devotionals
- Learners who enjoy interactive games and quizzes
- Visitors who prefer video-based learning
- Christian communities that want structured, accessible teaching resources

I am built as a hybrid project:
- A large static web platform at the root (many HTML, CSS, JS, and JSON files)
- A modern course application in `christianity-of-christ/` using Next.js + TypeScript

## 2) Key Features
These are the features that define who I am:

- Content-rich platform structure:
  - Many standalone pages for studies, devotions, videos, account options, and progress tracking
  - Organized directories like `Studies/`, `Devotions/`, and `games/`

- JSON-driven content model:
  - Core teaching/media content is stored in JSON files such as `commandments.json`, `biblestories.json`, and `newsroom.json`
  - Frontend scripts render content dynamically from these data files

- Gamified Bible learning:
  - A broad `games/` library with many themed mini-games
  - Leaderboard and engagement systems (`games/leaderboard.html`, `games/nbtt-gamification.js`)

- Video and study integration:
  - Home and video pages combine teaching videos, lessons, and quiz actions
  - Custom media flow (including Mux player support in scripts)

- Firebase-backed live features:
  - Hosting, Firestore rules, Storage rules, and Cloud Functions are configured (`firebase.json`, `firestore.rules`, `storage.rules`, `functions/`)

- Modern companion app:
  - `christianity-of-christ/` provides a production-style interactive course app with modules, API routes, Prisma data layer, tests, and responsive UI

## 3) Technology Stack
I use a multi-layer stack:

- Core web layer:
  - HTML5, CSS3, JavaScript (ES6+)
  - JSON as a structured content/data source

- Libraries and frontend tooling:
  - Chart.js
  - Framer Motion
  - Tailwind CSS
  - PostCSS + Autoprefixer

- Platform and backend services:
  - Firebase Hosting
  - Firestore + security rules
  - Firebase Storage rules
  - Firebase Cloud Functions (Node.js)

- Companion app stack (`christianity-of-christ/`):
  - Next.js 15
  - React 19
  - TypeScript
  - MDX content workflows (`gray-matter`, `next-mdx-remote`)
  - Prisma with SQLite/PostgreSQL adapter pattern
  - Vitest + ESLint

## 4) Unique Value
What makes me stand out from a typical project is my combination of scale, mission, and format diversity:

- I am not only a website; I am a full faith-learning ecosystem.
- I combine studies, devotionals, games, quizzes, and videos in one coherent teaching mission.
- I support both static-content reliability and modern app extensibility in the same repository.
- I am built for practical discipleship: content can be consumed by reading, watching, or interacting.
- I contain both grassroots handcrafted pages and a newer production-style app architecture, showing real project evolution over time.

## 5) Suggested Use
If you are new to me, this is the best way to approach me:

1. Start with the root `README.md` to understand the broad platform vision.
2. Open `index.html` and browse the core sections (studies, devotions, games, videos).
3. Review JSON content files (`commandments.json`, `biblestories.json`, `newsroom.json`) to see how data powers pages.
4. Explore the `games/`, `Studies/`, and `Devotions/` directories to understand content organization.
5. Check Firebase config (`firebase.json`, `firestore.rules`, `functions/`) for deployment and backend behavior.
6. Move into `christianity-of-christ/` when you want the modern, modular course app workflow.

If you want to contribute, begin with one lane at a time:
- Content updates: JSON + related page templates
- UI updates: CSS + page-specific scripts
- Platform logic: Firebase rules/functions
- Advanced product work: Next.js app in `christianity-of-christ/`

---
I am a living repository built to teach, challenge, and encourage through Scripture-centered digital experiences.