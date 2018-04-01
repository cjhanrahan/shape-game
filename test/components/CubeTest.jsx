import React from 'react'
import { BoxGeometry } from 'three'
import { expect } from 'chai'
import 'mocha-sinon'
import Shape from '../../src/components/Shape'
import Cube from '../../src/components/Cube'
import { shallow } from '../utils/enzyme'


describe('Cube', function () {
    let wrapper

    beforeEach(function () {
        wrapper = shallow(
            <Cube
                sideLength={500}
                canvas={document.createElement('canvas')}
            />
        )
    })

    it('it\'s geometry is a Box with the given side length', function () {
        const geometry = wrapper.find(Shape).prop('geometry')
        expect(geometry).to.be.an.instanceof(BoxGeometry)
        const { width, height } = geometry.parameters
        expect(width).to.equal(500)
        expect(height).to.equal(500)
    })

    it('has a start animation function', function () {
        // instance.startAnimation()
    })
})
