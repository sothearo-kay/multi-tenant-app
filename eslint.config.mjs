import { createConfigForNuxt } from '@nuxt/eslint-config';

export default createConfigForNuxt()
  .prepend({
    ignores: ['dist', 'node_modules', '.output', '.nuxt']
  })
  .append(
    {
      rules: {
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'quote-props': ['error', 'as-needed'],
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        indent: ['error', 2, { SwitchCase: 1 }]
      }
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 0,
        'vue/no-v-html': 0
      }
    }
  );
