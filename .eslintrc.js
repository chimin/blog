module.exports = {
    extends: [
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2017,
        sourceType: "module"
    },
    plugins: [
        '@typescript-eslint',
    ],
    globals: {
        React: "readonly",
    }
}