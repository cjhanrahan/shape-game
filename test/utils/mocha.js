import 'mocha-sinon'

function isPropTypeError(warning) {
    return typeof warning === 'string' &&
        warning.indexOf('Warning: Failed prop type:') > -1
}

export default function setupTest() {
    beforeEach(function () {
        this.sinon.stub(console, 'error')
        // eslint-disable-next-line no-console
        console.error.withArgs(isPropTypeError)
            .callsFake((warning) => { throw new ReferenceError(warning) })
        // eslint-disable-next-line no-console
        console.error.callThrough()
    })

    afterEach(function () {
        // eslint-disable-next-line no-console
        this.sinon.assert.notCalled(console.error)
        // eslint-disable-next-line no-console
        console.error.restore()
        // eslint-disable-next-line no-undef
    })
}
