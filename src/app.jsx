import React from 'react'
import ReactDOM from 'react-dom'
import Pyramid from './components/Pyramid'

export function renderApp(domNode) {
    ReactDOM.render(<Pyramid />, domNode)
}

export function startApp() {
    window.onload = () => {
        renderApp(document.getElementById('app-container'))
    }
}
