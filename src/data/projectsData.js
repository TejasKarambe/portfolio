export const projectsList = [
  {
    id: "typing-master",
    title: "Typing Master",
    category: "Typing & Productivity",
    concepts: ["Typing Tests", "Progressive Lessons", "Analytics", "PWA", "IndexedDB"],
    summary:
      "Offline-first typing training platform with structured lessons, interactive games, detailed analytics, achievements, and customizable themes.",
    description:
      "A modern typing practice platform inspired by Monkeytype. It combines customizable typing tests, a structured 10-level curriculum with over 70 lessons, interactive games, local performance history, and a broad theme collection in an offline-first PWA.",
    highlights: [
      "Custom tests for time, word count, quotes, custom text, numbers, and punctuation",
      "10 progressive curriculum levels with more than 70 structured lessons",
      "Falling Words game with level scaling, combos, lives, and high scores",
      "Typing history, WPM trends, accuracy, consistency, and mistake keymaps",
      "XP, levels, achievements, 10+ themes, and offline support",
    ],
    techStack: ["Vite", "Dexie.js", "IndexedDB", "Service Workers", "PWA"],
    githubUrl: "https://github.com/TejasKarambe/TypingMaster",
    demoUrl: "https://tejaskarambe.github.io/TypingMaster/",
  },
  {
    id: "career-pulse",
    title: "CareerPulse",
    category: "Career & Productivity",
    concepts: ["Job Tracking", "Kanban", "Analytics", "IndexedDB", "Data Portability"],
    summary:
      "Offline-first job application tracker with a customizable Kanban pipeline, analytics, interview calendar, company directory, and JSON backups.",
    description:
      "A job search management app for tracking applications from submission through interview outcomes. It brings a drag-and-drop application pipeline together with analytics, interview scheduling and notes, company insights, and locally stored data.",
    highlights: [
      "Drag-and-drop pipeline with Applied, Screening, Interview, Offer, and Rejected stages",
      "Analytics dashboard with funnel, application trends, and salary benchmarks",
      "Interview calendar, interview notes, and question bank",
      "Company directory with aggregated application insights",
      "IndexedDB storage, cookie-based preferences, and validated JSON import/export",
      "Confetti celebration when an application moves to Offer",
    ],
    techStack: ["React", "Tailwind CSS", "GSAP", "Vite", "IndexedDB", "Browser Cookies"],
    githubUrl: "https://github.com/TejasKarambe/CareerPulse",
    demoUrl: "https://tejaskarambe.github.io/CareerPulse/",
  },
  {
    id: "apex-finance",
    title: "ApexFinance",
    category: "Full-Stack & Fintech",
    concepts: [
      "Full-Stack Architecture",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "JWT Auth",
      "Cash Flow Analytics",
      "Budget Engine",
    ],
    summary:
      "Enterprise full-stack personal finance and wealth management platform with multi-account tracking, zero-sum transfers, category budgeting with 80% proactive alerts, and cash flow analytics.",
    description:
      "A production-grade, full-stack personal wealth and budget management engine combining a modern React frontend with a robust Spring Boot microservice backend. It features multi-account tracking (checking, savings, cash, investments) with real-time balance calculations, zero-sum inter-account transfers, category budgeting with proactive threshold alerts (80% warning and 100% exceeded), monthly income vs. expense analytics, and instant CSV ledger export. Secured with Spring Security, stateless JWT authentication, and BCrypt encryption backed by PostgreSQL (Neon).",
    highlights: [
      "Multi-account balance engine tracking checking, cash, savings, and investments with real-time recalculations",
      "Zero-sum inter-account transfers preserving true income and expense cash flow integrity",
      "Proactive category budgeting with automated visual warnings at 80% and 100% spending thresholds",
      "Financial analytics dashboard with monthly income-vs-expense metrics and category breakdown leaderboards",
      "Instant CSV export of transaction history for personal spreadsheets and tax filing",
      "End-to-end security with Spring Security, stateless JWT authentication, and BCrypt password hashing",
    ],
    techStack: [
      "React",
      "Spring Boot",
      "Java 21",
      "PostgreSQL (Neon)",
      "Spring Security",
      "JWT",
      "Tailwind CSS",
      "REST API",
      "Vite",
    ],
    githubUrl: "https://github.com/TejasKarambe/finance-client",
    githubFrontendUrl: "https://github.com/TejasKarambe/finance-client",
    githubBackendUrl: "https://github.com/TejasKarambe/finance",
    demoUrl: "https://apex-finance-lilac.vercel.app/",
  },
];
