// Karma configuration
// Generated on Sun Feb 18 2018 14:03:02 GMT-0800 (STD)

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')

module.exports = function (config) {
    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        retryLimit: 0,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            // './test/testMain.js',
            {
                pattern: './test/!(utils)/*.@(js|jsx)',
                watched: true,
            }
        ],


        // list of files / patterns to exclude


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/**/*.@(js|jsx)': ['webpack', 'sourcemap'],
        },

        webpack: {
            mode: 'development',
            devtool: 'eval-source-map',
            // target: 'node',
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.html$/,
                        loader: 'raw-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' },
                        ],
                    },
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx'],
            },
            // plugins: [
            //     new webpack.SourceMapDevToolPlugin({
            //         test: /\.jsx?($|\?)/
            //     })
            // ]
            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    test: /\.jsx?/
                })
            ],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromePickDir'],


        customLaunchers: {
            ChromePickDir: {
                base: 'Chrome',
                chromeDataDir: 'C:/Users/conor/AppData/Local/Google/Chrome/User Data',
            },
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: falsPhantomJS,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 3,

        browserConsoleLogOptions: {
            terminal: false,
        },

        mochaReporter: {
            maxLogLines: 80,
            showDiff: true,
        },
    })
}
