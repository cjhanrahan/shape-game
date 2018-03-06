import { stub, assert } from 'sinon'

export default function setupTest() {
    beforeEach(() => {
        stub(console, 'error')
    })

    afterEach(() => {
        // eslint-disable-next-line no-console
        assert.notCalled(console.error)
        // eslint-disable-next-line no-console
        console.error.restore()
    })
}
