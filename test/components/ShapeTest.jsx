import React from 'react'
import { mount } from 'enzyme'
import Chai from 'chai'
import {
    ConeGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    WebGLRenderer,
} from 'three'
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
        canvas.style.width = 400
        canvas.style.height = 600
        geometry = new ConeGeometry(3, 5)
        material = new MeshBasicMaterial({ color: 0xabab33 })
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
