const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')


module.exports = {
    input: 'main.js',
    output: {
        file: 'bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        nodeResolve({
            jsnext: true,
            extensions: ['.js', '.jsx'],
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('replace'),
        }),
    ],
}
