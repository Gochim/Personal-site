// A page is a list of blocks. Each block is one of the parts the design
// allows. The same blocks are rendered to HTML for the page and to Markdown
// for its copy, so the two cannot drift apart.
//
// Text inside a block may use two marks: **bold** and [link text](address).

import type { Article } from './articles';

export type Block =
  | { type: 'meta'; text: string }
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; compact?: boolean; items: string[] }
  | { type: 'photo'; alt: string }
  /** The article list: a heading for each year, one row per version. */
  | { type: 'articles' };

export interface Page {
  /** '' for Home, otherwise the folder name, for example 'about'. */
  slug: string;
  /** Name in the header navigation and in lists of pages. */
  label: string;
  /** The page's one top-level heading. */
  heading: string;
  /** Browser title. */
  title: string;
  /** One-sentence meta description. */
  description: string;
  blocks: Block[];
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BOLD = /\*\*(.+?)\*\*/g;

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Block text to HTML. Links to Dmytro's own profiles are marked rel="me". */
export function inlineHtml(text: string, ownProfiles: string[] = []): string {
  return escapeHtml(text)
    .replace(LINK, (_all, label: string, url: string) => {
      const rel = ownProfiles.includes(url) ? ' rel="me"' : '';
      return `<a href="${url}"${rel}>${label}</a>`;
    })
    .replace(BOLD, '<strong>$1</strong>');
}

/** Block text to Markdown: links inside the site get their full address. */
export function inlineMarkdown(text: string, site: string): string {
  return text.replace(LINK, (_all, label: string, url: string) => {
    return `[${label}](${url.startsWith('/') ? absolute(url, site) : url})`;
  });
}

/** Block text with the marks removed, for places that take plain text only. */
export function plainText(text: string): string {
  return text.replace(LINK, '$1').replace(BOLD, '$1');
}

export function absolute(path: string, site: string): string {
  return new URL(path, site).href;
}

export function pagePath(page: Page): string {
  return page.slug === '' ? '/' : `/${page.slug}/`;
}

export function markdownPath(page: Page): string {
  return page.slug === '' ? '/index.md' : `/${page.slug}.md`;
}

function articleLine(version: Article['versions'][number]): string {
  return `[${version.title}](${version.url}) (${version.language}, ${version.date})`;
}

interface MarkdownContext {
  site: string;
  articles: Article[];
  /** 1 for a page on its own; 2 when the page is a section of a longer file. */
  level?: number;
}

/** A whole page as Markdown, starting with its heading. */
export function pageMarkdown(page: Page, context: MarkdownContext): string {
  const level = context.level ?? 1;
  const out: string[] = [`${'#'.repeat(level)} ${page.heading}`];

  for (const block of page.blocks) {
    switch (block.type) {
      case 'meta':
      case 'p':
        out.push(inlineMarkdown(block.text, context.site));
        break;
      case 'h2':
        out.push(`${'#'.repeat(level + 1)} ${block.text}`);
        break;
      case 'list':
        out.push(block.items.map((item) => `- ${inlineMarkdown(item, context.site)}`).join('\n'));
        break;
      case 'photo':
        break;
      case 'articles':
        out.push(`${'#'.repeat(level + 1)} Articles`);
        out.push(
          context.articles
            .map((article, index) => {
              const [first, ...rest] = article.versions;
              const lines = [`${index + 1}. ${articleLine(first)}`];
              for (const version of rest) lines.push(`   - ${articleLine(version)}`);
              return lines.join('\n');
            })
            .join('\n'),
        );
        break;
    }
  }

  return out.join('\n\n');
}
