export const projectsList = [
  {
    id: "finance-dashboard",
    title: "Personal Finance Dashboard",
    difficulty: "Medium",
    category: "Fintech & Analytics",
    concepts: ["React", "Charts", "Cookies", "LocalStorage", "Filters"],
    summary:
      "Comprehensive personal wealth and cashflow tracker with visual income/expense analytics, budget alarms, transaction categorization, and persistent cookie memory.",
    description:
      "A client-side personal finance dashboard built to provide real-time visibility into income streams, monthly spending velocity, and categorical breakdowns. Features interactive SVG data visualizations, quick filtering by date and category, and cookie-based persistence so visitors can test their own balances without losing data.",
    highlights: [
      "Visual net-worth and cash-flow breakdown using dynamic SVG bar & progress charts",
      "Instant transaction tagging: Salary, Freelance, Food, Rent, Tech, Leisure",
      "In-device memory storage utilizing secure cookies and localStorage synchronization",
      "Export summary report and reset test data anytime",
    ],
    techStack: ["React 18", "SVG Charts", "TailwindCSS", "Cookies API", "LocalStorage"],
    demoType: "finance",
    githubUrl: "https://github.com/TejasKarambe/finance",
  },
  {
    id: "job-tracker",
    title: "Job Application Tracker",
    difficulty: "Medium",
    category: "Productivity",
    concepts: ["React", "Redux Toolkit", "Forms", "Persistence"],
    summary:
      "Full lifecycle job hunt manager with status pipelines (Applied, Interviewing, Offer, Rejected), interview dates, and salary metrics.",
    description:
      "Streamlines the tech job search with structured tracking of application status, interview schedules, referral contacts, and expected CTC. Implements normalized state management inspired by Redux Toolkit architecture, robust validation, and instant status updates.",
    highlights: [
      "Pipeline stage indicators with status counters (Applied, Screening, Interview, Offer)",
      "Detailed metadata logging: Role, Company, Location, Compensation, Interview Date",
      "Filterable search across companies, roles, and status tags",
      "Local state persistence preserving application pipelines across sessions",
    ],
    techStack: ["React", "Redux Toolkit Pattern", "React Hook Form", "TailwindCSS"],
    demoType: "jobs",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "expense-splitter",
    title: "Expense Splitter",
    difficulty: "Easy",
    category: "Utility & Finance",
    concepts: ["React", "Calculations", "Cookies", "LocalStorage"],
    summary:
      "Instant group bill and dining expense calculator with custom tip, tax, itemized contributions, and debt settlement logic.",
    description:
      "Solves group trip and dinner bill splitting dilemmas with precision math. Calculates fair shares, accommodates tip percentages, handles uneven contributions, and generates a clean settlement breakdown showing who owes whom.",
    highlights: [
      "Dynamic participant management (add/remove friends with custom shares)",
      "Tip and tax percentage slider with instant reactive mathematical updates",
      "Exact settlement summary: 'Alice owes Bob $18.50'",
      "Persistent session stored in cookies for easy reload during group trips",
    ],
    techStack: ["React", "Math Engine", "Cookies API", "TailwindCSS"],
    demoType: "splitter",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "kanban-manager",
    title: "Kanban Project Manager",
    difficulty: "Medium",
    category: "Agile & Management",
    concepts: ["Drag & Drop", "Redux", "Persistence"],
    summary:
      "Agile board for sprint planning with interactive column movements, priority badges, task tagging, and state persistence.",
    description:
      "A Kanban workflow application modeled after enterprise Jira/Trello boards used in Agile ERP teams. Allows moving tasks seamlessly across Backlog, In Development, Code Review, and Done columns, complete with priority indicators and due dates.",
    highlights: [
      "Interactive task cards with instant column transition controls and click-to-move",
      "Color-coded priority flags: Critical, High, Medium, Low",
      "Persisted board state via client-side storage so team progress is never lost",
      "Quick task creator with title, tag, assignee, and description fields",
    ],
    techStack: ["React", "State Reducer", "Drag & Drop API", "TailwindCSS"],
    demoType: "kanban",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "ecommerce-frontend",
    title: "E-commerce Frontend",
    difficulty: "Medium",
    category: "E-Commerce",
    concepts: ["Product Filtering", "Cart", "Cookies", "Routing"],
    summary:
      "High-conversion tech hardware storefront with dynamic faceted filtering, instant search, slide-over cart, coupon codes, and cookie persistence.",
    description:
      "An ultra-fast client-side storefront for developer gadgets and electronics. Features multi-attribute filtering (category, price range, in-stock), real-time search indexing, animated slide-over shopping bag, coupon code validation, and checkout simulation.",
    highlights: [
      "Multi-facet category filtering with instant UI re-render",
      "Slide-out shopping drawer with quantity counter, coupon system, and subtotal calculation",
      "Cart state persisted to visitor cookies so cart items survive tab close",
      "Responsive design with rich hover zoom effects and stock badges",
    ],
    techStack: ["React", "Lucide Icons", "Cookies Engine", "TailwindCSS"],
    demoType: "ecommerce",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    difficulty: "Easy",
    category: "Productivity",
    concepts: ["Calendar", "Streaks", "Charts", "LocalStorage"],
    summary:
      "Daily habit accountability tracker with streak counters, weekly completion heatmaps, motivational milestones, and local persistence.",
    description:
      "Empowers users to build lasting habits like daily coding, DSA practice, reading, and fitness. Provides visual 7-day checkboxes, continuous streak calculations, and completion percentages that encourage daily consistency.",
    highlights: [
      "Interactive 7-day completion toggles with satisfying click feedback",
      "Dynamic streak calculation with fire badges (🔥) for uninterrupted streaks",
      "Completion progress ring and weekly consistency metrics",
      "Custom habit creator with icon and category selection",
    ],
    techStack: ["React", "LocalStorage API", "SVG Rings", "TailwindCSS"],
    demoType: "habits",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "portfolio-cms",
    title: "Developer Portfolio CMS",
    difficulty: "Medium",
    category: "Content Management",
    concepts: ["Forms", "Themes", "Local Data", "Cookies"],
    summary:
      "Client-side CMS allowing developers to customize profile metadata, toggle sections, select color themes, and export/import config JSON.",
    description:
      "An in-browser content management studio designed for personal portfolios. Visitors can edit profile tags, test different color palettes (Cyberpunk, Matrix, Sunset, Sapphire), and instantly preview the layout modifications before exporting their profile configuration.",
    highlights: [
      "Live preview form editor with real-time DOM synchronization",
      "Theme selector driving CSS variables across the portfolio layout",
      "JSON export/import feature for zero-backend configuration portability",
      "Persists developer preferences using cookies and localStorage",
    ],
    techStack: ["React", "CSS Variables", "JSON Engine", "Cookies API"],
    demoType: "cms",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    difficulty: "Medium",
    category: "Career Tools",
    concepts: ["React Hook Form", "Live Preview", "PDF Generation"],
    summary:
      "Interactive developer resume architect with real-time split-screen preview, ATS-friendly templates, and one-click PDF print export.",
    description:
      "Crafts ATS-compliant software developer resumes with live side-by-side editing. Supports structured inputs for contact info, technical skills, ERP experiences, and education, formatted into an elegant modern print layout.",
    highlights: [
      "Side-by-side live preview that updates with every keystroke",
      "Preloaded with Tejas Karambe's enterprise full-stack credentials",
      "One-click browser Print-to-PDF formatting with custom print stylesheets",
      "Dynamic skill tag generator and project bullet formatter",
    ],
    techStack: ["React", "React Hook Form", "CSS Print Styles", "TailwindCSS"],
    demoType: "resume",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "interview-prep",
    title: "Interview Preparation App",
    difficulty: "Medium",
    category: "Education & Career",
    concepts: ["Questions", "Progress", "Bookmarks", "Quiz Engine"],
    summary:
      "Technical interview drill simulator covering Java, Spring Boot, React, and SQL with timed quiz mode, flashcards, and bookmarking.",
    description:
      "A technical interview training platform curated for full-stack engineering candidates. Features categorized question banks (Core Java, Spring Boot, React Virtual DOM, Database Indexing), interactive multiple-choice tests, and progress tracking.",
    highlights: [
      "Interactive quiz engine with instant score report and explanation reveals",
      "Category switching: Java 21, Spring Boot, React.js, and SQL / Systems",
      "Question bookmarking saved to visitor's cookie vault for review",
      "Mastery progress meter reflecting completed question sets",
    ],
    techStack: ["React", "Quiz Engine", "Cookies API", "TailwindCSS"],
    demoType: "interview",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "sql-platform",
    title: "SQL Practice Platform",
    difficulty: "Medium",
    category: "Database & Backend",
    concepts: ["SQL Questions", "Query Editor", "Results Simulation"],
    summary:
      "In-browser SQL sandbox with query editor, preloaded university ERP database tables, schema inspector, and mock query execution engine.",
    description:
      "Allows developers to write and run simulated SQL queries right in the browser. Preloaded with realistic ERP schemas (Students, Courses, Grades, Departments), offering instant execution of SELECT, WHERE, JOIN, and GROUP BY operations.",
    highlights: [
      "Interactive SQL code editor with syntax highlighting and quick query templates",
      "Preloaded ERP database tables: `students`, `departments`, `faculty`",
      "Simulated relational query engine parsing and filtering table rows in real-time",
      "Schema reference tab showing table definitions and column datatypes",
    ],
    techStack: ["React", "JavaScript Query Parser", "DataGrid", "TailwindCSS"],
    demoType: "sql",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "github-analyzer",
    title: "GitHub Profile Analyzer UI",
    difficulty: "Medium",
    category: "Dev Tools & APIs",
    concepts: ["GitHub API", "Charts", "Caching"],
    summary:
      "Developer intelligence tool analyzing public GitHub profiles, repository language distributions, star velocity, and activity heatmaps.",
    description:
      "Fetches public GitHub profiles or previews cached metrics for Tejas Karambe. Visualizes repository metrics, top languages, commit distributions, and provides direct links to starred repositories.",
    highlights: [
      "Real-time or cached profile lookups for any GitHub username",
      "Visual programming language distribution bar (Java, JavaScript, HTML, CSS)",
      "Repository cards showcasing stars, forks, primary language, and update timestamps",
      "Client-side caching in localStorage/cookies to respect GitHub API rate limits",
    ],
    techStack: ["React", "GitHub REST API", "LocalStorage Cache", "TailwindCSS"],
    demoType: "github",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "prompt-manager",
    title: "AI Prompt Manager",
    difficulty: "Medium",
    category: "AI & Productivity",
    concepts: ["Prompt CRUD", "Tags", "Search", "Favorites"],
    summary:
      "Engineering prompt library with variable substitution, category tags (Code Review, SQL Gen, Spring Boot Boilerplate), and one-click copy.",
    description:
      "Organizes high-yield AI prompts for software engineering workflows. Features parameterized prompt templates (e.g., `{{table_name}}`, `{{entity}}`), search by keywords or tags, and instant clipboard copying.",
    highlights: [
      "Curated library of full-stack developer prompts (Spring Boot, React, SQL optimization)",
      "Dynamic variable replacement: fill in variables and copy the generated output instantly",
      "Add custom user prompts and tag them for quick recall",
      "Favorite prompt toggles saved directly into browser cookies",
    ],
    techStack: ["React", "Clipboard API", "Cookies API", "TailwindCSS"],
    demoType: "prompts",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "productivity-dashboard",
    title: "Personal Productivity Dashboard",
    difficulty: "Medium",
    category: "Productivity",
    concepts: ["Tasks", "Calendar", "Pomodoro", "Analytics"],
    summary:
      "All-in-one developer focus hub featuring an audio-synced Pomodoro timer, priority task checklist, daily focus score, and session analytics.",
    description:
      "Combines the Pomodoro focus technique with quick sprint task execution. Features a 25/5 minute timer with start/pause/reset controls, synthesized audio bells, daily focus score calculations, and session logging.",
    highlights: [
      "Interactive Pomodoro timer with progress ring, pause/resume, and audio completion chime",
      "Fast sprint task list with inline completion checkboxes and priority badges",
      "Daily focus score algorithm tracking productive time blocks",
      "Session history stored locally so progress remains intact across browser tabs",
    ],
    techStack: ["React", "Web Audio API", "LocalStorage", "TailwindCSS"],
    demoType: "productivity",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "crypto-dashboard",
    title: "Crypto/Stock Dashboard",
    difficulty: "Medium",
    category: "Fintech & APIs",
    concepts: ["Public APIs", "Charts", "Watchlist", "Cookies"],
    summary:
      "Real-time asset price tracking dashboard with simulated live ticker feeds, sparkline graphs, watchlist favorites, and market sentiment.",
    description:
      "Simulates live market trends for major crypto and tech stocks (BTC, ETH, SOL, NVDA, AAPL). Users can add tokens to a personalized watchlist saved in cookies, view 24h percentage swings, and inspect price trend charts.",
    highlights: [
      "Live price ticker simulation with realistic micro-fluctuations and color indicators",
      "Interactive SVG sparkline mini-charts for each asset",
      "Cookie-persisted Watchlist enabling users to pin their favorite assets",
      "Market sentiment gauge (Greed vs Fear) and 24h volume stats",
    ],
    techStack: ["React", "SVG Sparklines", "Cookies API", "TailwindCSS"],
    demoType: "crypto",
    githubUrl: "https://github.com/TejasKarambe",
  },
  {
    id: "recipe-manager",
    title: "Recipe Manager",
    difficulty: "Easy",
    category: "Lifestyle & Planning",
    concepts: ["Search", "Filters", "Favorites", "Meal Planning"],
    summary:
      "Clean culinary recipe explorer with prep time filters, dietary badges (High Protein, Vegan, Quick Prep), ingredient checklists, and favorites.",
    description:
      "A fast, distraction-free recipe and meal planner for busy software developers. Features quick filtering by dietary preference, interactive ingredient shopping checklists with cross-off states, and favorite bookmarking.",
    highlights: [
      "Instant category filtering: High Protein, Quick Prep (<20m), Healthy Bowls, Breakfast",
      "Interactive ingredient checklist: click to cross off items while cooking",
      "Step-by-step instructions with cook timer cues",
      "Bookmark favorite recipes into browser cookies for fast access",
    ],
    techStack: ["React", "Cookies API", "TailwindCSS"],
    demoType: "recipes",
    githubUrl: "https://github.com/TejasKarambe",
  },
];
