const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')


module.exports = {
    input: 'main.js',
    output: {
        file: 'bundle.js',
        format: 'iife',
        name: 'volume_game',
        sourcemap: true,
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            extensions: ['.js', '.jsx'],
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('replace'),
        }),
    ],
}
