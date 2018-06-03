const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
                // exclude: /index.html$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    devServer: {
        // index: 'dist/index.html',
        // watchContentBase: true,
        // publicPath: '/dist'
        contentBase: '/dist'
    },
}
