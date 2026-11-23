import { defineConfig } from 'astro/config';

// `site` is the address every canonical link, the sitemap, llms.txt and the
// structured data are built from. It is set here and nowhere else.
export default defineConfig({
  site: 'https://dmytroivanchenko.com',
  // CSS stays in a file, so the Content-Security-Policy in Base.astro can
  // allow styles from this site only.
  build: { inlineStylesheets: 'never' },
});
