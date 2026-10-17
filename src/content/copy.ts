/**
 * Every word on the site lives here. Components never hard-code marketing text.
 * Headlines mark their second voice with asterisks: 'The end of manual limits. *The beginning…*'
 * (rendered in Instrument Serif italic by components/ui/Emph).
 * When a fact is unconfirmed, it carries a TODO(client) note instead of a guess.
 */

export const site = {
  name: 'Fin Projukti',
  url: 'https://finprojukti.tech',
  email: 'finprojukti.tech@gmail.com',
  // TODO(client): two different numbers (call vs WhatsApp); confirm both.
  phone: { display: '+880 1701-004480', href: 'tel:+8801701004480' },
  whatsapp: { display: '+880 1743-666004', number: '8801743666004' },
  location: 'Dhaka, Bangladesh · Remote-first',
  socials: [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/finprojukti?igsh=MXV4MXlmYTRnaHVjNw==',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1Fxj2fg7TS/?mibextid=wwXIfr',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/fin-projukti-4785163a2/',
    },
    { id: 'github', label: 'GitHub', href: 'https://github.com/rifff-fin' },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]['id'];

export const nav = {
  skipLink: 'Skip to content',
  home: 'Fin Projukti, back to top',
  links: [
    { label: 'Process', href: '#process' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
  ],
  cta: 'Start a project',
  open: 'Open menu',
  close: 'Close menu',
};

export const hero = {
  eyebrow: 'Web · Apps · Automation · AI',
  title: 'The end of manual limits.\n*The beginning of AI growth.*',
  lede: 'A BRAC University student-led studio engineering the future of digital commerce through high-end automation and scalable web architecture.',
  primary: 'Automate my business',
  secondary: 'See our work',
  // TODO(client): confirm the founding year.
  meta: ['Dhaka, Bangladesh', 'Remote-first', 'Est. 2024'],
  scroll: 'Scroll',
};

export const marquee = {
  label: 'Our technical DNA',
  items: [
    'MERN Stack',
    'Python',
    'AI Stacks',
    'n8n',
    'Java',
    'C#',
    'C++',
    'React',
    'Next.js',
    'Node.js',
    'WhatsApp API',
    'PHP',
    'ASP.NET',
    'Figma',
    'Webflow',
    'Framer',
  ],
};

/** The four steps sit on the logo's four corners; the node climbs them as you scroll. */
export const process = {
  index: '01',
  label: 'Process',
  title: 'From manual *to automatic.*',
  intro:
    'Every project follows the path in our logo: from the square, where work is boxed in by manual effort, step by step to the circle, where it runs and grows on its own.',
  stepLabel: 'Step',
  steps: [
    {
      title: 'Discovery & Strategy',
      body: 'Researching your manual limits. We map every friction point in your current workflow.',
    },
    {
      title: 'Architecture',
      body: 'Designing your digital foundation. Scalable, modular, and built to outlast trends.',
    },
    {
      title: 'Engineering',
      body: 'Building high-end, scalable code. Every function is intentional, every API battle-tested.',
    },
    {
      title: 'Launch & Scale',
      body: 'Starting your automated journey. Deployed, monitored, and ready to grow with you.',
    },
  ],
};

export const services = {
  index: '02',
  label: 'Services',
  title: 'Services built *for impact.*',
  intro:
    'Every service we offer is designed around one goal: measurable results for your business, through exceptional design and engineering.',
  items: [
    {
      title: 'UI/UX Design',
      summary: 'Interfaces that turn visitors into customers.',
      body: 'Crafting intuitive user experiences and pixel-perfect interfaces that convert visitors into loyal customers. Every pixel is intentional.',
      tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing'],
    },
    {
      title: 'Web & App Development',
      summary: 'Full-stack products, from DMs to dashboards.',
      body: 'Full-stack MERN applications and mobile apps built for performance, scalability, and real business impact. From DMs to dashboards.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'React Native'],
    },
    {
      title: 'Automation (n8n)',
      summary: 'Workflows that do the repetitive work for you.',
      body: 'Custom automation workflows connecting your tools and eliminating repetitive tasks, so your team can focus on growth, not grunt work.',
      tags: ['n8n', 'WhatsApp API', 'Zapier', 'AI Agents', 'Python', 'Webhooks'],
    },
    {
      title: 'Webflow Development',
      summary: 'Responsive sites with a CMS your team can run.',
      body: 'Professional, responsive websites built in Webflow with pixel-perfect design, CMS integration, and powerful animations. No code compromises.',
      tags: ['Webflow', 'CMS', 'SEO', 'Responsive Design', 'Interactions'],
    },
    {
      title: 'Framer Development',
      summary: 'Interactive sites with motion that stays with people.',
      body: 'Interactive websites built in Framer: advanced scroll animations, 3D effects, custom components, and micro-interactions that wow visitors.',
      tags: ['Framer', '3D Effects', 'Scroll Animation', 'Micro-interactions', 'Custom Components'],
    },
  ],
};

export type WorkGroup = 'web' | 'apps' | 'automation';

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  metric: string;
  tags: string[];
  groups: WorkGroup[];
  link?: string;
  githubLink?: string;
}

