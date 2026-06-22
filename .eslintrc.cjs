module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.json' }
    }
  },
  plugins: ['@typescript-eslint', 'import', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  rules: {
    // Match the laut-frontend conventions the candidate will see in the real repo.
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'import/no-default-export': 'error',
    'import/no-cycle': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: { 'import/no-default-export': 'off' }
    }
  ],
  ignorePatterns: ['dist', 'node_modules', 'coverage']
}
