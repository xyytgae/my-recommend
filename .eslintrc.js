module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    // '@nuxtjs/eslint-config-typescript',
    // 'plugin:nuxt/recommended',
    // 'prettier',
    'plugin:vue/vue3-recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    // 'vue/max-attributes-per-line': [
    //   'error',
    //   {
    //     singleline: 5,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false,
    //     },
    //   },
    // ],
  },
}
