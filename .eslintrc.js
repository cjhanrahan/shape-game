module.exports = {
    parser: 'babel-eslint',
    extends: "airbnb",
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'func-names': 'off',
        'function-paren-newline': 'off',
        'no-unused-expressions': 'off',
        'comma-dangle': 'off',
        'import/prefer-default-export': 'off',
        'prefer-arrow-callback': 'off',
        'newline-per-chained-call': 'off',
        'no-underscore-dangle': 'off',
        'object-curly-newline': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['karma.conf.js', 'test/**'] }
        ],
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'error',
    },
    env: {
        browser: true,
        mocha: true,
    },
    plugins: [
        'mocha',
    ],
};
