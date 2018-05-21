import React from 'react'
import { expect } from 'chai'
import 'mocha-sinon'
import ShapeWindow from '../../src/shape/ShapeWindowComponent'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'

describe('ShapeWindowComponent', function () {
    let wrapper

    setupTest()

    beforeEach(function () {
        const shape = <div className="fake-shape" />
        wrapper = shallow(
            <ShapeWindow
                volume={34.9}
            >
                {shape}
            </ShapeWindow>
        )
    })

    it('renders its shape', function () {
        expect(wrapper.find('.fake-shape')).to.have.lengthOf(1)
    })

    it('adds the volume', function () {
        expect(wrapper.find('.shape-window .volume').text()).to.equal('34.9')
    })
})
