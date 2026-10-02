export const profile = {
  name: "Tejas Karambe",
  title: "Full-Stack Developer & ERP Specialist",
  tagline: "Engineering resilient web applications: React & TypeScript on the frontend, Java & Spring Boot on the backend.",
  bio: "Full-Stack Developer with production experience building enterprise-grade ERP modules for university institutions at SDC, Dr. D. Y. Patil Unitech Society. I specialize in designing scalable frontend architectures, high-performance REST APIs, and bulletproof transactional workflows.",
  location: "Pimpri, Pune, India",
  email: "tejaskarambe.tk@gmail.com",
  phone: "+91 91722 00000",
  github: "https://github.com/TejasKarambe",
  linkedin: "https://www.linkedin.com/in/tejas-karambe-304027391",
  status: "Open to Full-Stack Opportunities",
  availability: "Immediate / 15 Days",
  stats: [
    { label: "Production Modules", value: "4+", note: "Exam, Library, Student/Staff, Recruitment" },
    { label: "Active Users Served", value: "10,000+", note: "University students, faculty & admin" },
    { label: "Projects Engineered", value: "15+", note: "Full-stack, client-side & mini-apps" },
    { label: "Code Autonomy", value: "70-80%", note: "UI delivered end-to-end independently" },
  ],
};

export const skillsData = [
  {
    category: "Frontend Architecture",
    icon: "Layout",
    skills: [
      { name: "React.js", level: 95, tags: ["Hooks", "Context", "Virtual DOM", "SPA"] },
      { name: "JavaScript (ES6+)", level: 92, tags: ["Async/Await", "Closures", "Event Loop"] },
      { name: "Next.js", level: 85, tags: ["SSR", "Static Generation", "API Routes"] },
      { name: "TailwindCSS & CSS3", level: 94, tags: ["Glassmorphism", "Responsive", "Tokens"] },
      { name: "Redux Toolkit", level: 88, tags: ["Slices", "Thunks", "State Normalization"] },
      { name: "TanStack Query", level: 86, tags: ["Caching", "Optimistic Updates", "Pagination"] },
      { name: "Material UI (MUI)", level: 90, tags: ["Theming", "DataGrid", "Accessibility"] },
      { name: "React Hook Form", level: 90, tags: ["Validation", "Schema", "Performance"] },
    ],
  },
  {
    category: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Java 21", level: 90, tags: ["OOP", "Collections", "Streams API", "Multithreading"] },
      { name: "Spring Boot", level: 92, tags: ["REST APIs", "Dependency Injection", "Security"] },
      { name: "Spring Data JPA", level: 88, tags: ["Transactions", "Criteria Queries", "Repositories"] },
      { name: "Hibernate ORM", level: 85, tags: ["Entity Relations", "Lazy Loading", "Caching"] },
      { name: "REST API Design", level: 94, tags: ["Contracts", "Status Codes", "Error Handling"] },
      { name: "Node.js & Express", level: 78, tags: ["Microservices", "JWT", "Middlewares"] },
    ],
  },
  {
    category: "Data & Persistence",
    icon: "Database",
    skills: [
      { name: "MySQL", level: 90, tags: ["Indexing", "Foreign Keys", "Complex Joins", "Views"] },
      { name: "SQL Server", level: 84, tags: ["Stored Procedures", "Triggers", "T-SQL"] },
      { name: "MongoDB", level: 80, tags: ["Aggregations", "BSON", "Document Models"] },
      { name: "In-Device Memory", level: 95, tags: ["Cookies", "LocalStorage", "IndexedDB"] },
    ],
  },
  {
    category: "DevOps & Engineering Practice",
    icon: "Cpu",
    skills: [
      { name: "Git & GitHub", level: 92, tags: ["Branching", "Pull Requests", "Actions", "Pages"] },
      { name: "Azure DevOps", level: 85, tags: ["Sprint Planning", "Pipelines", "Work Items"] },
      { name: "Postman & Swagger", level: 92, tags: ["API Testing", "OpenAPI Spec", "Mocking"] },
      { name: "Agile / Scrum", level: 90, tags: ["Daily Standups", "Story Estimation", "Sprint Reviews"] },
    ],
  },
];

export const experienceData = [
  {
    role: "Software Developer",
    org: "Software Development Cell (SDC), Dr. D. Y. Patil Unitech Society",
    period: "Jun 2025 — Present",
    type: "Full-Time",
    location: "Pune, India",
    achievements: [
      "Own frontend delivery for four mission-critical ERP modules: Examination, Library, Student/Staff Management, and Recruitment, used daily by 10,000+ university stakeholders.",
      "Spearhead 70–80% of UI features end-to-end, translating complex university governance requirements into intuitive, role-based web dashboards.",
      "Architect reusable React component libraries and design clean RESTful API contracts upfront with the backend team, reducing integration rework by over 40%.",
      "Implement client-side data caching with TanStack Query and state normalization, boosting rendering efficiency and cutting network latency.",
    ],
    stack: ["React.js", "MUI", "TanStack Query", "REST APIs", "Java", "Spring Boot", "MySQL", "Azure DevOps"],
  },
  {
    role: "Full Stack Developer Intern",
    org: "Software Development Cell (SDC), Dr. D. Y. Patil Unitech Society",
    period: "Jan 2025 — May 2025",
    type: "Internship",
    location: "Pune, India",
    achievements: [
      "Engineered responsive UI modules for faculty workload allocation and attendance tracking.",
      "Integrated strict form validation with React Hook Form and real-time error toasts.",
      "Participated in agile sprint cycles, code reviews, and API documentation using Swagger/OpenAPI.",
    ],
    stack: ["React", "JavaScript ES6+", "Spring Boot", "MySQL", "Postman", "Git"],
  },
];

export const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Savitribai Phule Pune University (SPPU)",
    period: "2023 — 2025",
    score: "CGPA: 7.65 / 10",
    highlights: ["Advanced Database Systems", "Enterprise Application Architecture", "Distributed Systems", "Software Engineering"],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Gondwana University",
    period: "2020 — 2023",
    score: "CGPA: 9.14 / 10 (First Class with Distinction)",
    highlights: ["Data Structures & Algorithms", "Core Java Programming", "Web Technologies", "Database Management Systems"],
  },
];
