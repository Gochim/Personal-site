# dmytro-ivanchenko-site

Source of the personal website of Dmytro Ivanchenko.

A static site built with [Astro](https://astro.build). It sends no JavaScript to the reader.

## Build

Needs Node 22.12 or newer.

```
npm install
npm run dev      # work on the site with live reload
npm run build    # produce the site in dist/
npm run preview  # serve dist/ locally
```

## Where things are

| Path | Holds |
|---|---|
| `src/data/profile.ts` | The facts shown on the site, stored once |
| `src/data/pages.ts` | The text of the five pages |
| `assets/articles.md` | The writing sites and the article list; the Writing page is built from it |
| `assets/dmytro-ivanchenko.png` | The photo, as received; the build makes the compressed copies |
| `styles/site.css` | The only stylesheet |
| `src/layouts/Base.astro` | Metadata, header and footer, shared by every page |
| `src/pages/` | The page template, and the files that produce `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` and the Markdown copy of each page |
| `src/lib/` | The article-list reader, the structured data and the Markdown output |
| `astro.config.mjs` | The address of the site |

To add an article, add a line to `assets/articles.md` and build.
