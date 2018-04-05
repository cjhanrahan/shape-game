import { expect } from 'chai'

export function testReducer({
    oldState,
    expectedState,
    reducer,
    action,
}) {
    expect(reducer(oldState, action)).to.deep.equal(expectedState)
}
