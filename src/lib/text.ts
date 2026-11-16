// The plain-text and Markdown files served beside the pages: one Markdown
// copy per page, llms.txt and the full profile in one file. All are produced
// from the same blocks as the pages.

import { pages } from '../data/pages';
import { profile } from '../data/profile';
import { articles } from './articles';
import { absolute, markdownPath, pageMarkdown, pagePath, type Page } from './render';

const alsoWritten = `${profile.name} is also written ${profile.alternateNames
  .map((alt) => alt.text)
  .join(', ')}.`;

function closing(site: string, page?: Page): string {
  const lines = [alsoWritten, `Last updated: ${profile.updated}`];
  if (page) lines.push(`Source: ${absolute(pagePath(page), site)}`);
  return lines.join('\n\n');
}

/** The Markdown copy of one page. */
export function pageCopy(page: Page, site: string): string {
  return `${pageMarkdown(page, { site, articles })}\n\n---\n\n${closing(site, page)}\n`;
}

/** The whole profile in one Markdown file: Home, then each page as a section. */
export function fullProfile(site: string): string {
  const [home, ...rest] = pages;
  const parts = [
    pageMarkdown(home, { site, articles }),
    ...rest.map((page) => pageMarkdown(page, { site, articles, level: 2 })),
  ];
  return `${parts.join('\n\n')}\n\n---\n\n${closing(site)}\n\nSource: ${site}\n`;
}

/** llms.txt: a short summary and a list of every page. */
export function llmsTxt(site: string): string {
  const [home] = pages;
  const pageLines = pages.map(
    (page) => `- [${page.label}](${absolute(markdownPath(page), site)}): ${page.description}`,
  );

  return [
    `# ${profile.name}`,
    `> ${home.description}`,
    `${alsoWritten} This is his personal website, written by him. Last updated: ${profile.updated}.`,
    '## Pages',
    pageLines.join('\n'),
    '## Full profile',
    `- [Full profile in one file](${absolute('/llms-full.txt', site)}): every page above in a single Markdown file.`,
  ].join('\n\n') + '\n';
}
