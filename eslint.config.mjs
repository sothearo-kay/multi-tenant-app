import withNuxt from './.nuxt/eslint.config.mjs';
import unocss from '@unocss/eslint-config/flat';

export default withNuxt({
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-unused-vars': 'warn'
  }
}).prepend(unocss);
