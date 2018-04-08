import { expect } from 'chai'
import {
    getAbsoluteDimensions,
    getThreeGeometry,
} from '../../src/shape/box'

describe('getAbsoluteDimensions', function () {
    it('given a volume and relative height/depth, it returns the correct dimensions', function () {
        const relativeDimensions1 = { height: 5, depth: 1.25 }
        const absoluteDimensions1 = getAbsoluteDimensions(400, relativeDimensions1)
        expect(absoluteDimensions1.width).to.be.approximately(4, 0.01)
        expect(absoluteDimensions1.height).to.be.approximately(20, 0.01)
        expect(absoluteDimensions1.depth).to.be.approximately(5, 0.01)
        const relativeDimensions2 = { height: 1.5, depth: 2 }
        const absoluteDimensions2 = getAbsoluteDimensions(192, relativeDimensions2)
        expect(absoluteDimensions2.width).to.be.approximately(4, 0.01)
        expect(absoluteDimensions2.height).to.be.approximately(6, 0.01)
        expect(absoluteDimensions2.depth).to.be.approximately(8, 0.01)
    })
})

describe('getThreeGeometry', function () {
    it('return a three.js shape with the right dimensions', function () {
        const absoluteDimensions = { width: 4, height: 9, depth: 13 }
        const box = getThreeGeometry(absoluteDimensions)
        expect(box.parameters).to.include(absoluteDimensions)
    })
})
