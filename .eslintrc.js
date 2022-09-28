module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:vue/vue3-recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
