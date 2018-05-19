module.exports = {
    parser: 'babel-eslint',
    extends: "airbnb",
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'func-names': 0,
        'function-paren-newline': 0,
        'no-unused-expressions': 0,
        'comma-dangle': 0,
        'import/prefer-default-export': 0,
        'prefer-arrow-callback': 0,
        'newline-per-chained-call': 0,
        'no-underscore-dangle': 0,
        'object-curly-newline': 0,
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['karma.conf.js', 'test/**'] }
        ],
    },
    env: {
        browser: true,
        mocha: true,
    }
};
