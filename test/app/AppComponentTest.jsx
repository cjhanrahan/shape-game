import React from 'react'
import { expect } from 'chai'
import 'mocha-sinon'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'
// import { getMockStore } from '../utils/redux'
import App from '../../src/app/AppComponent'
import ShapeWindowContainer from '../../src/shape/ShapeWindowContainer'

describe('AppComponent', function () {
    let wrapper

    setupTest()

    beforeEach(function () {
        wrapper = shallow(
            <App
                status="ready"
                shapeIds={['one', 'two', 'three']}
            />,
            // { context: { store: getMockStore({}) } }
        )
    })

    it('renders a ShapeWindow for all the shape ids', function () {
        expect(wrapper.containsMatchingElement(<ShapeWindowContainer shapeId="one" />)).to.be.true
    })
})
