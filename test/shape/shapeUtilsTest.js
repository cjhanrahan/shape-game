import { expect } from 'chai'
import {
    AmbientLight,
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    SpotLight,
    WebGLRenderer,
} from 'three'
import 'mocha-sinon'
import { setOffsetDimensions } from '../utils/dom'
import {
    getCamera,
    getRenderer,
    getScene,
} from '../../src/shape/ShapeUtils'
import setupTest from '../utils/mocha'

describe('Shape render functions', function () {
    setupTest()

    describe('getRenderer', function () {
        let renderer
        let canvas

        beforeEach(function () {
            canvas = document.createElement('canvas')
            setOffsetDimensions(canvas, 400, 600)
            renderer = getRenderer(canvas)
        })

        it('adjusts the size of the canvas', function () {
            expect(canvas.width).to.equal(400)
            expect(canvas.height).to.equal(600)
        })

        it('returns a renderer', function () {
            expect(renderer).to.be.an.instanceof(WebGLRenderer)
        })
    })

    describe('getScene', function () {
        let scene
        let mesh

        beforeEach(function () {
            const geo = new BoxBufferGeometry(1, 3, 5)
            const material = new MeshBasicMaterial({ color: 0x00ff00 })
            mesh = new Mesh(geo, material)
            scene = getScene(mesh)
        })

        it('returns a scene with the given mesh', function () {
            expect(scene).to.be.an.instanceOf(Scene)
            expect(scene.children).to.include(mesh)
        })

        it('the scene has an AmbientLight and a SpotLight', function () {
            expect(scene.children.some(x => x instanceof AmbientLight))
                .to.equal(true, 'has ambient light')
            expect(scene.children.some(x => x instanceof SpotLight))
                .to.equal(true, 'has spot light')
        })
    })

    describe('getCamera', function () {
        it('returns a camera with the aspect ratio of the canvas', function () {
            const canvas = document.createElement('canvas')
            setOffsetDimensions(canvas, 200, 100)
            const camera = getCamera(canvas)
            expect(camera.aspect).to.equal(2)
        })
    })
})
