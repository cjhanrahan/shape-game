const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
// Karma configuration
// Generated on Sun Feb 18 2018 14:03:02 GMT-0800 (STD)

// const rollupConfig = {}


module.exports = function (config) {
    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            './src/**/*.jsx',
            './test/**/*.jsx',
        ],


        // list of files / patterns to exclude


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './src/**/*.jsx': ['rollup'],
            './test/**/*.jsx': ['rollup'],
        },

        rollupPreprocessor: {
            plugins: [
                builtins(),
                resolve({
                    extensions: ['.js', '.jsx', '.json'],
                    jsnext: true,
                    preferBuiltins: true,
                }),
                globals(),
                babel({
                    exclude: 'node_modules/**',
                }),
                commonjs({
                    include: 'node_modules/**',
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify('replace'),
                }),
                json(),
            ],
            output: {
                format: 'iife',
                name: 'volume_game',
                sourcemap: true,
            }
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
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: falsPhantomJS,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 3,
    })
}
