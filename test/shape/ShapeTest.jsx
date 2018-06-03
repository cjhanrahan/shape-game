import React from 'react'
import { expect } from 'chai'
import {
    ConeGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    WebGLRenderer,
} from 'three'
import 'mocha-sinon'
import setupTest from '../utils/mocha'
import { mount } from '../utils/enzyme'
import { setOffsetDimensions } from '../utils/dom'
import Shape from '../../src/shape/Shape'


describe('ShapeComponent', function () {
    let canvas
    let instance
    let geometry
    let material
    let wrapper

    setupTest()

    beforeEach(function () {
        canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        setOffsetDimensions(canvas, 400, 600)
        geometry = new ConeGeometry(3, 5)
        material = new MeshBasicMaterial({ color: 0xabab33 })
        this.sinon.spy(window, 'requestAnimationFrame')
        this.sinon.spy(Shape.prototype, 'animate')
        this.sinon.spy(Shape.prototype, 'onAnimationTick')
        wrapper = mount(
            <Shape
                canvas={canvas}
                geometry={geometry}
                material={material}
            />
        )
        instance = wrapper.instance()
    })

    afterEach(function () {
        instance.stopAnimation()
    })

    it('sets up a renderer with the canvas you provide it', function () {
        expect(instance.renderer).to.be.an.instanceof(WebGLRenderer)
        expect(instance.renderer.domElement).to.equal(canvas)
    })

    it('the renderer has the size of the canvas', function () {
        expect(canvas.width).to.equal(400)
        expect(canvas.height).to.equal(600)
    })

    it('makes a scene', function () {
        expect(instance.scene).to.be.an.instanceof(Scene)
    })

    it('makes a camera with the proportions of the canvas', function () {
        expect(instance.camera.aspect).to.be.closeTo(400 / 600, 0.1)
    })

    it('the camera is positioned a little closer to the viewer', function () {
        expect(instance.camera.position.z).to.be.above(0)
    })

    it('adds a mesh with the given geometry/material to the scene', function () {
        expect(instance.mesh.geometry).to.equal(geometry)
        expect(instance.mesh.material).to.equal(material)
        expect(instance.mesh).to.be.an.instanceof(Mesh)
    })

    it('adds the canvas to the dom', function () {
        expect(wrapper.getDOMNode().contains(canvas)).to.be.true
    })

    it('creates a bound animate function', function () {
        this.sinon.spy(instance.renderer, 'render')
        instance.startAnimation()
        instance.boundAnimate()
        this.sinon.assert.calledOn(instance.animate, instance)
        this.sinon.assert.calledWith(requestAnimationFrame, instance.boundAnimate)
        this.sinon.assert.called(instance.onAnimationTick)
        this.sinon.assert.calledWith(instance.renderer.render, instance.scene, instance.camera)
    })


    it('has a stopAnimation function that stops calling requestAnimationFrame', function (done) {
        instance.startAnimation()
        instance.stopAnimation()
        requestAnimationFrame.resetHistory()
        setTimeout(() => {
            this.sinon.assert.notCalled(requestAnimationFrame)
            done()
        }, 100)
    })

    it('shows the volume of the shae', function () {

    })
})
