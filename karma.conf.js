// Karma configuration
// Generated on Sun Feb 18 2018 14:03:02 GMT-0800 (STD)

// const rollupConfig = {}
const path = require('path')

module.exports = function (config) {
    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            './test/testMain.js',
        ],


        // list of files / patterns to exclude


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/testMain.js': ['webpack', 'sourcemap'],
        },

        webpack: {
            // output: {
            //     filename: 'bundle.js',
            //     path: path.resolve(__dirname, 'dist'),
            // },
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx'],
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: falsPhantomJS,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 3,
    })
}
