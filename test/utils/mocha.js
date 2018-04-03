import 'mocha-sinon'

export default function setupTest() {
    beforeEach(function () {
        this.sinon.stub(console, 'error')
    })

    afterEach(function () {
        // eslint-disable-next-line no-console
        this.sinon.assert.notCalled(console.error)
        // eslint-disable-next-line no-console
        console.error.restore()
    })
}