export const work = {
  index: '03',
  label: 'Selected work',
  title: 'Work that *ships.*',
  intro: 'Websites, platforms and automations we have designed, engineered and launched.',
  filterLabel: 'Filter projects',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Websites' },
    { id: 'apps', label: 'Full-stack apps' },
    { id: 'automation', label: 'Automation & AI' },
  ] as { id: WorkGroup | 'all'; label: string }[],
  initialCount: 6,
  showAll: 'Show all projects',
  showLess: 'Show fewer',
  live: 'Live site',
  code: 'Source',
  // TODO(client): projects without a link — client work under NDA, or concepts?
  onRequest: 'Case study on request',
  github: { label: 'More on GitHub', href: 'https://github.com/rifff-fin' },
  // TODO(client): the metrics below are the previous site's; confirm each is real and checkable.
  projects: [
    {
      title: 'Al Rifat Portfolio',
      category: 'React + Vite',
      year: '2025',
      description:
        'A personal developer portfolio showcasing projects, skills, and achievements with a modern UI, smooth scroll animations, and responsive design.',
      metric: 'Digital identity built',
      tags: ['React', 'Vite', 'Framer Motion', 'Netlify'],
      groups: ['web'],
      link: 'https://abdullahalrifatportfolio.netlify.app/',
    },
    {
      title: 'Artographica Studios',
      category: 'Web Design',
      year: '2025',
      description:
        'A premium creative studio website showcasing design portfolio, services, and brand identity with smooth animations and a modern aesthetic.',
      metric: 'Live studio presence',
      tags: ['React', 'Framer Motion', 'Web Design', 'Netlify'],
      groups: ['web'],
      link: 'https://artographica-studios.netlify.app/',
    },
    {
      title: 'E-Commerce Evolution',
      category: 'MERN + AI',
      year: '2025',
      description:
        'A full-scale e-commerce platform with AI-powered product recommendations, WhatsApp order tracking, and automated inventory management for a leading Dhaka retailer.',
      metric: '3× revenue growth',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'OpenAI', 'WhatsApp API'],
      groups: ['apps', 'automation'],
    },
    {
      title: 'Digital Inventory System',
      category: 'Python + Automation',
      year: '2025',
      description:
        'An enterprise-grade inventory and analytics dashboard with Python-based automation pipelines, reducing manual overhead for a multi-branch operation.',
      metric: '80% less manual work',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Automation', 'React'],
      groups: ['automation'],
    },
    {
      title: 'NFC Digital Portfolio Card',
      category: 'NFC + Web',
      year: '2025',
      description:
        'An NFC-enabled smart card that shares a full digital portfolio and contact details with a single tap. No app needed: tap, connect, impress.',
      metric: 'Instant digital presence',
      tags: ['NFC', 'React', 'Node.js', 'PWA'],
      groups: ['web'],
      link: 'https://msdiganto.netlify.app/',
    },
    {
      title: 'BdQuakeAlert',
      category: 'Real-time + API',
      year: '2025',
      description:
        'A real-time Bangladesh earthquake monitoring and alert system, delivering live seismic data and safety notifications for at-risk regions.',
      metric: 'Real-time safety data',
      tags: ['React', 'Real-time', 'REST API', 'Public Safety'],
      groups: ['web'],
      link: 'https://bdquakealert.netlify.app/',
    },
    {
      title: 'Smart POS System',
      category: 'MERN + Analytics',
      year: '2026',
      description:
        'A complete point-of-sale system with real-time inventory, multi-branch sales analytics, staff roles, and WhatsApp receipt delivery for modern retail.',
      metric: '60% faster checkout',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'WhatsApp API'],
      groups: ['apps', 'automation'],
    },
    {
      title: 'Restaurant QR Menu & Orders',
      category: 'QR + Real-time',
      year: '2026',
      description:
        'A QR-based digital menu and order system. Customers scan, browse, order and pay from their phone; the kitchen gets orders in real time.',
      metric: 'Zero paper menus',
      tags: ['React', 'Node.js', 'Socket.io', 'Payments'],
      groups: ['apps'],
    },
    {
      title: 'ThesisFlow',
      category: 'MERN Stack',
      year: '2025',
      description:
        'A full-stack MERN application that streamlines thesis management, collaboration, and submission workflows for academic institutions and research teams.',
      metric: 'Academic workflow automated',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      groups: ['apps'],
      githubLink: 'https://github.com/rifff-fin/thesisflow-mern',
    },
    {
      title: 'KAAJ KAAM',
      category: 'MERN + Job Portal',
      year: '2025',
      description:
        'A remote job portal built for Bangladesh, connecting local talent with remote employers through a clean interface and powerful search and filters.',
      metric: 'BD remote workforce enabled',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      groups: ['apps'],
      githubLink: 'https://github.com/rifff-fin/KAAJ_KAAM-A-Remote-job-portal-for-Bangladesh',
    },
  ] as Project[],
};

