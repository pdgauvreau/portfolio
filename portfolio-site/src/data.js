import heroRing from './assets/hero-ring.jpg';
import chicago from './assets/chicago.jpg';
import sandiego from './assets/sandiego.jpg';
import gaming from './assets/gaming.jpg';
import utah from './assets/utah.jpg';
import volleyball from './assets/volleyball.jpg';
import golf from './assets/golf.jpg';
import ai from './assets/ai.jpg';
import hangar from './assets/hangar.jpg';
import snapshotRing from './assets/snapshot-ring.jpg';
import armorRecon from './assets/armor-recon.jpg';
import armorVanguard from './assets/armor-vanguard.jpg';
import armorForge from './assets/armor-forge.jpg';

export const images = { heroRing, chicago, sandiego, gaming, utah, volleyball, golf, ai, hangar, snapshotRing };

// Armor-select screen: each armor class carries a skill group from the resume.
export const armorClasses = [
  {
    id: 'recon',
    name: 'RECON CLASS',
    group: 'LANGUAGES',
    color: '#8fd7f2',
    image: armorRecon,
    flavor: 'Fast, versatile, deployed everywhere. The core kit.',
    items: ['Python', 'JavaScript', 'Java', 'C#', 'SQL', 'HTML/CSS'],
  },
  {
    id: 'vanguard',
    name: 'VANGUARD CLASS',
    group: 'FRAMEWORKS & CONCEPTS',
    color: '#e8b96a',
    image: armorVanguard,
    flavor: 'Heavy plating for production workloads.',
    items: ['React', '.NET', '.NET Remoting', 'Node.js', 'Multithreading & Concurrency', 'TCP/IP Networking'],
  },
  {
    id: 'forge',
    name: 'FORGE CLASS',
    group: 'TOOLS',
    color: '#9fd68c',
    image: armorForge,
    flavor: 'Engineer kit — builds, ships, and automates.',
    items: ['Git', 'Firebase', 'Salesforce', 'Agentic Coding'],
  },
];

export const profile = {
  name: 'Paul Gauvreau',
  callsign: 'PDG-117',
  title: 'Software Developer',
  phone: '(858) 964-8541',
  email: 'pdgauvreau@gmail.com',
  site: 'pdgauvreau.github.io/portfolio',
  linkedin: 'https://linkedin.com/in/paul-gauvreau',
  github: 'https://github.com/pdgauvreau',
};

// Storyline chapters — purely aesthetic ambience per menu section.
export const chapters = {
  home: {
    image: heroRing,
    video: new URL('./assets/hero-loop.mp4', import.meta.url).href,
    tag: 'INSERTION POINT',
    lore: 'Every campaign starts somewhere. This one starts here.',
  },
  campaign: {
    image: sandiego,
    tag: 'CAMPAIGN',
    lore: 'From Lake Michigan to the Pacific — the origin story.',
  },
  experience: {
    image: chicago,
    tag: 'SERVICE RECORD · CHICAGO SECTOR',
    lore: 'Back in the birth city, deployed to the trading floor.',
  },
  projects: {
    image: ai,
    tag: 'ARSENAL · R&D BAY',
    lore: 'Off-hours spent tinkering with AI — Claude Code and Higgsfield on the workbench.',
  },
  skills: {
    image: hangar,
    tag: 'ARMOR HALL · LOADOUT BAY',
    lore: 'Select your loadout. It all started with a controller and a CRT glow.',
  },
  education: {
    image: utah,
    tag: 'TRAINING · WASATCH RANGE',
    lore: 'Training grounds: Salt Lake City, elevation 4,226 ft.',
  },
  contact: {
    image: golf,
    tag: 'COMMS RELAY · CHANNEL OPEN',
    lore: 'Transmission open. Fairways and open channels.',
  },
};

