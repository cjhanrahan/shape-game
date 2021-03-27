import React from 'react'
import ReactDOM from 'react-dom'
import * as TutorialShape from './TutorialShape'
import '../styles.css'

const jsx = (
    <div id="app-container">
        <h1>Volume Game</h1>
        <canvas />
    </div>
)

document.addEventListener('DOMContentLoaded', () => {
    TutorialShape.main()
})

ReactDOM.render(jsx, document.getElementById('root'))
