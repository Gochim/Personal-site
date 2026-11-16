import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/text';

export const GET: APIRoute = ({ site }) =>
  new Response(llmsTxt(site!.href), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
