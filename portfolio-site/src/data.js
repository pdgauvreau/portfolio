import chicago from './assets/chicago.jpg';
import sandiego from './assets/sandiego.jpg';
import gaming from './assets/gaming.jpg';
import utah from './assets/utah.jpg';
import volleyball from './assets/volleyball.jpg';
import golf from './assets/golf.jpg';
import ai from './assets/ai.jpg';
import plateChicago from './assets/plate-chicago.webp';
import plateSystems from './assets/plate-systems.webp';
import plateWasatch from './assets/plate-wasatch.webp';
import platePacific from './assets/plate-pacific.webp';

export const profile = {
  name: 'Paul Gauvreau',
  title: 'Software Developer',
  location: 'Salt Lake City, UT',
  intro:
    'I build systems that hold up under load — caching layers for trading dashboards, threaded services that stay up during market hours, and AI automation that removes manual steps. Finishing a B.S. in Software Development at the University of Utah.',
  phone: '(858) 964-8541',
  email: 'pdgauvreau@gmail.com',
  linkedin: 'https://linkedin.com/in/paul-gauvreau',
  github: 'https://github.com/pdgauvreau',
};

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const highlights = [
  { value: 78, suffix: '%', label: 'faster dashboard reloads shipped at Milliman' },
  { value: 3, label: 'internships across fintech, IT, and product' },
  { value: 6, suffix: '+', label: 'languages in regular use' },
];

export const experience = [
  {
    company: 'Milliman, Inc.',
    role: 'Software Developer Intern — Financial Risk Management',
    location: 'Chicago, IL',
    dates: 'May 2026 – Aug 2026',
    stack: ['C#', '.NET', 'Multithreading', 'FIX Protocol'],
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
    stack: ['Salesforce', 'Snowflake', 'Tableau'],
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
    stack: ['Python', 'Whisper', 'AssemblyAI'],
    bullets: [
      'Built a Python desktop application capturing dual-channel audio for transcription workflows, delivering a complete end-to-end solution from requirements through deployment.',
      'Evaluated 3+ transcription APIs (OpenAI Whisper, AssemblyAI) across accuracy, latency, and cost, then implemented the chosen API integration with a user-friendly GUI.',
    ],
  },
];

export const projects = [
  {
    name: 'TateAI',
    tagline: 'AI-powered study assistant',
    stack: ['Python', 'React', 'Speech APIs'],
    date: 'Dec 2025',
    bullets: [
      'Real-time speech transcription enabling low-latency voice conversations with an AI tutor focused on class-specific content.',
      'Speech-to-text and conversational AI APIs wired together with context-aware prompting to guide students through explanations and concept reinforcement.',
    ],
  },
  {
    name: 'Personal Portfolio',
    tagline: 'Responsive single-page site',
    stack: ['JavaScript', 'HTML', 'CSS'],
    date: 'Fall 2025',
    bullets: [
      'Responsive single-page portfolio with glassmorphism effects, particle animations, and a custom vertical navigation sidebar.',
      'Mobile-responsive menu with scroll-based active-state tracking.',
    ],
  },
];

export const skills = [
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'Java', 'C#', 'SQL', 'HTML/CSS'],
  },
  {
    group: 'Frameworks & Concepts',
    items: ['React', '.NET', '.NET Remoting', 'Node.js', 'Multithreading & Concurrency', 'TCP/IP Networking'],
  },
  {
    group: 'Tools',
    items: ['Git', 'Firebase', 'Salesforce', 'Agentic Coding'],
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

export const about = {
  paragraphs: [
    'Born in Chicago, raised in San Diego. The move west stuck; the Bears and Cubs loyalty did not budge.',
    'A childhood spent in video games turned into a fascination with how software actually works — which is more or less how I ended up at the University of Utah studying software development, with the Wasatch range out the window.',
    'Outside of work: beach volleyball, tennis, pickleball, ping pong. Anything with a net or a paddle. And golf, which remains the slowest and least forgiving skill tree I have ever tried to grind.',
    'Lately most of my free time goes to AI tooling — building with Claude Code and Higgsfield, and finding out where the edges are.',
  ],
  gallery: [
    { src: chicago, caption: 'Chicago' },
    { src: sandiego, caption: 'San Diego' },
    { src: utah, caption: 'Salt Lake City' },
    { src: golf, caption: 'The long game' },
    { src: volleyball, caption: 'Beach volleyball' },
    { src: gaming, caption: 'Where it started' },
  ],
  portrait: ai,
};

// Full-bleed interludes between sections. Ordered as a journey that leaves
// Chicago and returns to it — the arc the resume itself doesn't show.
export const chapters = [
  {
    id: 'ch-chicago',
    index: 'I',
    title: 'Back where it started',
    line: 'Born in Chicago, returned to it on a trading floor twenty-two years later.',
    place: 'Chicago, Illinois',
    image: plateChicago,
  },
  {
    id: 'ch-systems',
    index: 'II',
    title: 'Things that stay up',
    line: 'Caches, threads, and message queues — the parts nobody sees until they fail.',
    place: 'Off hours',
    image: plateSystems,
  },
  {
    id: 'ch-wasatch',
    index: 'III',
    title: 'Training grounds',
    line: 'Four years under the Wasatch, learning how software actually works.',
    place: 'Salt Lake City, Utah',
    image: plateWasatch,
  },
  {
    id: 'ch-pacific',
    index: 'IV',
    title: 'The long way west',
    line: 'Raised on the Pacific. The move stuck; the Chicago loyalty never did budge.',
    place: 'San Diego, California',
    image: platePacific,
  },
];
