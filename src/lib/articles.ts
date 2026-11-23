// Reads assets/articles.md, the one place the writing sites and the article
// list are kept. A line the parser does not understand stops the build with a
// message naming the line, so a typing mistake cannot quietly drop an article.

import source from '../../assets/articles.md?raw';

export interface Site {
  name: string;
  url: string;
}

export interface Version {
  title: string;
  url: string;
  language: string;
  /** Language code for the HTML `lang` attribute; undefined if not known. */
  lang?: string;
  /** Year-month-day, exactly as written in the file. */
  date: string;
}

export interface Article {
  /** The first version is the one on the numbered line. */
  versions: Version[];
}

const LANGUAGE_CODES: Record<string, string> = {
  english: 'en',
  ukrainian: 'uk',
  german: 'de',
  russian: 'ru',
  polish: 'pl',
  french: 'fr',
  spanish: 'es',
  italian: 'it',
  dutch: 'nl',
  portuguese: 'pt',
};

const LINK = /^\[(.+)\]\((\S+)\)$/;
const ENTRY = /^\[(.+)\]\((\S+)\)\s+\(([^,()]+),\s*(\d{4}-\d{2}-\d{2})\)$/;

/** Every address must be a full https:// address. */
function checkUrl(url: string, fail: (why: string) => never): void {
  let protocol = '';
  try {
    protocol = new URL(url).protocol;
  } catch {
    fail(`"${url}" is not a full address`);
  }
  if (protocol !== 'https:' || !url.startsWith('https://')) fail(`"${url}" must start with https://`);
  if (/[[\]<>"*]/.test(url)) fail(`"${url}" contains a character an address cannot have`);
}

/** A name or title cannot hold square brackets, which mark a link. */
function checkText(text: string, fail: (why: string) => never): void {
  if (/[[\]]/.test(text)) fail(`"${text}" contains a square bracket`);
}

function parse(text: string): { sites: Site[]; articles: Article[] } {
  const sites: Site[] = [];
  const articles: Article[] = [];
  let section = '';

  text.split(/\r?\n/).forEach((raw, index) => {
    const fail = (why: string): never => {
      throw new Error(`assets/articles.md, line ${index + 1}: ${why}\n  ${raw}`);
    };

    if (raw.trim() === '') return;

    const heading = raw.match(/^(#+)\s+(.*)$/);
    if (heading) {
      if (heading[1] === '##') section = heading[2].trim().toLowerCase();
      return;
    }

    const item = raw.match(/^(\s*)(\d+\.|-)\s+(.*)$/);
    if (!item) fail('expected a list line');
    const [, indent, marker, body] = item!;
    const nested = indent.length > 0;

    if (section === 'writing sites') {
      const link = body.trim().match(LINK);
      if (!link) fail('expected "- [Site name](address)"');
      checkText(link![1], fail);
      checkUrl(link![2], fail);
      sites.push({ name: link![1], url: link![2] });
      return;
    }

    if (section === 'articles') {
      const entry = body.trim().match(ENTRY);
      if (!entry) fail('expected "[Title](address) (Language, YYYY-MM-DD)"');
      const [, title, url, languageRaw, date] = entry!;
      checkText(title, fail);
      checkUrl(url, fail);
      if (Number.isNaN(Date.parse(`${date}T00:00:00Z`))) fail(`"${date}" is not a real date`);
      const language = languageRaw.trim();
      const version: Version = {
        title,
        url,
        language,
        lang: LANGUAGE_CODES[language.toLowerCase()],
        date,
      };

      if (nested) {
        if (articles.length === 0) fail('an indented line needs a numbered line above it');
        articles[articles.length - 1].versions.push(version);
      } else {
        if (marker === '-') fail('an article starts with a number, for example "1."');
        articles.push({ versions: [version] });
      }
      return;
    }

    fail(`a list outside the "Writing sites" and "Articles" sections`);
  });

  return { sites, articles };
}

const parsed = parse(source);

export const sites = parsed.sites;
export const articles = parsed.articles;

/** Every published version of every article, newest first by its own date.
    Versions with the same date keep the order of the file. */
export const versions: Version[] = articles
  .flatMap((article) => article.versions)
  .map((version, index) => ({ version, index }))
  .sort((a, b) => b.version.date.localeCompare(a.version.date) || a.index - b.index)
  .map(({ version }) => version);

export interface YearGroup {
  year: string;
  rows: Version[];
}

/** The versions grouped for the Writing page, one group per year. */
export const years: YearGroup[] = [];
for (const version of versions) {
  const year = version.date.slice(0, 4);
  if (years.at(-1)?.year !== year) years.push({ year, rows: [] });
  years.at(-1)!.rows.push(version);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-06-02" becomes "02 Jun". */
export function dayAndMonth(date: string): string {
  return `${date.slice(8, 10)} ${MONTHS[Number(date.slice(5, 7)) - 1]}`;
}
