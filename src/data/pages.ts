// The copy of the five pages. Facts are taken from profile.ts and the writing
// sites from assets/articles.md, so a fact is changed in one place only.

import { sites } from '../lib/articles';
import type { Page } from '../lib/render';
import { profile as p } from './profile';

const place = `${p.region}, ${p.country}`;
const identity = `${p.title} in ${place}`;
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
  title: `${p.name}, ${identity}`,
  description: `${p.name} is a ${p.title} and ${p.secondTitle} based in ${place}, with ${p.years} years in software, P&L ownership and client partnership.`,
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
      text: `I’m ${p.name}, ${p.title} and ${p.secondTitle} at ${p.employer}, based in ${place}. I have ${p.years} years of experience in software, from engineer to business unit head. My focus is P&L ownership, strategic client partnership and AI transformation.`,
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
  description: `About ${p.name}, ${identity}: who he is, what he owns today, how he works and his areas of expertise.`,
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
    { type: 'p', text: `I have worked in ${sentenceList(p.industries)}.` },
  ],
};

const experience: Page = {
  slug: 'experience',
  label: 'Experience',
  heading: 'Experience',
  title: `Experience · ${p.name}`,
  description: `The roles, education, certifications and languages of ${p.name}, ${identity}.`,
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
  description: `Articles by ${p.name} on ${p.topics}, with links to where each one is published.`,
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
  description: `How to reach ${p.name}, ${identity}: email and LinkedIn.`,
  blocks: [
    { type: 'p', text: 'The best way to reach me is by email.' },
    {
      type: 'list',
      compact: true,
      items: [
        `**Email.** [${p.email}](mailto:${p.email})`,
        `**LinkedIn.** [${linkedinLabel}](${p.linkedin})`,
        `**Region.** ${place}`,
      ],
    },
  ],
};

export const pages: Page[] = [home, about, experience, writing, contact];
