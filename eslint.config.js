import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// eslint-scope de cette version ne marque pas les identifiants JSX comme
// utilisés. Sans ça, no-unused-vars signale motion, Icon, etc.
const jsxUsesVars = {
  meta: { type: 'problem' },
  create(context) {
    function mark(nameNode) {
      let node = nameNode
      while (node && node.type === 'JSXMemberExpression') node = node.object
      if (node && node.type === 'JSXIdentifier') {
        context.sourceCode.markVariableAsUsed(node.name, node)
      }
    }
    return {
      JSXOpeningElement(node) {
        mark(node.name)
      },
    }
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      local: { rules: { 'jsx-uses-vars': jsxUsesVars } },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'local/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['api/**/*.js', 'server/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
