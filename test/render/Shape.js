import { expect } from 'chai'
import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    WebGLRenderer,
} from 'three'
import { setOffsetDimensions } from '../utils/dom'
import {
    // getCamera,
    getRenderer,
    getScene,
} from '../../src/render/Shape'

describe('Shape render functions', () => {
    describe('getRenderer', () => {
        let renderer
        let canvas

        beforeEach(() => {
            canvas = document.createElement('canvas')
            setOffsetDimensions(canvas, 400, 600)
            renderer = getRenderer(canvas)
        })

        it('adjusts the size of the canvas', () => {
            expect(canvas.width).to.equal(400)
            expect(canvas.height).to.equal(400)
        })

        it('returns a renderer', () => {
            expect(renderer).to.be.an.instanceof(WebGLRenderer)
        })
    })

    describe('getScene', () => {
        it('returns a scene with the given mesh', () => {
            const geo = new BoxBufferGeometry(1, 3, 5)
            const material = new MeshBasicMaterial({ color: 0x00ff00 })
            const mesh = new Mesh(geo, material)
            const scene = getScene(mesh)
            expect(scene).to.be.an.instanceOf(Scene)
            expect(scene.children).to.include(mesh)
        })
    })

    // describe('getCamera', () => {
    //     it('returns a camera with the aspect ratio of the canvas', () => {
    //         const canvas = document.createElement('canvas')
    //         setOffsetDimensions(canvas, 200, 100)
    //         const camera = getCamera(canvas)
    //         expect(camera.aspect).to.equal(2)
    //     })
    // })
})
