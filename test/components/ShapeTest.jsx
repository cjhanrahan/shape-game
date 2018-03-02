import React from 'react'
import Chai from 'chai'
import { spy } from 'sinon'
import {
    ConeGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    WebGLRenderer,
} from 'three'
import { mount } from '../utils/enzyme'
import { setOffsetDimensions } from '../utils/dom'
import Shape from '../../src/components/Shape'

const { expect } = Chai

describe('Shape', () => {
    let canvas
    let instance
    let geometry
    let material
    let wrapper

    beforeEach(() => {
        canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        setOffsetDimensions(canvas, 400, 600)
        geometry = new ConeGeometry(3, 5)
        material = new MeshBasicMaterial({ color: 0xabab33 })
        // spy(WebGLRenderer.prototype, 'setSize')
        wrapper = mount(
            <Shape
                canvas={canvas}
                geometry={geometry}
                material={material}
            />
        )
        instance = wrapper.instance()
    })

    it('sets up a renderer with the canvas you provide it', () => {
        expect(instance.renderer).to.be.an.instanceof(WebGLRenderer)
        expect(instance.renderer.domElement).to.equal(canvas)
    })

    // it('the renderer has the size of the canvas', () => {
    //     expect(instance.renderer.setSize.called).to.be.true
    // })
    
    it('makes a scene', () => {
        expect(instance.scene).to.be.an.instanceof(Scene)
    })

    it('makes a camera with the proportions of the canvas', () => {
        expect(instance.camera.aspect).to.be.closeTo(400 / 600, 0.1)
    })

    it('adds a mesh with the given geometry/material to the scene', () => {
        expect(instance.mesh.geometry).to.equal(geometry)
        expect(instance.mesh.material).to.equal(material)
        expect(instance.mesh).to.be.an.instanceof(Mesh)
    })

    it('adds the canvas to the dom', () => {
        expect(wrapper.getDOMNode().contains(canvas))
    })

})
