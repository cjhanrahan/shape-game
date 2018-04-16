import { expect } from 'chai'
import ReactDOM from 'react-dom'
import { getFakeWindow } from '../utils/dom'
import { getMockStore } from '../utils/redux'
import {
    startApp,
    generateRandomShapes,
    makeActionCreator,
} from '../../src/app/appUtils'
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
            expect(store.getActions()).to.eql([updateAppStatus({ newStatus: 'loading' })])
            handler()
            expect(store.getActions()).to.eql([
                updateAppStatus({ newStatus: 'loading' }),
                updateAppStatus({ newStatus: 'ready' }),
            ])
        })
    })

    describe('generateRandomShapes', function () {
        it('triggers updateShapeConfiguration for each side with random values', function () {
            const store = getMockStore({})
            const fakeShapes = {
                pyramid: {
                    dimensions: [
                        { name: 'height' },
                        { name: 'baseWidth', relativeMin: 0.4, relativeMax: 0.8 },
                    ]
                },
                triangularPrism: {
                    dimensions: [
                        { name: 'length' },
                        { name: 'height', relativeMin: 4, relativeMax: 9 },
                        { name: 'baseWidth', relativeMin: 3, relativeMax: 11 },
                    ],
                }
            }
            const fakeRandomShape = this.sinon.stub()
            fakeRandomShape
                .onFirstCall().returns('pyramid')
                .onSecondCall().returns('triangularPrism')
            const fakeRandomVolume = this.sinon.stub()
            fakeRandomVolume
                .onFirstCall().returns(31.9)
                .onSecondCall().returns(2.11)
            const fakeRandomDimensions = this.sinon.stub()
            fakeRandomDimensions
                .withArgs(fakeShapes.pyramid.dimensions)
                .returns({ baseWidth: 0.64 })
            fakeRandomDimensions
                .withArgs(fakeShapes.triangularPrism.dimensions)
                .returns({ height: 8.1, baseWidth: 4 })
            generateRandomShapes(
                store,
                fakeShapes,
                fakeRandomShape,
                fakeRandomVolume,
                fakeRandomDimensions,
            )
            const [firstAction, secondAction] = store.getActions()
            expect(firstAction).to.eql(updateShapeConfiguration({
                side: 'left',
                shape: 'pyramid',
                volume: 31.9,
                relativeDimensions: { baseWidth: 0.64 },
            }))
            expect(secondAction).to.eql(updateShapeConfiguration({
                side: 'right',
                shape: 'triangularPrism',
                volume: 2.11,
                relativeDimensions: { height: 8.1, baseWidth: 4 },
            }))
        })
    })

    describe('makeActionCreator', function () {
        let actionCreator

        beforeEach(function () {
            actionCreator = makeActionCreator(
                'DO_STUFF',
                ['cat', 'dog']
            )
        })

        it('returns an action with the type name and payload', function () {
            expect(actionCreator({ cat: 3, dog: 4 })).to.eql({
                type: 'DO_STUFF',
                payload: { cat: 3, dog: 4 }
            })
        })

        it('throws an error for invalid arguments', function () {
            expect(() => actionCreator({ cat: 3, dog: 4, gerbil: 9 })).to.throw()
        })
    })
})