export const about = {
  index: '04',
  label: 'About',
  title: 'From BRACU *to big tech.*',
  paragraphs: [
    'We are a startup founded by students of BRAC University, one of Bangladesh’s most prestigious institutions, with a singular dream: to become a tech company that transforms how Bangladeshi entrepreneurs do business.',
    '“Fin” isn’t just a name. It’s a commitment: to finishing the era of manual struggle for Bangladeshi entrepreneurs, and beginning the age of AI-powered growth.',
  ],
  word: {
    bengali: 'প্রযুক্তি',
    latin: 'projukti',
    meaning: 'Bangla for “technology”',
  },
  valuesLabel: 'What we hold to',
  values: [
    {
      title: 'Craft over quantity',
      body: 'We build fewer things, better. Every pixel, every function, every line of code is intentional.',
    },
    {
      title: 'AI-first thinking',
      body: 'Before writing a single line, we ask: how can automation make this ten times more powerful?',
    },
    {
      title: 'Radical transparency',
      body: 'No black boxes. You know what we build, why we build it, and exactly how it scales.',
    },
  ],
  // TODO(client): the previous site's numbers; confirm before launch.
  stats: [
    { value: '50+', label: 'Solutions shipped' },
    { value: '30+', label: 'Businesses scaled' },
    { value: '24 h', label: 'Reply to every brief' },
  ],
};

export const contact = {
  index: '05',
  label: 'Contact',
  title: 'Let’s build something *remarkable.*',
  intro:
    'Whether you have a clear vision or just a spark of an idea, we’d love to hear from you. Tell us about your project and let’s explore what we can create together.',
  direct: 'Direct lines',
  whatsappSuffix: 'WhatsApp',
  form: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@company.com' },
    company: { label: 'Business / company', placeholder: 'Optional' },
    services: {
      label: 'Services needed',
      options: [
        'UI/UX Design',
        'Web Development',
        'App Development',
        'Automation (n8n)',
        'Webflow',
        'Framer',
        'Not sure yet',
      ],
    },
    budget: {
      label: 'Budget range',
      options: ['৳5k – ৳10k', '৳10k – ৳25k', '৳25k – ৳50k', '৳50k+'],
    },
    details: {
      label: 'Project details',
      placeholder: 'Tell us about your project, goals and timeline…',
    },
    required: 'required',
    errors: {
      name: 'Please tell us your name.',
      email: 'Please enter a valid email address.',
      details: 'A sentence or two about the project helps us reply properly.',
    },
    submit: 'Send project brief',
    sending: 'Sending…',
    note: 'We reply within 24 hours. No spam, ever.',
    failed: 'Something went wrong. Please try again, or message us on WhatsApp.',
  },
  success: {
    title: 'Brief received.',
    body: 'Thank you. We’ll reply within 24 hours. Want to talk sooner? Continue on WhatsApp and we’ll pick it up from there.',
    whatsapp: 'Continue on WhatsApp',
    again: 'Send another brief',
    whatsappMessage: (name: string, services: string) =>
      `Hi Fin Projukti, I'm ${name}. I just sent a project brief through your website${
        services ? ` (${services})` : ''
      }.`,
  },
};

export const footer = {
  cta: 'Got a project *in mind?*',
  button: 'Start a project',
  tagline: 'Engineering the beginning of your AI growth.',
  columns: {
    services: 'Services',
    company: 'Company',
    connect: 'Connect',
  },
  companyLinks: [
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  copyright: `© ${new Date().getFullYear()} Fin Projukti · A BRAC University student-led startup`,
  crafted: 'Crafted with precision · Built for impact.',
  backToTop: 'Back to top',
};

export const motionSwitch = {
  label: 'Motion',
  on: 'On',
  off: 'Off',
  title: 'Turn the animation on or off',
};

export const preloader = {
  label: 'Loading Fin Projukti',
};
