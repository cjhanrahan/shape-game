import { shapeReducer } from '../../src/shape/shapeReducer'
import { testReducer } from '../utils/redux'
import { updateShapeConfiguration } from '../../src/shape/shapeActions'

describe('shapeReducer', function () {
    it('lets you set shape configurations', function () {
        testReducer({
            reducer: shapeReducer,
            oldState: {
                leftShapeConfiguration: {
                    shape: null,
                    volume: null,
                },
            },
            action: updateShapeConfiguration({
                side: 'left',
                shape: 'cone',
                volume: 34.2
            }),
            expectedState: {
                leftShapeConfiguration: {
                    shape: 'cone',
                    volume: 34.2,
                },
            },
        })
        testReducer({
            reducer: shapeReducer,
            oldState: {
                rightShapeConfiguration: {
                    shape: null,
                    volume: null,
                },
            },
            action: updateShapeConfiguration({
                side: 'right',
                shape: 'sphere',
                volume: 10.3,
            }),
            expectedState: {
                rightShapeConfiguration: {
                    shape: 'sphere',
                    volume: 10.3,
                },
            },
        })
    })
})
