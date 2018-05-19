import React from 'react'
import { expect } from 'chai'
import 'mocha-sinon'
import {
    DodecahedronGeometry,
    OctahedronBufferGeometry,
} from 'three'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'
import App from '../../src/app/AppComponent'
import Shape from '../../src/shape/ShapeComponent'

describe('App', function () {
    let wrapper
    let leftGeometry
    let rightGeometry

    setupTest()

    beforeEach(function () {
        leftGeometry = new DodecahedronGeometry(3)
        rightGeometry = new OctahedronBufferGeometry(2)
        wrapper = shallow(
            <App
                leftGeometry={leftGeometry}
                leftVolume={31.9}
                rightGeometry={rightGeometry}
                rightVolume={99}
                status="ready"
            />
        )
    })

    it('renders the left and right geometries', function () {
        const shapes = wrapper.find(Shape)
        expect(shapes.first().prop('geometry')).to.equal(leftGeometry)
        expect(shapes.at(1).prop('geometry')).to.equal(rightGeometry)
    })
})
