// The copy of the site: the five pages of the profile and the privacy policy.
// Facts are taken from profile.ts and the writing sites from
// assets/articles.md, so a fact is changed in one place only.

import { sites } from '../lib/articles';
import type { Page } from '../lib/render';
import { profile as p } from './profile';

const place = `${p.region}, ${p.country}`;
const identity = `${p.title} in ${place}`;
/** The role and country, for the page descriptions, which name no region. */
const shortIdentity = `${p.title} in ${p.country}`;
const linkedinLabel = p.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');

/** "A", "A and B", "A, B and C". */
function sentenceList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const siteLinks = sentenceList(sites.map((site) => `[${site.name}](${site.url})`));

const home: Page = {
  slug: '',
  label: 'Home',
  heading: p.name,
  title: p.name,
  description: `${p.name} is a ${p.title} and ${p.secondTitle} based in ${p.country}, with ${p.years} years in the IT sector in both product and professional services companies.`,
  justified: true,
  blocks: [
    { type: 'meta', text: identity },
    { type: 'p', text: p.statement },
    {
      type: 'p',
      text: `Write to [${p.email}](mailto:${p.email}) or find me on [LinkedIn](${p.linkedin}).`,
    },
    { type: 'photo', alt: `Portrait of ${p.name}` },
    {
      type: 'p',
      text: `I’m ${p.name}, ${p.title} and ${p.secondTitle} at ${p.employer}, based in ${place}. I have ${p.years} years of experience in software, from engineer to business unit head. My current focus is P&L ownership, strategic client partnership and AI transformation.`,
    },
    {
      type: 'list',
      items: [
        '**[About](/about/).** Who I am, what I own today and how I work.',
        '**[Experience](/experience/).** My roles since 2002, education and languages.',
        `**[Writing](/writing/).** My articles on ${p.topics}.`,
        '**[Contact](/contact/).** Email and LinkedIn.',
      ],
    },
  ],
};

const about: Page = {
  slug: 'about',
  label: 'About',
  heading: 'About',
  title: `About · ${p.name}`,
  description: `About ${p.name}, ${shortIdentity}: who he is, what he owns today, how he works and his areas of expertise.`,
  blocks: [
    {
      type: 'p',
      text: `I’m ${p.name}, ${p.title} and ${p.secondTitle} at ${p.employer}, based in ${place}.`,
    },
    {
      type: 'p',
      text: 'I own the full picture of a technology services business: the P&L, the strategic client partnerships, and the AI transformation programmes for the company and its clients.',
    },
    {
      type: 'p',
      text: `I started as a software engineer ${p.years} years ago and spent more than half of my career building products and leading development teams. That lets me align technology decisions with business growth, and speak both languages in the same meeting.`,
    },
    {
      type: 'p',
      text: 'My teams have delivered mission-critical systems for two of the world’s five largest regulated online gaming platforms and for a world-leading speech recognition and IVR provider.',
    },
    {
      type: 'p',
      text: 'Results live between perfection and “good enough”. My job is to find exceptional people, remove obstacles, and create the conditions for them to excel.',
    },
    { type: 'h2', text: 'Expertise' },
    {
      type: 'list',
      items: p.expertise.map((item) => `**${item.area}.** ${item.line}`),
    },
    { type: 'h2', text: 'Industries' },
    { type: 'p', text: `I have worked on projects in ${sentenceList(p.industries)}.` },
  ],
};

const experience: Page = {
  slug: 'experience',
  label: 'Experience',
  heading: 'Experience',
  title: `Experience · ${p.name}`,
  description: `The roles, education, certifications and languages of ${p.name}, ${shortIdentity}.`,
  blocks: [
    {
      type: 'list',
      items: p.roles.map(
        (role) => `**${role.years}. ${role.title},** ${role.organisation}. ${role.line}`,
      ),
    },
    { type: 'h2', text: 'Education' },
    {
      type: 'list',
      compact: true,
      items: p.degrees.map((d) => `**${d.degree}.** ${d.school}, ${d.year}`),
    },
    { type: 'h2', text: 'Certifications and courses' },
    { type: 'list', compact: true, items: p.courses },
    { type: 'h2', text: 'Languages' },
    {
      type: 'list',
      compact: true,
      items: p.languages.map((language) => `**${language.name}.** ${language.level}`),
    },
  ],
};

const writing: Page = {
  slug: 'writing',
  label: 'Writing',
  heading: 'Writing',
  title: `Writing · ${p.name}`,
  description: `Articles by ${p.name} on people, leadership, AI adoption and delivery, with links to where each one is published.`,
  blocks: [
    { type: 'p', text: `I write about ${p.topics} on ${siteLinks}.` },
    { type: 'articles' },
  ],
};

