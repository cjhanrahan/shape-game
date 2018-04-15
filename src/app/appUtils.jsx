import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from '../app/AppContainer'
import realStore from '../store'
import { updateAppStatus } from '../../src/app/appActions'
import { updateShapeConfiguration } from '../shape/shapeActions'
import * as box from '../shape/box'
import {
    getRandomShapeName,
    getRandomVolume,
    getRandomRelativeDimensions,
} from '../../src/app/random'

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

export function generateRandomShapes(
    store = realStore,
    shapez = shapes,
    getRandomShapeN = getRandomShapeName,
    getRandomV = getRandomVolume,
    getRandomRelativeD = getRandomRelativeDimensions,
) {
    const leftShapeName = getRandomShapeN()
    const leftShapeRelativeDim = getRandomRelativeD(shapez[leftShapeName].dimensions)
    const rightShapeName = getRandomShapeN()
    const rightShapeRelativeDim = getRandomRelativeD(shapez[rightShapeName].dimensions)
    store.dispatch(updateShapeConfiguration({
        side: 'left',
        shape: leftShapeName,
        volume: getRandomV(),
        relativeDimensions: leftShapeRelativeDim,
    }))
    store.dispatch(updateShapeConfiguration({
        side: 'right',
        shape: rightShapeName,
        volume: getRandomV(),
        relativeDimensions: rightShapeRelativeDim,
    }))
}
