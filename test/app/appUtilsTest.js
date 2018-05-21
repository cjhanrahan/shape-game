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
import setupTest from '../utils/mocha'

describe('appUtils', function () {
    setupTest()

    describe('startApp', function () {
        let fakeWindow
        let eventName
        let handler
        let store
        let generateRandomS

        beforeEach(function () {
            store = getMockStore({})
            this.sinon.stub(ReactDOM, 'render')
            fakeWindow = getFakeWindow(this.sinon)
            generateRandomS = this.sinon.spy()
            startApp(fakeWindow, store, generateRandomS);
            [eventName, handler] = fakeWindow.addEventListener.firstCall.args
        })

        it('renders something in the app-container', function () {
            expect(eventName).to.equal('load')
            const appContainer = fakeWindow.document.querySelector('#app-container')
            handler()
            expect(ReactDOM.render.firstCall.args[1]).to.equal(appContainer)
        })

        it('properly updates loading state', function () {
            expect(store.getActions()).to.deep.include(updateAppStatus({ newStatus: 'loading' }))
            handler()
            expect(store.getActions()).to.have.deep.ordered.members([
                updateAppStatus({ newStatus: 'loading' }),
                updateAppStatus({ newStatus: 'ready' }),
            ])
        })

        it('calls generateRandomShapes', function () {
            this.sinon.assert.called(generateRandomS)
        })
    })

    describe('generateRandomShapes', function () {
        it('generates two random shapes', function () {
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
            const fakeGetId = this.sinon.stub()
            fakeGetId
                .onFirstCall().returns('foo')
                .onSecondCall().returns('bar')
            generateRandomShapes(
                store,
                fakeShapes,
                fakeRandomShape,
                fakeRandomVolume,
                fakeRandomDimensions,
                fakeGetId,
            )
            const expectedActions = [
                updateShapeConfiguration({
                    id: 'foo',
                    shape: 'pyramid',
                    volume: 31.9,
                    relativeDimensions: { baseWidth: 0.64 },
                }),
                updateShapeConfiguration({
                    id: 'bar',
                    shape: 'triangularPrism',
                    volume: 2.11,
                    relativeDimensions: { height: 8.1, baseWidth: 4 },
                })
            ]
            expect(store.getActions()).to.include.deep.members(expectedActions)
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
