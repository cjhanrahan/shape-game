import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { WebGLRenderer } from 'three'
import Shape from '../../src/components/Shape'

describe('Shape', () => {
    it('sets up a renderer with the canvas you provide it', () => {
        const canvas = document.createElement('canvas')
        const wrapper = mount(<Shape canvas={canvas} />)
        const { renderer } = wrapper.instance()
        expect(renderer).too.be.an.instanceof(WebGLRenderer)
    })
})
