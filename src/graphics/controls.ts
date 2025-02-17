import * as THREE from 'three'
const MOUSE_ROTATION_SPEED = 0.06
const TOUCH_ROTATION_SPEED = 0.07

export const X_AXIS = new THREE.Vector3(1, 0, 0)
export const Y_AXIS = new THREE.Vector3(0, 1, 0)

export class ObjectControls {
    element: Node
    isDragging: boolean
    previousX: number
    previousY: number
    mesh: THREE.Mesh

    constructor(options: { mesh: THREE.Mesh; element: Node }) {
        this.element = options.element
        this.mesh = options.mesh

        this.isDragging = false
        this.previousX = 0
        this.previousY = 0

        this.setUpEventListeners()
    }

    onMouseDown = () => {
        this.isDragging = true
    }

    // works for touch and mouse events
    onDragEnd = () => {
        this.isDragging = false
    }

    onMouseMove = (event: MouseEvent) => {
        if (this.isDragging) {
            const deltaX = event.offsetX - this.previousX
            const deltaY = event.offsetY - this.previousY

            this.mesh.rotateOnWorldAxis(
                X_AXIS,
                Math.sign(deltaY) * MOUSE_ROTATION_SPEED,
            )
            this.mesh.rotateOnWorldAxis(
                Y_AXIS,
                Math.sign(deltaX) * MOUSE_ROTATION_SPEED,
            )

            this.previousX = event.offsetX
            this.previousY = event.offsetY
        }
    }

    onTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
            this.isDragging = true
            this.previousX = event.touches[0].clientX
            this.previousY = event.touches[0].clientY
            event.preventDefault()
        }
    }

    onTouchMove = (event: TouchEvent) => {
        if (this.isDragging && event.touches.length === 1) {
            const deltaX = event.touches[0].clientX - this.previousX
            const deltaY = event.touches[0].clientY - this.previousY

            this.mesh.rotateOnWorldAxis(
                X_AXIS,
                Math.sign(deltaY) * TOUCH_ROTATION_SPEED,
            )
            this.mesh.rotateOnWorldAxis(
                Y_AXIS,
                Math.sign(deltaX) * TOUCH_ROTATION_SPEED,
            )

            this.previousX = event.touches[0].clientX
            this.previousY = event.touches[0].clientY
            event.preventDefault()
        }
    }

    setUpEventListeners() {
        this.element.addEventListener('mousedown', this.onMouseDown)
        this.element.addEventListener('mouseup', this.onDragEnd)
        this.element.addEventListener(
            'mousemove',
            this.onMouseMove as EventListener,
        )
        this.element.addEventListener(
            'touchstart',
            this.onTouchStart as EventListener,
            { passive: false },
        )
        this.element.addEventListener('touchend', this.onDragEnd)
        this.element.addEventListener(
            'touchmove',
            this.onTouchMove as EventListener,
            { passive: false },
        )
    }

    removeEventListeners() {
        this.element.removeEventListener('mousedown', this.onMouseDown)
        this.element.removeEventListener('mouseup', this.onDragEnd)
        this.element.removeEventListener(
            'mousemove',
            this.onMouseMove as EventListener,
        )
        this.element.removeEventListener(
            'touchstart',
            this.onTouchStart as EventListener,
        )
        this.element.removeEventListener('touchend', this.onDragEnd)
        this.element.removeEventListener(
            'touchmove',
            this.onTouchMove as EventListener,
        )
    }
}
