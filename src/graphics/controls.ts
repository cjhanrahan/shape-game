import * as THREE from 'three'

const ROTATION_SPEED = 0.05

export class ObjectControls {
    window: Window
    isDragging: boolean
    previousMouseX: number
    previousMouseY: number
    mesh: THREE.Mesh

    constructor(options: { window?: Window, mesh: THREE.Mesh }) {
        this.window = options.window || window
        this.mesh = options.mesh

        this.isDragging = false
        this.previousMouseX = 0
        this.previousMouseY = 0

        this.setUpEventListeners()
    }

    onMouseDown = () => {
        this.isDragging = true
    }

    onMouseUp = () => {
        this.isDragging = false
    }

    onMouseMove = (event: MouseEvent) => {
        if (this.isDragging) {
            const deltaX = event.offsetX - this.previousMouseX
            const deltaY = event.offsetY - this.previousMouseY

            this.mesh.rotation.x += Math.sign(deltaY) * ROTATION_SPEED
            this.mesh.rotation.y += Math.sign(deltaX) * ROTATION_SPEED

            this.previousMouseX = event.offsetX
            this.previousMouseY = event.offsetY
        }
    }

    setUpEventListeners() {
        this.window.addEventListener('mousedown', this.onMouseDown)
        this.window.addEventListener('mouseup', this.onMouseUp)
        this.window.addEventListener('mousemove', this.onMouseMove)
    }

    removeEventListeners() {
        this.window.removeEventListener('mousedown', this.onMouseDown)
        this.window.removeEventListener('mouseup', this.onMouseUp)
        this.window.removeEventListener('mousemove', this.onMouseMove)
    }
}