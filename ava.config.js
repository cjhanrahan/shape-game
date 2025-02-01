const config = {
    // babel: {
    //     testOptions: {
    //         presets: ['es2015', 'stage-0', 'react']
    //     },
    // },
    babel: true,
    require: ['./babelRegister.js'],
    typescript: {
        extensions: ['ts', 'tsx'],
        rewritePaths: {
            'src/': 'build/'
        }
    },
}

export default config
