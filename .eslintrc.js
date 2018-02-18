module.exports = {
    parser: 'babel-eslint',
    extends: "airbnb",
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'func-names': 0,
    },
    env: {
        browser: true,
        mocha: true,
    }
};
