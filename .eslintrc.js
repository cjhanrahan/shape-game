module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:import/typescript'],
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        'comma-dangle': 'off',
        'func-names': 'off',
        'function-paren-newline': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['karma.conf.js', 'test/**'] }
        ],
        'import/prefer-default-export': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'error',
        'newline-per-chained-call': 'off',
        'no-new': 'off',
        'no-unused-expressions': 'off',
        'no-underscore-dangle': 'off',
        'object-curly-newline': 'off',
        'prefer-arrow-callback': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        semi: ['error', 'never'],
    },
    env: {
        browser: true,
        mocha: true,
    },
    plugins: [
        'mocha',
    ]
}
