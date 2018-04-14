import { expect } from 'chai'
import { getRandomShapeName, getRandomVolume } from '../../src/app/random'

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
