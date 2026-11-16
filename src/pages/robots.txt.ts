import type { APIRoute } from 'astro';
import { absolute } from '../lib/render';

// Everything is open to every crawler. The AI crawlers are also named one by
// one, so that the permission is explicit and does not rest on the wildcard.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  const groups = ['*', ...AI_CRAWLERS].map((agent) => `User-agent: ${agent}\nAllow: /`);
  const body = `${groups.join('\n\n')}\n\nSitemap: ${absolute('/sitemap.xml', site!.href)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
