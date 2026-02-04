// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
  }),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // IMPORTS
      'import/order': [ 'error', {
        'groups': [ 'builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type' ], 
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
      }],
      // STYLE
      '@stylistic/array-element-newline': ['error', { 'consistent': true, 'multiline': true }],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/keyword-spacing': ['error', { overrides: { if: { after: false }, for: { after: false }, while: { after: false }, switch: { after: false }} }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      // PROMISES
      '@typescript-eslint/no-floating-promises': 'warn',
      // ANY
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },
);