const contact: Page = {
  slug: 'contact',
  label: 'Contact',
  heading: 'Contact',
  title: `Contact · ${p.name}`,
  description: `How to reach ${p.name}, ${shortIdentity}: email and LinkedIn.`,
  blocks: [
    { type: 'p', text: 'The best way to reach me is by email.' },
    {
      type: 'list',
      compact: true,
      items: [
        `**Email.** [${p.email}](mailto:${p.email})`,
        `**LinkedIn.** [${linkedinLabel}](${p.linkedin})`,
        `**Location.** ${place}`,
      ],
    },
  ],
};

/** Linked from the footer only. It is not part of the profile, so it is left
    out of the header, llms.txt and the full profile. */
export const privacy: Page = {
  slug: 'privacy',
  label: 'Privacy policy',
  heading: 'Privacy policy',
  title: `Privacy policy · ${p.name}`,
  description: `How the website of ${p.name} handles personal data: no cookies or tracking, hosting on GitHub Pages, email, and your rights under the GDPR.`,
  blocks: [
    { type: 'meta', text: 'Last updated 17 November 2026' },
    {
      type: 'p',
      text: 'This page explains what personal data this site handles, why, and what your rights are. In short: the site does not track you. The only personal data involved is what the hosting service records when you visit, and what you send me if you email me.',
    },
    { type: 'h2', text: 'Who is responsible' },
    { type: 'p', text: `${p.name}, ${place}. Email: [${p.email}](mailto:${p.email})` },
    { type: 'h2', text: 'What this site does not do' },
    {
      type: 'list',
      compact: true,
      items: [
        'No cookies.',
        'No analytics or visitor tracking.',
        'No advertising.',
        'No scripts, embedded content or fonts loaded from other companies.',
        'No contact form and no newsletter.',
      ],
    },
    { type: 'h2', text: 'When you visit this site' },
    {
      type: 'p',
      text: 'This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
    },
    {
      type: 'p',
      text: 'To send you a page, GitHub’s servers receive your IP address and the technical details your browser sends with every request, such as the page you asked for, the time, and your browser type. GitHub logs visitors’ IP addresses to keep its service secure. I have no access to these logs and do not use them.',
    },
    {
      type: 'p',
      text: 'Legal basis: my legitimate interest in running a secure, working website (Art. 6(1)(f) GDPR).',
    },
    {
      type: 'p',
      text: 'GitHub is based in the United States, so this data may be processed there. GitHub states that it protects data transferred from the EU under the EU-U.S. Data Privacy Framework and the EU’s standard contractual clauses. GitHub decides how long it keeps its logs. Details are in the [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).',
    },
    { type: 'h2', text: 'When you email me' },
    {
      type: 'p',
      text: 'If you email me, I receive your email address, your name if you include it, and what you write. I use this only to read and answer your message. I do not share it with anyone, and I delete it once it is no longer needed, unless the law requires me to keep it.',
    },
    {
      type: 'p',
      text: 'Legal basis: my legitimate interest in answering messages (Art. 6(1)(f) GDPR). If you write about working together, also the steps before a possible contract (Art. 6(1)(b) GDPR).',
    },
    {
      type: 'p',
      text: 'My email is provided by Proton AG in Switzerland. The EU recognises Switzerland as protecting personal data to an adequate standard.',
    },
    { type: 'h2', text: 'Links to other sites' },
    {
      type: 'p',
      text: 'This site links to LinkedIn, Substack and other sites. Nothing is sent to them unless you click a link. Once you are on another site, its own privacy policy applies.',
    },
    { type: 'h2', text: 'Your rights' },
    { type: 'p', text: 'You have the right to:' },
    {
      type: 'list',
      compact: true,
      items: [
        'ask what personal data I hold about you, and get a copy (Art. 15 GDPR);',
        'have wrong data corrected (Art. 16);',
        'have your data deleted (Art. 17);',
        'have its use restricted (Art. 18);',
        'receive your data in a common, machine-readable format (Art. 20);',
        'object to its use where it is based on my legitimate interest (Art. 21).',
      ],
    },
    {
      type: 'p',
      text: `To use any of these rights, [email me](mailto:${p.email}). For the logs that GitHub keeps, you can also contact GitHub directly.`,
    },
    {
      type: 'p',
      text: 'You also have the right to complain to a relevant data protection authority.',
    },
    {
      type: 'p',
      text: 'You do not have to give me any personal data. Your browser sends its IP address because that is how pages reach you; emailing me is up to you. I make no automated decisions about you and do not build profiles.',
    },
    { type: 'h2', text: 'Changes' },
    {
      type: 'p',
      text: 'I update this page when the site changes. The date at the top shows when it was last changed.',
    },
  ],
};

/** The five pages of the profile, in header order after Home. */
export const pages: Page[] = [home, about, experience, writing, contact];

/** Every page the site builds. */
export const allPages: Page[] = [...pages, privacy];
