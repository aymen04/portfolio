import { createContext, useContext, useState } from 'react';

export const LangContext = createContext();

const BIO = {
  en: "I build interfaces that make sense and APIs that hold the load. Passionate about UX, AI, open-source and products that make a difference.",
  fr: "Je construis des interfaces qui ont du sens et des APIs qui tiennent la charge. Passionné par la UX, l'IA, l'open-source et les produits qui font la différence.",
};

const PROJECTS_I18N = {
  en: {
    proj1: { tagline: "All-in-one schedule, leave & request management. AI-powered.", desc: "The all-in-one solution for managing schedules, leave, and requests. Powered by AI to simplify your daily life." },
    proj2: { tagline: "Exclusive VIP transportation service in Montreal.", desc: "Exclusive VIP transportation service in Montreal. Airport transfers with premium experience." },
    proj3: { tagline: "Hybrid parser for extracting engine (ECU) mapping data.", desc: "Server-side hybrid parser (XDF and XML) for extracting engine ECU mapping data with 3D/2D visualization." },
    proj4: { tagline: "Market scanning tool to identify arbitrage opportunities.", desc: "Creation of a market scanning tool to identify arbitrage opportunities with algorithmic trading strategies." },
  },
  fr: {
    proj1: { tagline: "Solution tout-en-un pour gérer plannings, congés et demandes. Propulsé par l'IA.", desc: "La solution complète pour gérer plannings, congés et demandes. L'IA simplifie votre quotidien." },
    proj2: { tagline: "Service de transport VIP exclusif à Montréal.", desc: "Service de transport VIP exclusif à Montréal. Transferts aéroport avec une expérience premium." },
    proj3: { tagline: "Parser hybride pour extraire les données de cartographie moteur (ECU).", desc: "Parser hybride côté serveur (XDF et XML) pour extraire les données de cartographie ECU avec visualisation 3D/2D." },
    proj4: { tagline: "Outil de scan de marché pour identifier des opportunités d'arbitrage.", desc: "Création d'un outil de scan de marché pour identifier des opportunités d'arbitrage avec des stratégies de trading algorithmique." },
  },
};

const EDUCATION_I18N = {
  en: {
    0: { title: "AEC in Digital Marketing",      school: "Collège Universel, Montréal" },
    1: { title: "Bachelor's in Web Development", school: "Epitech Digital School, Lyon" },
    2: { title: "High School Diploma",            school: "Lycée Léon l'Africain, Casablanca" },
  },
  fr: {
    0: { title: "AEC en Marketing Numérique",  school: "Collège Universel, Montréal" },
    1: { title: "Bachelor Développement Web",  school: "Epitech Digital School, Lyon" },
    2: { title: "Baccalauréat",                school: "Lycée Léon l'Africain, Casablanca" },
  },
};

const EXPERIENCE_I18N = {
  en: {
    job1: { desc: [
      "Architected and optimized a high-traffic logistics management tool, improving process fluidity across Europe.",
      "Industrialized code using a Clean Code approach, reducing technical debt and simplifying team maintenance.",
      "Designed user-centric UX/UI interfaces with JavaScript, increasing the operational productivity of agents.",
      "Technical Environment: PHP, JavaScript (ES6+), SQL, Clean Architecture.",
    ]},
    job2: { desc: [
      "Developed and deployed modern showcase sites and full-stack web applications.",
      "Administered and optimized MySQL relational databases to ensure data integrity and rapid user access.",
      "Integrated responsive layouts using HTML5/CSS3 and JavaScript best practices.",
      "Technical Environment: PHP, JavaScript (ES6+), SQL, Clean Architecture.",
    ]},
    job3: { desc: [
      "Developed the back-end architecture for an internal financial platform using Laravel.",
      "Implemented a professional dashboard by integrating the Metronic 7 template, improving strategic data visualization.",
      "Strengthened application cybersecurity by preventing critical vulnerabilities such as SQL injections.",
    ]},
  },
  fr: {
    job1: { desc: [
      "Conception et optimisation d'un outil de gestion logistique à fort trafic, améliorant la fluidité des processus à travers l'Europe.",
      "Industrialisation du code via une approche Clean Code, réduisant la dette technique et simplifiant la maintenance.",
      "Conception d'interfaces UX/UI centrées utilisateur en JavaScript, augmentant la productivité opérationnelle des agents.",
      "Environnement technique : PHP, JavaScript (ES6+), SQL, Clean Architecture.",
    ]},
    job2: { desc: [
      "Développement et déploiement de sites vitrines modernes et d'applications web full-stack.",
      "Administration et optimisation de bases de données relationnelles MySQL pour garantir l'intégrité des données.",
      "Intégration de maquettes responsives avec HTML5/CSS3 et les bonnes pratiques JavaScript.",
      "Environnement technique : PHP, JavaScript (ES6+), SQL, Clean Architecture.",
    ]},
    job3: { desc: [
      "Développement de l'architecture back-end d'une plateforme financière interne avec Laravel.",
      "Implémentation d'un dashboard professionnel via le template Metronic 7, améliorant la visualisation des données stratégiques.",
      "Renforcement de la cybersécurité applicative en prévenant des vulnérabilités critiques comme les injections SQL.",
    ]},
  },
};

