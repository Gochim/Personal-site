import type { APIRoute } from 'astro';
import { fullProfile } from '../lib/text';

export const GET: APIRoute = ({ site }) =>
  new Response(fullProfile(site!.href), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
