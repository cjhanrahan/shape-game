import { expect } from 'chai'
import ReactDOM from 'react-dom'
import { getFakeWindow } from '../utils/dom'
import { getMockStore } from '../utils/redux'
import { startApp } from '../../src/app/appUtils'
import { updateAppStatus } from '../../src/app/appActions'

describe('startApp', function () {
    let fakeWindow
    let eventName
    let handler
    let store

    beforeEach(function () {
        store = getMockStore({})
        this.sinon.stub(ReactDOM, 'render')
        fakeWindow = getFakeWindow(this.sinon)
        startApp(fakeWindow, store);
        [eventName, handler] = fakeWindow.addEventListener.firstCall.args
    })

    it('renders something in the app-container', function () {
        expect(eventName).to.equal('load')
        const appContainer = fakeWindow.document.querySelector('#app-container')
        handler()
        expect(ReactDOM.render.firstCall.args[1]).to.equal(appContainer)
    })

    it('properly updates loading state', function () {
        expect(store.getActions()).to.eql([updateAppStatus('loading')])
        handler()
        expect(store.getActions()).to.eql([
            updateAppStatus('loading'),
            updateAppStatus('ready'),
        ])
    })
})