export const TRANSLATIONS = {
  en: {
    bio: BIO.en,
    projData: PROJECTS_I18N.en,
    eduData: EDUCATION_I18N.en,
    expData: EXPERIENCE_I18N.en,
    lockSlide: 'Click to unlock', lockChoose: 'Choose your language',
    file: 'File', edit: 'Edit', view: 'View', go: 'Go', window: 'Window',
    about: 'About', experience: 'Experience', education: 'Education', skills: 'Skills',
    aboutTitle: 'About', expTitle: 'Work Experience', eduTitle: 'Education & Certifications', skillsTitle: 'Technical Skills',
    available: 'Available', favorites: 'Favorites', info: 'Info', name: 'Name', status: 'Status',
    contactTitle: 'Get in touch', 
    sendMsg: 'Send a message', yourName: 'Your name', yourEmail: 'Your email', yourMsg: 'Your message...',
    send: 'Send →', sentTitle: 'Message sent!', sentSub: "I'll get back to you within 24h.",
    openSource: 'Projects', download: 'Download',
    termBoot: (date) => `AymenOS v1.0.0 — ${date}`,
    termStart: ["Type ", "help", " to get started."],
    termHelp: 'Available commands',
    termCmds: [
      ['whoami','Personal info & bio'],['skills','Technical skills'],['exp','Work experience'],
      ['edu','Education & certifications'],['projects','Open-source projects'],['contact','Get in touch'],
      ['neofetch','System info 🤓'],['cv','Download my resume PDF'],['clear','Clear terminal'],
    ],
    termSkills: '⚡ Technical skills', termExp: '💼 Work experience', termEdu: '🎓 Education',
    termProjects: '🗂 Projects', termContact: '📬 Contact', termCVOpen: '📄 Opening resume...',
    termNotFound: (cmd) => `command not found: ${cmd} — type 'help'`,
    vscLines: 'lines',
    skillCats: {
  "Marketing & Data": "Marketing & Data",
  "DevOps & Tools":   "DevOps & Tools",
},
  },
  fr: {
    bio: BIO.fr,
    projData: PROJECTS_I18N.fr,
    eduData: EDUCATION_I18N.fr,
    expData: EXPERIENCE_I18N.fr,
    lockSlide: 'Cliquer pour déverrouiller', lockChoose: 'Choisissez votre langue',
    file: 'Fichier', edit: 'Édition', view: 'Présentation', go: 'Aller', window: 'Fenêtre',
    about: 'À propos', experience: 'Expériences', education: 'Formation', skills: 'Compétences',
    aboutTitle: 'À propos', expTitle: 'Expériences professionnelles', eduTitle: 'Formation & certifications', skillsTitle: 'Compétences techniques',
    available: 'Disponible', favorites: 'Favoris', info: 'Infos', name: 'Nom', status: 'Dispo',
    contactTitle: 'Prenons contact', 
    sendMsg: 'Envoyer un message', yourName: 'Votre nom', yourEmail: 'Votre email', yourMsg: 'Votre message...',
    send: 'Envoyer →', sentTitle: 'Message envoyé !', sentSub: 'Je vous répondrai dans les 24h.',
    openSource: 'Projets', download: 'Télécharger',
    termBoot: (date) => `AymenOS v1.0.0 — ${date}`,
    termStart: ["Tapez ", "help", " pour commencer."],
    termHelp: 'Commandes disponibles',
    termCmds: [
      ['whoami','Infos personnelles & bio'],['skills','Compétences techniques'],['exp','Expériences professionnelles'],
      ['edu','Formation & certifications'],['projects','Projets'],['contact','Me contacter'],
      ['neofetch','System info 🤓'],['cv','Télécharger mon CV PDF'],['clear','Vider le terminal'],
    ],
    termSkills: '⚡ Compétences techniques', termExp: '💼 Expériences', termEdu: '🎓 Formation',
    termProjects: '🗂 Projets', termContact: '📬 Contact', termCVOpen: '📄 Téléchargement du CV...',
    termNotFound: (cmd) => `commande introuvable : ${cmd} — tapez 'help'`,
    vscLines: 'lignes',
    skillCats: {
  "Marketing & Data": "Marketing & Données",
  "DevOps & Tools":   "DevOps & Outils",
},
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(null);
  const t = lang ? TRANSLATIONS[lang] : TRANSLATIONS['en'];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);