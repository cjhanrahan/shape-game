import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from '../app/AppContainer'
import realStore from '../store'
import { updateAppStatus } from '../../src/app/appActions'
import * as box from '../shape/box'
import * as random from '../../src/app/random'

export const shapes = { box }

export function renderApp(domNode, store) {
    ReactDOM.render((
        <Provider store={store}>
            <AppContainer />
        </Provider>
    ), domNode)
}


export function startApp(win = window, store = realStore) {
    store.dispatch(updateAppStatus('loading'))
    win.addEventListener('load', () => {
        renderApp(win.document.getElementById('app-container'), store)
        store.dispatch(updateAppStatus('ready'))
    })
}

export function generateRandomShapes(store = realStore) {
    store.dispatch(updateAppStatus({
        side: 'left',
        shape: random.getRandomShapeName(),
        volume: random.getRandomVolume(),
    }))
}
