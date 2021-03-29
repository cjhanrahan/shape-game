import React from 'react'
import ReactDOM from 'react-dom'
import * as TutorialShape from './TutorialShape'
import * as mathScratch from './mathScratch'
import '../styles.css'

const jsx = (
    <div id="app-container">
        <h1>Volume Game</h1>
        <canvas />
    </div>
)

document.addEventListener('DOMContentLoaded', () => {
    TutorialShape.main()
    mathScratch.main()
})

ReactDOM.render(jsx, document.getElementById('root'))
