const path = require('path')

module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.html$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    devServer: {
        index: 'index.html',
        watchContentBase: true,
        publicPath: '/dist'
    },
}
