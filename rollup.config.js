import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'


export default {
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
