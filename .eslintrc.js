module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'amd': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'arrow-parens': ['error', 'as-needed'],
        'comma-dangle': ['error', 'always-multiline'],
        'eqeqeq': 'error',
        'key-spacing': 'error',
        'no-multiple-empty-lines': 'error',
        'no-console': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
    },
}
