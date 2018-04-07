import React from 'react'
import ReactDOM from 'react-dom'
import Pyramid from '../components/Pyramid'
import realStore from '../store'
import { updateAppStatus } from '../../src/app/appActions'

export function renderApp(domNode) {
    ReactDOM.render(<Pyramid />, domNode)
}


export function startApp(win = window, store = realStore) {
    store.dispatch(updateAppStatus('loading'))
    win.addEventListener('load', () => {
        renderApp(win.document.getElementById('app-container'))
        store.dispatch(updateAppStatus('ready'))
    })
}
