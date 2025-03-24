import * as THREE from 'three'
import { throttle } from 'throttle-debounce'
import { RandomGenerator } from '@/game/random'
import { ColorObject } from './colors'
import { getShape, ShapeType } from './geometry'
import { applyMaterial, MaterialType } from './materials'
import { AnswerSide } from '@/game/state'
import { ObjectControls } from './controls'
import { getLights } from './lights'
import { saveGlobal } from '@/util/debug'

export interface DebugData {
    rotationX: number
    rotationY: number
    rotationZ: number
}

export class SceneManager {
    // from constructor
    side: AnswerSide
    node: Element
    volume: number
    color: ColorObject
    type: ShapeType
    generator: RandomGenerator
    materialType: MaterialType
    debugFunction: (debug: DebugData) => void

    // created by class
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    geometry: THREE.BufferGeometry
    mesh: THREE.Mesh
    controls: ObjectControls
    scene: THREE.Scene
    throttledDebug: (debug: DebugData) => void

    constructor(options: {
        node: Element
        volume: number
        color: ColorObject
        type: ShapeType
        generator: RandomGenerator
        materialType: MaterialType
        side: AnswerSide
        debugFunction: (debug: DebugData) => void
    }) {
        this.side = options.side
        this.node = options.node
        this.volume = options.volume
        this.color = options.color
        this.type = options.type
        this.generator = options.generator
        this.materialType = options.materialType
        this.debugFunction = options.debugFunction

        saveGlobal(this.side, this)
        this.renderer = this.getRenderer()
        this.camera = this.setUpCamera()
        this.geometry = getShape({
            generator: this.generator,
            type: this.type,
            volume: this.volume,
        })
        this.mesh = applyMaterial({
            color: this.color,
            geometry: this.geometry,
            type: this.materialType,
        })
        this.controls = new ObjectControls({
            mesh: this.mesh,
            element: this.renderer.domElement,
        })
        this.scene = this.getSceneObject()
        this.throttledDebug = throttle(250, this.debugFunction)
        this.setUpScene()
    }

    getRenderer() {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        })
        renderer.setSize(this.node.clientWidth, this.node.clientHeight)
        return renderer
    }

    setUpCamera() {
        const camera = new THREE.PerspectiveCamera(
            75,
            this.node.clientWidth / this.node.clientHeight,
            0.1,
            100000,
        )
        camera.position.z = 15
        return camera
    }

    getSceneObject() {
        const scene = new THREE.Scene()
        for (const light of getLights()) {
            scene.add(light)
        }

        scene.add(this.mesh)
        return scene
    }

    setUpScene() {
        this.node.appendChild(this.renderer.domElement)
        this.renderer.setAnimationLoop(this.animateFunction)
        window.addEventListener('resize', this.onWindowResize)
    }

    cleanUpScene = () => {
        window.removeEventListener('resize', this.onWindowResize)
        this.renderer.dispose()
        this.controls.removeEventListeners()
    }

    animateFunction = () => {
        this.renderer.render(this.scene, this.camera)
        this.throttledDebug(this.getDebugInfo())
    }

    onWindowResize = () => {
        const canvasElement = this.renderer.domElement
        canvasElement.style.position = 'absolute'

        // get new size of the parent element after resize
        const { clientWidth, clientHeight } = this.node

        // update threejs camera and renderer
        this.camera.aspect = clientWidth / clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(clientWidth, clientHeight)

        // add canvas element back to the flow
        canvasElement.style.position = ''
    }

    getDebugInfo = (): DebugData => {
        return {
            rotationX: this.mesh.rotation.x,
            rotationY: this.mesh.rotation.y,
            rotationZ: this.mesh.rotation.z,
        }
    }
}
