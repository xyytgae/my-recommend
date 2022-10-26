module.exports = {
  env: {
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    curly: 'off',
    'eol-last': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    indent: 'off',
    '@typescript-eslint/triple-slash-reference': 'off'
  }
}
