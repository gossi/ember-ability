import { defineConfig } from 'eslint/config';

import { configs } from '@gossi/config-eslint';

export default defineConfig([
  {
    ignores: ['./public/mockServiceWorker.js']
  },
  ...configs.ember(import.meta.dirname)
]);
