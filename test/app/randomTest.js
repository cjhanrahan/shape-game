import { expect } from 'chai'
import { getRandomShapeDefinition, getRandomVolume } from '../../src/app/random'

describe('getRandomShapeDefinition', function () {
    it('picks a random shape from the shapes object', function () {
        const shapes = new Map([
            ['shape1', { name: 'shape1' }],
            ['shape2', { name: 'shape2' }],
            ['shape3', { name: 'shape3' }],
        ])
        const randomFunc = this.sinon.stub()
        randomFunc.withArgs({ min: 0, max: 2, integer: true }).returns(2)
        expect(getRandomShapeDefinition(shapes, randomFunc)).to.equal(shapes.get('shape3'))
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
