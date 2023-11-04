/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    'prettier',
    // '@typescript-eslint',
    // '@vue/eslint-config-typescript',
    // '@vue/eslint-config-prettier/skip-formatting',
  ],
  parser: 'vue-eslint-parser', //'@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    // "project": "./tsconfig.json"
  },
  rules: {
    'prettier/prettier': 'error',
    // 'import/extensions': 0,
    // 'vue3/no-console': ['error', { allow: ['error', 'warn'] }],
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_embedded'],
      },
    ],
    'no-param-reassign': ['error', { props: false }],
  },
};
