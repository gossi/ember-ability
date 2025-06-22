import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    './src/domain-objects/blog/index.ts',
    './src/domain-objects/user/index.ts',
    './src/fixtures/index.ts'
  ],
  dts: true,
  format: 'esm'
});
