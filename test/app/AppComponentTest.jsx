import React from 'react'
import { expect } from 'chai'
import 'mocha-sinon'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'
import App from '../../src/app/AppComponent'
import ShapeWindow from '../../src/shape/ShapeWindowComponent'

describe.only('AppComponent', function () {
    let wrapper

    setupTest()

    beforeEach(function () {
        wrapper = shallow(
            <App
                status="ready"
                shapeIds={['one', 'two', 'three']}
            />
        )
    })

    it('renders a ShapeWindow for all the shape ids', function () {
        expect(wrapper.find('.shape-window[data-id="one"]')).to.have.lengthOf(1)
        expect(wrapper.find('.shape-window[data-id="two"]')).to.have.lengthOf(1)
        expect(wrapper.find('.shape-window[data-id="three"]')).to.have.lengthOf(1)
    })
})
