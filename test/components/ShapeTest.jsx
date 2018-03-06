import React from 'react'
import Chai from 'chai'
import {
    ConeGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    WebGLRenderer,
} from 'three'
import { createSandbox } from 'sinon'
import setupTest from '../utils/mocha'
import { mount } from '../utils/enzyme'
import { setOffsetDimensions } from '../utils/dom'
import Shape from '../../src/components/Shape'

const { expect } = Chai
const sandbox = createSandbox()
setupTest()


describe('Shape', () => {
    let canvas
    let instance
    let geometry
    let material
    let wrapper
    let defaultProps

    beforeEach(() => {
        canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        setOffsetDimensions(canvas, 400, 600)
        geometry = new ConeGeometry(3, 5)
        material = new MeshBasicMaterial({ color: 0xabab33 })
        sandbox.spy(window, 'requestAnimationFrame')
        sandbox.spy(Shape.prototype, 'startAnimation')
        sandbox.spy(Shape.prototype, 'onAnimationTick')
        defaultProps = { canvas, geometry, material }
        wrapper = mount(
            <Shape
                canvas={canvas}
                geometry={geometry}
                material={material}
            />
        )
        instance = wrapper.instance()
    })

    afterEach(() => {
        instance.stopAnimation()
        sandbox.restore()
    })

    it('sets up a renderer with the canvas you provide it', () => {
        expect(instance.renderer).to.be.an.instanceof(WebGLRenderer)
        expect(instance.renderer.domElement).to.equal(canvas)
    })

    it('the renderer has the size of the canvas', () => {
        expect(canvas.width).to.equal(400)
        expect(canvas.height).to.equal(600)
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
        expect(wrapper.getDOMNode().contains(canvas)).to.be.true
    })

    it('creates a bound animate function', () => {
        const { boundStartAnimation } = instance
        sandbox.spy(instance.renderer, 'render')
        boundStartAnimation()
        expect(instance.startAnimation.calledOn(instance)).to.be.true
        expect(
            requestAnimationFrame.calledWith(instance.boundStartAnimation)
        ).to.be.true
        expect(instance.onAnimationTick.called).to.be.true
        expect(
            instance.renderer.render.calledWith(instance.scene, instance.camera)
        ).to.be.true
    })


    it('has a stopAnimation function that stops calling requestAnimationFrame', (done) => {
        instance.startAnimation()
        instance.stopAnimation()
        requestAnimationFrame.resetHistory()
        setTimeout(() => {
            expect(requestAnimationFrame.called).to.be.false
            done()
        }, 50)
    })
})
