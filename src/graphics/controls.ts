import * as THREE from 'three'
import debounce from 'debounce'

const ROTATION_SPEED = 0.06


export class ObjectControls {
    element: Node
    isDragging: boolean
    previousMouseX: number
    previousMouseY: number
    mesh: THREE.Mesh

    constructor(options: { mesh: THREE.Mesh, element: Node }) {
        this.element = options.element
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

    debug = debounce(() => {
        console.log({
            x: this.mesh.rotation.x,
            y: this.mesh.rotation.y,
            z: this.mesh.rotation.z,
        })
    }, 100)

    onMouseMove = (event: MouseEvent ) => {
        if (this.isDragging) {
            const deltaX = event.offsetX - this.previousMouseX
            const deltaY = event.offsetY - this.previousMouseY
            const xAxis = new THREE.Vector3(1, 0, 0)
            const yAxis = new THREE.Vector3(0, 1, 0)
            this.mesh.rotateOnWorldAxis(xAxis, Math.sign(deltaY) * ROTATION_SPEED)
            this.mesh.rotateOnWorldAxis(yAxis,  Math.sign(deltaX) * ROTATION_SPEED)

            this.previousMouseX = event.offsetX
            this.previousMouseY = event.offsetY
            this.debug()
        }
    }

    setUpEventListeners() {
        this.element.addEventListener('mousedown', this.onMouseDown)
        this.element.addEventListener('mouseup', this.onMouseUp)
        this.element.addEventListener('mousemove', this.onMouseMove as EventListener)
    }

    removeEventListeners() {
        this.element.removeEventListener('mousedown', this.onMouseDown)
        this.element.removeEventListener('mouseup', this.onMouseUp)
        this.element.removeEventListener('mousemove', this.onMouseMove as EventListener)
    }
}