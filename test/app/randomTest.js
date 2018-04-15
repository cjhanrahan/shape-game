import { expect } from 'chai'
import {
    getRandomShapeName,
    getRandomVolume,
    getRandomRelativeDimensions,
} from '../../src/app/random'

describe('getRandomShapeName', function () {
    it('picks a random shape from the shapes object', function () {
        const shapes = new Map([
            ['shape1', {}],
            ['shape2', {}],
            ['shape3', {}],
        ])
        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 0, max: 2, integer: true }).returns(2)
        expect(getRandomShapeName(shapes, randomFunc)).to.equal('shape3')
    })
})

describe('getRandomVolume', function () {
    it('picks a random volume within the range', function () {
        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 10, max: 30 })
            .returns(18.1)
        expect(getRandomVolume(10, 30, randomFunc)).to.equal(18.1)
    })
})

describe('getRandomRelativeDimensions', function () {
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