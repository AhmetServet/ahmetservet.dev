import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ahmetservet.dev',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false }
  },
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] }
});
