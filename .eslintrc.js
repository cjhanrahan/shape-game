module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:import/typescript'],
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'arrow-parens': ['error', 'as-needed'],
        'react/jsx-filename-extension': 'off',
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
        'import/extensions': 'off',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'error',
    },
    env: {
        browser: true,
        mocha: true,
    },
    plugins: [
        'mocha',
    ]
}
