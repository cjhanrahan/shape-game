import React from 'react'
import ReactDOM from 'react-dom'
import Pyramid from '../components/Pyramid'

export function renderApp(domNode) {
    ReactDOM.render(<Pyramid />, domNode)
}


export function startApp(win = window) {
    win.addEventListener('load', () => {
        renderApp(win.document.getElementById('app-container'))
    })
}
