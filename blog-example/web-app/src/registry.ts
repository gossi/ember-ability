import LinkManagerService from 'ember-link/services/link-manager';
import PageTitleService from 'ember-page-title/services/page-title';

import Router from './router.js';

import type { ImportGlobFunction } from 'vite/types/importGlob.js';

const appName = `@my-blog/web-app`;

function formatAsResolverEntries(imports: ReturnType<ImportGlobFunction>) {
  return Object.fromEntries(
    Object.entries(imports).map(([k, v]) => [
      k.replace(/\.g?(j|t)s$/, '').replace(/^\.\//, `${appName}/`),
      v
    ])
  );
}

/**
 * A global registry is needed until:
 * - Services can be referenced via import paths (rather than strings)
 * - we design a new routing system
 */
const resolverRegistry = {
  ...formatAsResolverEntries(import.meta.glob('./templates/**/*.{gjs,gts,js,ts}', { eager: true })),
  ...formatAsResolverEntries(import.meta.glob('./services/**/*.{js,ts}', { eager: true })),
  ...formatAsResolverEntries(import.meta.glob('./routes/**/*.{js,ts}', { eager: true })),
  [`${appName}/router`]: Router
};

export const registry = {
  ...resolverRegistry,
  [`${appName}/services/page-title`]: PageTitleService,
  [`${appName}/services/link-manager`]: LinkManagerService
};
