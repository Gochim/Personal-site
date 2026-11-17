// The facts about Dmytro, stored once. The pages, the structured data,
// llms.txt and the Markdown copies all read from this file.

export const profile = {
  name: 'Dmytro Ivanchenko',
  givenName: 'Dmytro',
  familyName: 'Ivanchenko',

  // Other spellings of the name: shown once in the footer and listed in the
  // structured data. `lang` marks a spelling that is not in Latin script.
  alternateNames: [
    { text: 'Dmitry Ivanchenko' },
    { text: 'Dmitriy Ivanchenko' },
    { text: 'Дмитро Іванченко', lang: 'uk' },
  ] as { text: string; lang?: string }[],

  title: 'Business Unit Head',
  secondTitle: 'Head of AI Transformation',
  employer: 'a multinational professional services company',
  years: '25+',

  region: 'NRW',
  country: 'Germany',
  countryCode: 'DE',

  email: 'gvanch@pm.me',
  linkedin: 'https://www.linkedin.com/in/ivandm/',

  // Date of the last content change, year-month-day. Shown in the footer of
  // every page and carried in the structured data.
  updated: '2026-11-17',

  statement:
    'I lead a technology services business unit and help multinational organisations turn technology investment into measurable growth, with a focus on AI adoption that lasts.',

  topics: 'people, leadership and AI adoption',

  expertise: [
    {
      area: 'Business leadership',
      line: 'Full P&L ownership, budgets and contracts, reporting to CEO and CFO, and a seat on the operational board for annual planning and KPIs.',
    },
    {
      area: 'Client partnership',
      line: 'Senior partner to client executives and business owners: quarterly, annual and three-year planning, account growth, and crisis resolution.',
    },
    {
      area: 'AI transformation',
      line: 'AI service offerings and delivery frameworks, client-side AI strategy, and programmes across engineering, recruitment, HR, customer support and finance.',
    },
    {
      area: 'People and delivery',
      line: 'Building and retaining multicultural teams from more than 10 countries, developing team leads and project managers, and holding delivery quality to a standard.',
    },
  ],

  industries: [
    'regulated online gaming',
    'speech recognition and IVR',
    'healthcare',
    'retail and e-commerce',
    'martech and big data analytics',
    'compliance standards',
    'ed-tech',
    'agriculture',
  ],

  // Newest first.
  roles: [
    {
      years: '2022 – present',
      title: 'Business Unit Head and Head of AI Transformation',
      organisation: 'a multinational professional services company',
      line: 'Full P&L ownership of a business unit with four service lines. I lead the AI transformation agenda for the company and its clients.',
    },
    {
      years: '2020 – 2022',
      title: 'Delivery Partner',
      organisation: 'a professional IT services company',
      line: 'Delivery for a portfolio of more than 10 clients and 80+ people across data management, healthcare, agriculture and ed-tech. I moved from Lead Software Engineer to Delivery Partner in under 12 months.',
    },
    {
      years: '2017 – 2020',
      title: 'Development Team Lead',
      organisation: 'Onseo',
      line: 'Led delivery of 30+ online games for regulated markets. Designed a client architecture that scaled from one team to eight, and cut acceptance testing from 21 days to 4.',
    },
    {
      years: '2014 – 2017',
      title: 'Development Team Lead',
      organisation: 'bwin.party digital entertainment',
      line: 'Led mobile casino client development for a top-five regulated online gaming operator and delivered 50+ games.',
    },
    {
      years: '2002 – 2014',
      title: 'Software Engineer, then Senior Software Engineer',
      organisation: 'Win Interactive, Aricent, EPAM Systems and TEAM',
      line: 'Desktop clients in C++ for a world-leading online casino, and speech recognition and text-to-speech products for a world-leading IVR provider.',
    },
  ],

  university: 'Vinnytsia National Technical University',

  degrees: [
    {
      degree: 'Master’s degree, Computer Programming and Artificial Intelligence',
      school: 'Vinnytsia National Technical University',
      year: '2004',
    },
    {
      degree: 'Bachelor’s degree, Economics and Accounting',
      school: 'Vinnytsia National Technical University',
      year: '2004',
    },
    {
      degree: 'Certified Translator, English',
      school: 'First Kyiv Government Courses of Foreign Languages',
      year: '1999',
    },
  ],

  courses: [
    'ICAgile Certified Professional',
    'Claude Certified Architect, Foundations preparation courses (Anthropic)',
    'Machine Learning; Data Science Ethics (Coursera)',
    'Secure Development Training (SANS Institute)',
  ],

  languages: [
    { name: 'Ukrainian', code: 'uk', level: 'C2' },
    { name: 'English', code: 'en', level: 'C1' },
    { name: 'Russian', code: 'ru', level: 'C2' },
    { name: 'German', code: 'de', level: 'A1, learning' },
  ],

  knowsAbout: [
    'P&L management',
    'AI transformation',
    'Strategic client partnership',
    'Software delivery',
    'Organisational change management',
    'People leadership',
    'Regulated online gaming',
    'Speech recognition and IVR',
  ],
};

export type Profile = typeof profile;
