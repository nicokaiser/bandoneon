// @ts-check

import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
