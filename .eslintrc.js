/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: '@callstack',
  env: {
    es2022: true,
    node: true,
  },
  ignorePatterns: ['**/.eslintrc.cjs', '**/*.config.js', '**/*.config.cjs'],
  reportUnusedDisableDirectives: true,

  parserOptions: {
    project: true,
  },
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/order': [
      'error',
      {
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
          orderImportKind: 'asc',
        },
        'groups': [
          ['builtin', 'external'],
          'internal',
          'parent',
          ['index', 'sibling'],
          'object',
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'expo-*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@app/**',
            group: 'internal',
          },
          {
            pattern: '@env',
            group: 'internal',
          },
        ],
        'distinctGroup': false,
        'pathGroupsExcludedImportTypes': [],
      },
    ],
  },
};
module.exports = config;
