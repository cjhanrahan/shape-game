import earcut from 'earcut'
import React from 'react'
import ReactDOM from 'react-dom'
import * as render from './render'
import * as mathScratch from './mathScratch'
import '../styles.css'

// @ts-ignore
window.earcut = earcut

const jsx = (
    <div id="app-container">
        <h1>Volume Game</h1>
        <canvas />
    </div>
)

document.addEventListener('DOMContentLoaded', () => {
    render.main()
    mathScratch.main()
})

ReactDOM.render(jsx, document.getElementById('root'))
