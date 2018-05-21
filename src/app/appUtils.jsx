import {
    allPass,
    contains,
    identity,
    keys,
    pipe,
    sortBy,
} from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import shortid from 'shortid'
import AppContainer from '../app/AppContainer'
import realStore from '../store'
import { updateAppStatus } from '../../src/app/appActions'
import { updateShapeConfiguration } from '../shape/shapeActions'
import {
    getRandomShapeName,
    getRandomVolume,
    getRandomRelativeDimensions,
} from '../../src/app/random'
import { shapeModulesByName } from './constants'


export function renderApp(domNode, store) {
    ReactDOM.render((
        <Provider store={store}>
            <AppContainer />
        </Provider>
    ), domNode)
}

export function generateRandomShapes(
    store = realStore,
    shapesByN = shapeModulesByName,
    getRandomShapeN = getRandomShapeName,
    getRandomV = getRandomVolume,
    getRandomRelativeD = getRandomRelativeDimensions,
    getId = shortid.generate,
) {
    const leftShapeName = getRandomShapeN()
    const leftShapeRelativeDim = getRandomRelativeD(shapesByN[leftShapeName].dimensions)
    const rightShapeName = getRandomShapeN()
    const rightShapeRelativeDim = getRandomRelativeD(shapesByN[rightShapeName].dimensions)
    store.dispatch(updateShapeConfiguration({
        id: getId(),
        shape: leftShapeName,
        volume: getRandomV(),
        relativeDimensions: leftShapeRelativeDim,
    }))
    store.dispatch(updateShapeConfiguration({
        id: getId(),
        shape: rightShapeName,
        volume: getRandomV(),
        relativeDimensions: rightShapeRelativeDim,
    }))
}


export function startApp(
    win = window,
    store = realStore,
    generateRandomS = generateRandomShapes
) {
    generateRandomS()
    store.dispatch(updateAppStatus({ newStatus: 'loading' }))
    win.addEventListener('load', () => {
        renderApp(win.document.getElementById('app-container'), store)
        store.dispatch(updateAppStatus({ newStatus: 'ready' }))
    })
}

export function makeActionCreator(type, payloadArgs) {
    return (obj) => {
        const specifiedKeys = sortBy(identity, payloadArgs)
        const givenKeys = pipe(keys, sortBy(identity))(obj)
        const keysAreAllowed = givenKeys.map(x => contains(x))
        if (!allPass(keysAreAllowed)(specifiedKeys)) {
            throw new Error(
                `Invalid key! Given keys: ${givenKeys} allowed keys: ${specifiedKeys}`
            )
        }
        return { type, payload: obj }
    }
}
