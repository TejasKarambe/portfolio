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
    id: "finance-api",
    title: "Finance API Service",
    category: "Backend & Fintech",
    concepts: ["REST API", "Spring Boot", "JPA", "Transactions", "MySQL"],
    summary:
      "Personal finance management REST API for users, accounts, and transactions, built with Spring Boot and Java 21.",
    description:
      "A backend microservice for personal finance management. It manages users, accounts, and transactions with Spring Data JPA persistence and transactional account balance calculations backed by MySQL.",
    highlights: [
      "RESTful API for managing users, accounts, and transactions",
      "Transactional balance calculations for account activity",
      "Persistence implemented with Spring Data JPA and MySQL",
      "Built with Spring Boot and Java 21",
    ],
    techStack: ["Java 21", "Spring Boot", "Spring Data JPA", "MySQL"],
    githubUrl: "https://github.com/TejasKarambe/finance",
  },
];
