import type { APIRoute } from 'astro';
import { pages } from '../data/pages';
import { profile } from '../data/profile';
import { absolute, escapeHtml, pagePath } from '../lib/render';

export const GET: APIRoute = ({ site }) => {
  const urls = pages
    .map(
      (page) =>
        `  <url>\n    <loc>${escapeHtml(absolute(pagePath(page), site!.href))}</loc>\n    <lastmod>${profile.updated}</lastmod>\n  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
