import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  { ignores: ['**/dist/*', '**/node_modules/*'] },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },

    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': ['error', 'windows'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/arrow-spacing': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      'no-console': 0,
      'eqeqeq': 'error'
    }
  }
]