import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { getPlane } from './plane'
import { getLights } from './lights'
import { getControls } from './controls'
import { getShape, ShapeType } from './geometry'
import { applyMaterial } from './materials'
import { RandomGenerator } from '@/game/random'
import { getOptions } from '@/game/options'
import { Color } from './colors'

export function setUpRenderer(options: { width: number; height: number }) {
    const renderer = new THREE.WebGLRenderer({
        antialias: getOptions().antialiasing,
    })
    renderer.setSize(options.width, options.height)
    return renderer
}

export function setUpCamera(options: { width: number; height: number }) {
    const camera = new THREE.PerspectiveCamera(
        75,
        options.width / options.height,
        0.1,
        100000,
    )
    camera.position.z = 15
    return camera
}

export function setUpSceneObject(options: {
    color: Color
    type: ShapeType
    generator: RandomGenerator
    volume: number
}) {
    const scene = new THREE.Scene()
    for (const light of getLights()) {
        scene.add(light)
    }
    const geometry = getShape(options)
    const buffer = applyMaterial({
        geometry,
        type: getOptions().materialType,
        color: options.color,
    })
    scene.add(buffer)
    if (getOptions().plane) {
        scene.add(getPlane())
    }
    return scene
}

export function getAnimateFunction(options: {
    scene: THREE.Scene
    camera: THREE.Camera
    controls: TrackballControls
    renderer: THREE.WebGLRenderer
}) {
    return function animate() {
        options.controls.update()
        options.renderer.render(options.scene, options.camera)
    }
}

export function appendSceneToNode(options: {
    node: Element
    width: number
    height: number
    volume: number
    color: Color
    type: ShapeType
    generator: RandomGenerator
}) {
    const renderer = setUpRenderer(options)
    const camera = setUpCamera(options)
    options.node.appendChild(renderer.domElement)
    const controls = getControls({ camera, renderer })
    const scene = setUpSceneObject(options)
    const animateFunction = getAnimateFunction({
        scene,
        camera,
        controls,
        renderer,
    })
    renderer.setAnimationLoop(animateFunction)
}
