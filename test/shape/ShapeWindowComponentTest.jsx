import React from 'react'
import { expect } from 'chai'
import {
    CylinderGeometry,
    MeshBasicMaterial,
} from 'three'
import 'mocha-sinon'
import Shape from '../../src/shape/ShapeComponent'
import ShapeWindow from '../../src/shape/ShapeWindowComponent'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'

describe('ShapeWindowComponent', function () {
    let wrapper
    let geometry

    setupTest()

    beforeEach(function () {
        geometry = new CylinderGeometry()
        const shape = (
            <Shape
                canvas={document.createElement('canvas')}
                geometry={geometry}
                material={new MeshBasicMaterial()}
            />
        )
        wrapper = shallow(
            <ShapeWindow
                shape={shape}
                volume={34.9}
            />
        )
    })

    it('renders a Shape and a Volume', function () {
        const shape = wrapper.find(Shape)
        expect(shape.prop('geometry')).to.equal(geometry)
        expect(wrapper.find('.shape-window .volume').text()).to.equal('34.9')
    })
})
