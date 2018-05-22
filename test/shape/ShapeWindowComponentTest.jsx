import React from 'react'
import { expect } from 'chai'
import 'mocha-sinon'
import { CylinderGeometry } from 'three'
import ShapeWindow from '../../src/shape/ShapeWindowComponent'
import Shape from '../../src/shape/ShapeComponent'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'

describe('ShapeWindowComponent', function () {
    let wrapper
    let geometry

    setupTest()

    beforeEach(function () {
        geometry = new CylinderGeometry()
        wrapper = shallow(
            <ShapeWindow
                geometry={geometry}
                volume={34.929414141}
            />
        )
    })

    it('renders its shape', function () {
        expect(wrapper.find(Shape).prop('geometry')).to.equal(geometry)
    })

    it('adds the volume a rounded version of the volume', function () {
        expect(wrapper.find('.shape-window .volume').text()).to.equal('34.93')
    })
})
