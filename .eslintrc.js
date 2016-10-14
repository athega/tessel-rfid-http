module.exports = {
    extends: 'eslint:all',

    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
    },
    env: {
        node: true,
        es6: true,
    },

    rules: {
        'no-console': 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'sort-imports': 'off',
        'padded-blocks': 'off',
    },
};
