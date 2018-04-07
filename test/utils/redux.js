import { expect } from 'chai'
import configureStore from 'redux-mock-store'
import { middleware } from '../../src/store'

export function testReducer({
    oldState,
    expectedState,
    reducer,
    action,
}) {
    expect(reducer(oldState, action)).to.deep.equal(expectedState)
}

export function getMockStore(state) {
    return configureStore(middleware)(state)
}
