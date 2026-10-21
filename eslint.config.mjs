import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

const config = tseslint.config(
  {
    ignores: ['fancy-master/**', '.next/**', 'node_modules/**', 'docs/**', 'public/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript already enforces both of these.
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  }
)

export default config
