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
                shapeConfigurationsById: {},
            },
            action: updateShapeConfiguration({
                id: 'left',
                shape: 'cone',
                volume: 34.2,
                relativeDimensions: { foo: 12 },
            }),
            expectedState: {
                shapeConfigurationsById: {
                    left: {
                        shape: 'cone',
                        volume: 34.2,
                        relativeDimensions: { foo: 12 },
                    },
                }
            },
        })
    })
})
