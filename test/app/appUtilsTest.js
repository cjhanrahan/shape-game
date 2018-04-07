import { expect } from 'chai'
import ReactDOM from 'react-dom'
import { getFakeWindow } from '../utils/dom'
import { startApp } from '../../src/app/appUtils'

describe('startApp', function () {
    it('renders something in the app-container', function () {
        this.sinon.stub(ReactDOM, 'render')
        const fakeWindow = getFakeWindow(this.sinon)
        startApp(fakeWindow)
        const [eventName, handler] = fakeWindow.addEventListener.firstCall.args
        expect(eventName).to.equal('load')
        const appContainer = fakeWindow.document.querySelector('#app-container')
        handler()
        expect(ReactDOM.render.firstCall.args[1]).to.equal(appContainer)
    })
})
