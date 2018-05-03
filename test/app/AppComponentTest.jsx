import React from 'react'
import { expect } from 'chai'
import enzyme from 'enzyme'
import 'mocha-sinon'
import setupTest from '../utils/mocha'
import { shallow } from '../utils/enzyme'
import AppComponent from '../../src/app/AppComponent'

describe('App', function () {
    let wrapper

    setupTest()

    beforeEach(function () {
        wrapper = shallow(
            <AppComponent
            />
        )
    })

    it('renders the left and right geometries', function () {})
})
