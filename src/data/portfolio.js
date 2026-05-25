export const ME = {
  name: "Aymen",
  lastName: "Adline ",
  title: "Full Stack Developer",
  titleAlt: "UI Engineer · Open to Work",
  location: "Montréal, Canada",
  bio: "Je construis des interfaces qui ont du sens et des APIs qui tiennent la charge. Passionné par la UX, l'IA et l'open-source et les produits qui font la différence.",
  avatar: "A.A",
  email: "aymenadline5@gmail.com",
  github: "https://github.com/aymen04/",
  linkedin: "https://linkedin.com/in/aymen-adline",
  website: "https://aymen.dev",
  status: "open", // open | busy | closed
};

export const SKILLS = [
  { cat: "Frontend", color: "#3b82f6", items: [
    { name: "React / Next.js", level: 92 },
    { name: "TypeScript", level: 88 },
    { name: "CSS / Tailwind", level: 90 },
    { name: "Framer Motion", level: 78 },
  ]},
  { cat: "Backend", color: "#10b981", items: [
    { name: "Node.js / Express", level: 84 },
    { name: "Python / FastAPI", level: 80 },
    { name: "PostgreSQL", level: 80 },
    { name: "MYSQL", level: 88 },
  ]},
  { cat: "DevOps", color: "#f59e0b", items: [
    { name: "Docker / K8s", level: 72 },
    { name: "CI/CD (GitHub Actions)", level: 85 },
    { name: "AWS / Vercel", level: 74 },
    { name: "Nginx / Linux", level: 70 },
  ]},
  { cat: "Tooling", color: "#8b5cf6", items: [
    { name: "Git / Monorepos", level: 90 },
    { name: "IA", level: 90 },
    { name: "Testing (Vitest/Jest)", level: 78 },
    { name: "GraphQL", level: 66 },
  ]},
];

export const EXPERIENCE = [
  {
    id: "job1",
    company: "STEF Europe",
    role: "Full Stack Developer",
    date: "Jan 2024 – Jun 2024",
    current: false,
    location: "Lyon , France (Hybrid)",
desc: [
  "Architected and optimized a high-traffic logistics management tool, improving process fluidity across Europe.",
  "Industrialized code using a Clean Code approach, reducing technical debt and simplifying team maintenance.",
  "Designed user-centric UX/UI interfaces with JavaScript, increasing the operational productivity of agents.",
  "Technical Environment: PHP, JavaScript (ES6+), SQL, Clean Architecture. "

],    
    tags: ["HTML/CSS", "JavaScript (ES6+)", "Recode/Clean Code", "MySQL", "PHP"],
  },

  {
    id: "job2",
    company: "ITES COM GROUP",
    role: "Web Developer & Integrator",
    date: "May 2023 – Sep 2023",
    current: false,
    location: "Casablanca , Morocco (On-site)",
desc: [
  "Developed and deployed modern showcase sites and full-stack web applications. ",
  "Administered and optimized MySQL relational databases to ensure data integrity and rapid user access. ",
  "Integrated responsive layouts using HTML5/CSS3 and JavaScript best practices. ",
  "Technical Environment: PHP, JavaScript (ES6+), SQL, Clean Architecture. "

],    
    tags: ["Next.js", "MySQL", "React Native"],
  },
  {
    id: "job3",
    company: "RED MED CAPITAL",
    role: "Back-End Developer (Laravel)",
    date: "May 2022–  Sept 2022",
    current: false,
    location: "On-site",
desc: [
  "Developed the back-end architecture for an internal financial platform using Laravel. ",
  "Implemented a professional dashboard by integrating the Metronic 7 template, improving strategic data visualization. ",
  "Strengthened application cybersecurity by preventing critical vulnerabilities such as SQL injections. "

],    
    tags: ["React", "WordPress", "Three.js", "CSS"],
  },
];

export const EDUCATION = [
  { icon: "🎓", title: "AEC in Digital Marketing", school: "Collège Universel, Montréal", year: "2024-2026" },
  { icon: "📚", title: "Bachelor’s in Web Development", school: "Epitech Digital School, Lyon", year: "2021-2024" },
  { icon: "🏆", title: " High School Diploma", school: "Lycée Léon l’Africain, Casablanca", year: "2020" },
 
];

export const PROJECTS = [
  {
    id: "proj1",
    name: "TEMPO - SaaS",
    tagline: "The all-in-one solution for managing schedules, leave, and requests. Powered by AI to simplify your daily life.",
    stack: ["React", "TypeScript", "CSS", "IA/API"],
    desc: "Outil de gestion de sprints pour équipes dev. Kanban drag-and-drop, burndown charts temps réel, intégrations GitHub/Linear.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 847,
    status: "production",
    url: "https://github.com/aymen/devflow",
    featured: true,
    lines: "12.4k",
  },
  {
    id: "proj2",
    name: "Glalux",
    tagline: "Exclusive VIP transportation service in Montreal. Airport transfers.",
    stack: ["React", "3D Models","GoogleAds"],
    desc: "API de génération de contenu multi-modèles. Gestion de prompts, streaming SSE, historique, export PDF/MD.",
    lang: "Python",
    langColor: "#3776ab",
    status: "production",
    url: "https://github.com/aymen/aiwriter",
    featured: true,
    lines: "5.2k",
  },
  {
    id: "proj3",
    name: "ECU-Parser",
    tagline: "Development of a server-side hybrid parser (processing XDF and XML files) for extracting engine (ECU) mapping data.",
    stack: ["React", "Python", "XDF/XML", "3D/2D Data Visualization"],
    desc: "Development of a server-side hybrid parser (processing XDF and XML files) for extracting engine (ECU) mapping data.",
    lang: "TypeScript",
    langColor: "#3178c6",
    status: "production",
    url: "https://github.com/aymen/shopkit",
    featured: true,
    lines: "8.9k",
  },
  {
    id: "proj4",
    name: "PolyBot",
    tagline: "Creation of a market scanning tool to identify arbitrage opportunities.",
    stack: ["React", "Automation", "Algorithmic Trading", "Python"],
    desc: "Interface macOS interactive pour portfolio. Fenêtres draggables, terminal, dock animé — tout from scratch sans lib externe.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 134,
    status: "wip",
    url: "https://github.com/aymen/portfolioos",
    featured: true,
    lines: "3.1k",
  },
];

export const TERMINAL_COMMANDS = {
  help: {
    desc: "Show available commands",
    run: () => ({
      type: "list",
      items: [
        { cmd: "whoami", desc: "Personal info & bio" },
        { cmd: "skills", desc: "Technical skills breakdown" },
        { cmd: "exp", desc: "Work experience" },
        { cmd: "edu", desc: "Education & certifications" },
        { cmd: "projects", desc: "Open-source projects" },
        { cmd: "contact", desc: "Get in touch" },
        { cmd: "clear", desc: "Clear terminal" },
        { cmd: "cat resume.pdf", desc: "Download CV" },
        { cmd: "open --app finder", desc: "Open Finder window" },
        { cmd: "neofetch", desc: "System info (easter egg)" },
      ],
    }),
  },
};