export const storyline = [
  {
    image: chicago,
    title: 'CH.01 — WINDY CITY ORIGIN',
    text: 'Born in Chicago. Moved west soon after, but the loyalty never left — diehard Bears and Cubs fan for life.',
  },
  {
    image: sandiego,
    title: 'CH.02 — PACIFIC RELOCATION',
    text: 'Raised in San Diego, where the sun sets over the ocean and the shorts are worn year-round.',
  },
  {
    image: gaming,
    title: 'CH.03 — PLAYER ONE',
    text: 'A childhood of video games sparked a fascination with technology that never powered down.',
  },
  {
    image: utah,
    title: 'CH.04 — TRAINING GROUNDS',
    text: 'Enlisted at the University of Utah — B.S. Software Development, with the Wasatch range as a backdrop.',
  },
  {
    image: volleyball,
    title: 'CH.05 — SIDE QUESTS',
    text: 'Beach volleyball, tennis, pickleball, ping pong — if it involves a net or a paddle, count me in.',
  },
  {
    image: golf,
    title: 'CH.06 — THE LONG GAME',
    text: 'Golf: the slowest boss fight there is. Still grinding the skill tree.',
  },
  {
    image: ai,
    title: 'CH.07 — CURRENT OBJECTIVE',
    text: 'Infatuated with AI and what it can do. Free time goes to tinkering with Claude Code and Higgsfield AI.',
  },
];

export const education = {
  school: 'University of Utah',
  degree: 'B.S. Software Development',
  location: 'Salt Lake City, UT',
  grad: 'Expected December 2026',
  gpa: '3.4',
  coursework: [
    'Algorithms & Data Structures',
    'Discrete Structures',
    'Computer Security',
    'Database Systems',
    'Object-Oriented Programming',
  ],
};

export const experience = [
  {
    company: 'Milliman, Inc.',
    role: 'Software Developer Intern — Financial Risk Management',
    location: 'Chicago, IL',
    dates: 'May 2026 – Aug 2026',
    difficulty: 'LEGENDARY',
    bullets: [
      'Engineered a DataCacheT local caching layer for the Milliman Home trading dashboard used daily by the FRM team, reducing page reload time from ~15s to ~3.4s (~78% faster) and speeding up filter loads, refreshes, and updates.',
      'Built an AI-driven automation layer for FIX communications that analyzed incoming FIX protocol messages and automatically generated responses, cutting manual message handling in the trading workflow.',
      'Developed a threaded FileSystemWatcher service allowing new files and file-handling rules to be added on the fly without restarting the service, eliminating downtime during trading hours.',
    ],
  },
  {
    company: 'Catholic Answers',
    role: 'Information Technology Intern',
    location: 'El Cajon, CA',
    dates: 'May 2025 – Jul 2025',
    difficulty: 'HEROIC',
    bullets: [
      'Evaluated 5+ database analytics platforms (Snowflake, Tableau, CesarAI) and delivered a recommendation aligned with organizational goals and budget constraints.',
      'Designed and deployed Salesforce dashboards with Directors of Marketing and Development, enabling real-time tracking of donor activity and sales performance metrics.',
    ],
  },
  {
    company: 'HelloI',
    role: 'Student Developer',
    location: 'Salt Lake City, UT',
    dates: 'Jan 2025 – Jul 2025',
    difficulty: 'HEROIC',
    bullets: [
      'Built a Python desktop application capturing dual-channel audio for transcription workflows, delivering a complete end-to-end solution from requirements through deployment.',
      'Evaluated 3+ transcription APIs (OpenAI Whisper, AssemblyAI) across accuracy, latency, and cost, then implemented the chosen API integration with a user-friendly GUI.',
    ],
  },
];

export const projects = [
  {
    name: 'TateAI — AI-Powered Study Assistant',
    stack: ['Python', 'React', 'APIs'],
    date: 'Dec 2025',
    bullets: [
      'Built an AI-driven study assistant with real-time speech transcription enabling low-latency voice conversations with an AI tutor focused on class-specific content.',
      'Integrated speech-to-text and conversational AI APIs with context-aware prompting to guide students through explanations and concept reinforcement.',
    ],
  },
  {
    name: 'Personal Portfolio Website',
    stack: ['JavaScript', 'HTML', 'CSS'],
    date: 'Fall 2025',
    bullets: [
      'Designed a responsive single-page portfolio with glassmorphism effects, particle animations, and a custom vertical navigation sidebar.',
      'Engineered a mobile-responsive menu and scroll-based active-state tracking.',
    ],
  },
];

