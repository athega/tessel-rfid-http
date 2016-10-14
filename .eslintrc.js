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
        'one-var': 'off',
        'sort-imports': 'off',
        'padded-blocks': 'off',
        'no-magic-numbers': 'off',
        'line-comment-position': 'off',
        'no-inline-comments': 'off',
        'max-len': 'off',
        'guard-for-in': 'off',
        'newline-before-return': 'off',
        'sort-keys': 'off',
        'object-property-newline': 'off',
        'quote-props': 'off',
        'no-ternary': 'off',
        'max-statements': 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    },
};
