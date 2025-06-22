import { buildMacros } from '@embroider/macros/babel';

const macros = buildMacros();

export default {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowDeclareFields: true
      }
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: import.meta.resolve('decorator-transforms/runtime-esm')
        }
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: import.meta.dirname,
        useESModules: true,
        regenerator: false
      }
    ],
    ...macros.babelMacros
  ],

  generatorOpts: {
    compact: false
  }
};
