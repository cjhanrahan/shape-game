import * as THREE from 'three'
import { describe, it, expect, vi } from 'vitest'
import { MOUSE_ROTATION_SPEED, ObjectControls } from '../controls'
import { getWorldRotation } from '@/math/transformations'

const makeContext = () => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial(),
    )
    // rotate it 90 degrees forward
    // I can ensure it is rotated on world axis
    mesh.setRotationFromEuler(new THREE.Euler(0, Math.PI / 2, 0, 'XYZ'))
    const initialRotation = getWorldRotation(mesh)
    const element = document.createElement('canvas')
    vi.spyOn(element, 'addEventListener')
    vi.spyOn(element, 'removeEventListener')

    const controls = new ObjectControls({ mesh, element })
    return { mesh, element, controls, initialRotation }
}

describe('controls', () => {
    it('properly sets up the initial state', () => {
        const context = makeContext()
        expect(context.controls.element).toBe(context.element)
        expect(context.controls.mesh).toBe(context.mesh)

        expect(context.controls.isDragging).toBe(false)
    })

    it('sets up event listeners on the element on creation', () => {
        const context = makeContext()
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'mousedown',
            context.controls.onMouseDown,
        )
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'mouseup',
            context.controls.onDragEnd,
        )
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'mousemove',
            context.controls.onMouseMove,
        )
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'touchstart',
            context.controls.onTouchStart,
            { passive: false },
        )
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'touchend',
            context.controls.onDragEnd,
        )
        expect(context.element.addEventListener).toHaveBeenCalledWith(
            'touchmove',
            context.controls.onTouchMove,
            { passive: false },
        )
    })

    it('on mousedown, store the offset values on the controls', () => {
        const context = makeContext()
        const event = new MouseEvent('mousedown', {
            clientX: 10,
            clientY: 20,
        })
        context.element.dispatchEvent(event)
        expect(context.controls.previousX).toBe(10)
        expect(context.controls.previousY).toBe(20)
        expect(context.controls.isDragging).toBe(true)
    })

    it('on mouseup or touchend, set isDragging to false', () => {
        const context = makeContext()
        context.controls.isDragging = true
        context.element.dispatchEvent(new MouseEvent('mouseup'))
        expect(context.controls.isDragging).toBe(false)

        context.controls.isDragging = true
        context.element.dispatchEvent(new TouchEvent('touchend'))
        expect(context.controls.isDragging).toBe(false)
    })

    describe.skip('on mouse move', () => {
        it('rotates the mesh on the appropriate axis based on delta', () => {
            const testCases = [
                // {
                //     clientX: 10,
                //     clientY: 20,
                //     expectedRotationX: MOUSE_ROTATION_SPEED,
                //     expectedRotationY: 0,
                // },
                // {
                //     clientX: 10,
                //     clientY: 5,
                //     expectedRotationX: -MOUSE_ROTATION_SPEED,
                //     expectedRotationY: 0,
                // },
                {
                    clientX: 20,
                    clientY: 10,
                    expectedRotationX: 0,
                    expectedRotationY: MOUSE_ROTATION_SPEED,
                },
                // {
                //     clientX: 5,
                //     clientY: 10,
                //     expectedRotationX: 0,
                //     expectedRotationY: -MOUSE_ROTATION_SPEED,
                // },
            ]
            for (const testCase of testCases) {
                const context = makeContext()
                context.controls.isDragging = true
                context.controls.previousX = 10
                context.controls.previousY = 10
                const event = new MouseEvent('mousemove', {
                    clientX: testCase.clientX,
                    clientY: testCase.clientY,
                })
                context.element.dispatchEvent(event)
                const worldRotation = getWorldRotation(context.mesh)
                expect(worldRotation.x - context.initialRotation.x).toBeCloseTo(
                    testCase.expectedRotationX,
                )
                expect(worldRotation.y - context.initialRotation.y).toBeCloseTo(
                    testCase.expectedRotationY,
                )
            }
        })
    })
})
