import { expect } from 'chai'
import ReactDOM from 'react-dom'
import { getFakeWindow } from '../utils/dom'
import { getMockStore } from '../utils/redux'
import { startApp, generateRandomShapes } from '../../src/app/appUtils'
import { updateAppStatus } from '../../src/app/appActions'
import { updateShapeConfiguration } from '../../src/shape/shapeActions'

describe('appUtils', function () {
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

    describe('generateRandomShapes', function () {
        it('triggers updateShapeConfiguration for each side with random values', function () {
            const store = getMockStore({})
            const fakeRandomShape = this.sinon.stub()
            fakeRandomShape
                .onFirstCall().returns('pyramid')
                .onSecondCall().returns('triangularPrism')
            const fakeRandomVolume = this.sinon.stub()
            fakeRandomVolume
                .onFirstCall().returns(31.9)
                .onSecondCall().returns(2.11)
            generateRandomShapes(
                store,
                fakeRandomShape,
                fakeRandomVolume,
            )
            const [firstAction, secondAction] = store.getActions()
            expect(firstAction).to.eql(updateShapeConfiguration({
                side: 'left',
                shape: 'pyramid',
                volume: 31.9,
            }))
        })
    })
})
