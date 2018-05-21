import { expect } from 'chai'
import {
    getRandomShapeName,
    getRandomVolume,
    getRandomRelativeDimensions,
} from '../../src/app/random'
import setupTest from '../utils/mocha'

describe('getRandomShapeName', function () {
    setupTest()

    it('picks a random shape from the shapes object', function () {
        const shapeModulesByName = {
            shape1: {},
            shape2: {},
            shape3: {},
        }

        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 0, max: 2, integer: true }).returns(2)
        const expectedKey = Object.keys(shapeModulesByName).sort()[2]
        expect(getRandomShapeName(shapeModulesByName, randomFunc)).to.equal(expectedKey)
    })
})

describe('getRandomVolume', function () {
    setupTest()

    it('picks a random volume within the range', function () {
        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 10, max: 30 })
            .returns(18.1)
        expect(getRandomVolume(10, 30, randomFunc)).to.equal(18.1)
    })
})

describe('getRandomRelativeDimensions', function () {
    setupTest()

    it('picks random relative dimensions for all dimensions other than the first', function () {
        const testDimensions = [
            { name: 'height' },
            { name: 'topRadius', relativeMin: 0.4, relativeMax: 0.8 },
            { name: 'bottomRadius', relativeMin: 19, relativeMax: 22 },
        ]
        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 0.4, max: 0.8 })
            .returns(0.7)
        randomFunc.withArgs({ min: 19, max: 22 })
            .returns(21.4)
        expect(getRandomRelativeDimensions(testDimensions, randomFunc))
            .to.eql({ topRadius: 0.7, bottomRadius: 21.4 })
    })
})
