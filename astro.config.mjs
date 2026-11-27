// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://physio-fabrik.de',
  // „preserve“ behält die bisherigen Adressen bei: /impressum.html,
  // /datenschutz.html, /en/index.html — Links von außen bleiben gültig.
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
