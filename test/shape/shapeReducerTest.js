import { shapeReducer } from '../../src/shape/shapeReducer'
import { testReducer } from '../utils/redux'
import { updateShapeConfiguration } from '../../src/shape/shapeActions'
import setupTest from '../utils/mocha'

describe('shapeReducer', function () {
    setupTest()

    it('lets you set shape configurations', function () {
        testReducer({
            reducer: shapeReducer,
            oldState: {
                leftShapeConfiguration: {
                    shape: null,
                    volume: null,
                    relativeDimensions: null,
                },
            },
            action: updateShapeConfiguration({
                side: 'left',
                shape: 'cone',
                volume: 34.2,
                relativeDimensions: { foo: 12 },
            }),
            expectedState: {
                leftShapeConfiguration: {
                    shape: 'cone',
                    volume: 34.2,
                    relativeDimensions: { foo: 12 },
                },
            },
        })
        testReducer({
            reducer: shapeReducer,
            oldState: {
                rightShapeConfiguration: {
                    shape: null,
                    volume: null,
                    relativeDimensions: null,
                },
            },
            action: updateShapeConfiguration({
                side: 'right',
                shape: 'sphere',
                volume: 10.3,
                relativeDimensions: { bar: 94 },
            }),
            expectedState: {
                rightShapeConfiguration: {
                    shape: 'sphere',
                    volume: 10.3,
                    relativeDimensions: { bar: 94 },
                },
            },
        })
    })
})
