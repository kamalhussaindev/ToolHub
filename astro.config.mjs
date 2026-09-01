// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import { getSortedClusters } from './src/data/clusters.ts';
import { getLiveToolsByCluster } from './src/data/tools.ts';

// Category hubs with zero live tools render with a noindex meta tag (see
// src/pages/[cluster]/index.astro) so they stay reachable but out of
// Google's index. The sitemap must not contradict that, so we exclude the
// same paths here from the same data source rather than hardcoding them.
const noindexClusterPaths = new Set(
  getSortedClusters()
    .filter((c) => getLiveToolsByCluster(c.slug).length === 0)
    .map((c) => `/${c.slug}/`)
);

// Every URL's static HTML is in fact regenerated at this moment on every
// production build/deploy, so stamping build time as <lastmod> is accurate —
// not invented precision — and gives Google a real recrawl signal that was
// previously missing from the sitemap entirely.
const buildLastmod = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  site: 'https://ogtoolser.com',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => !noindexClusterPaths.has(new URL(page).pathname),
      serialize: (item) => ({ ...item, lastmod: buildLastmod }),
    }),
  ],
});