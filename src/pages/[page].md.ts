// The Markdown copy of each page: /index.md, /about.md and so on.
import type { APIRoute } from 'astro';
import { pages } from '../data/pages';
import type { Page } from '../lib/render';
import { pageCopy } from '../lib/text';

export function getStaticPaths() {
  return pages.map((page) => ({
    params: { page: page.slug === '' ? 'index' : page.slug },
    props: { page },
  }));
}

export const GET: APIRoute = ({ props, site }) =>
  new Response(pageCopy(props.page as Page, site!.href), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
