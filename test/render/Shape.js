import { expect } from 'chai'
import { setOffsetDimensions } from '../utils/dom'
import {
    WebGLRenderer,
} from 'three'
import {
    getRenderer,
    getScene,
} from '../../src/render/Shape.js'

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
            // const mesh = 
        })
    })
})
