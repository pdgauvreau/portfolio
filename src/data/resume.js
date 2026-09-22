// Single source of truth for the site. Dates are 'YYYY-MM'; `end: null` means ongoing.

export const TODAY = '2026-09';

export const profile = {
  name: 'Paul Gauvreau',
  role: 'Software developer',
  location: 'Salt Lake City, Utah',
  email: 'pdgauvreau@gmail.com',
  linkedin: 'https://www.linkedin.com/in/paul-gauvreau/',
  github: 'https://github.com/pdgauvreau',
  resume: 'Paul_Gauvreau_Resume.pdf',
  intro:
    "I'm finishing a B.S. in Software Development at the University of Utah this December. Right now I'm at Milliman, writing C# and .NET for financial risk systems. I'm looking for a new grad software developer role.",
};

export const experience = [
  {
    id: 'milliman',
    track: 'experience',
    org: 'Milliman, Inc.',
    role: 'Software Developer Intern, Financial Risk Management',
    start: '2026-05',
    end: '2026-08',
    impact: 'Shipped production C#/.NET components inside a live risk-modeling platform used for real trading operations.',
    points: [
      'Design, implement, and test production components in C# and .NET alongside senior engineers.',
      'Apply .NET remoting over TCP for communication between risk-modeling services.',
      'Work within a cross-functional team on systems supporting risk modeling and trading operations.',
    ],
    stack: ['C#', '.NET', 'TCP', 'Fintech'],
  },
];

export const projects = [
  {
    id: 'highlandllc',
    track: 'project',
    org: 'Highland LLC',
    role: 'Founder',
    url: 'https://highland-llc.vercel.app/',
    impact: 'An investing club for my family, built as an immersive AI-generated experience rather than a plain dashboard.',
    points: [
      'An LLC that lets my family collectively invest in stocks through a shared platform.',
      'Built the web app with the Claude API and React.',
      'Used Higgsfield to generate the video and imagery on the site, making the experience feel immersive rather than like a typical finance dashboard.',
    ],
    stack: ['Claude API', 'React', 'Higgsfield AI'],
  },
  {
    id: 'tateai',
    track: 'project',
    org: 'TateAI',
    role: 'AI study assistant',
    url: 'https://tate-ai-lovat.vercel.app/',
    start: '2025-12',
    end: '2025-12',
    impact: 'A voice-first AI tutor that answers from a student’s own course material instead of the open web.',
    points: [
      'Study assistant with real-time speech transcription for low-latency voice conversation with an AI tutor.',
      'Combined speech-to-text with context-aware prompting scoped to a student’s own course material.',
    ],
    stack: ['Python', 'React', 'Speech APIs'],
  },
  {
    id: 'degreemap',
    track: 'project',
    org: 'DegreeMap',
    role: 'Capstone Project — Front-End Developer',
    start: '2026-08',
    end: null,
    impact: 'A degree planner students actually want to use: drag courses into semesters and prerequisites police themselves.',
    points: [
      'Built the React front end for a degree-planning app: login, dashboard, and a drag-and-drop plan editor for placing courses into semesters.',
      'Implemented prerequisite locking against the parsed course catalog, plus page-transition and micro-interaction animation work throughout.',
      'Paired with a 4-person team building the FastAPI and Supabase backend that serves the course catalog, auth, and progress tracking.',
    ],
    stack: ['React', 'FastAPI', 'Supabase', 'Framer Motion'],
  },
];

export const education = {
  school: 'University of Utah',
  degree: 'B.S. Software Development',
  when: 'Expected December 2026',
  coursework: [
    'Algorithms & Data Structures',
    'Object-Oriented Programming',
    'Web Development',
    'Database Systems',
    'Human-Centered Design',
  ],
};

export const skills = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C#', 'SQL', 'HTML/CSS'] },
  { label: 'Frameworks', items: ['React', '.NET', 'Node.js'] },
  { label: 'Tools', items: ['Git', 'Firebase', 'Figma', 'Salesforce', 'Adobe Suite'] },
];

export const about = [
  'I work across the stack, but I’m most useful where engineering meets design — deciding how something should behave, then building it. At Milliman that means production C# inside a large existing codebase.',
  'On DegreeMap it means owning the front end of a team capstone end to end: login through a drag-and-drop plan editor. On TateAI it means pairing speech recognition with prompting that actually knows the material.',
  'I’m looking for a new grad software developer role where I can write code people actually use.',
];
