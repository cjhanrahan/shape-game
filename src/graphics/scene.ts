import * as THREE from 'three'
import { getPlane } from './plane'
import { getLights } from './lights'
import { getShape, ShapeType } from './geometry'
import { applyMaterial } from './materials'
import { RandomGenerator } from '@/game/random'
import { getOptions } from '@/game/options'
import { Color } from './colors'
import { ObjectControls } from './controls'

export function setUpRenderer(options: { node: Element }) {
    const renderer = new THREE.WebGLRenderer({
        antialias: getOptions().antialiasing,
    })
    renderer.setSize(options.node.clientWidth, options.node.clientHeight)
    return renderer
}

export function setUpCamera(options: { node: Element }) {
    const { node } = options
    const camera = new THREE.PerspectiveCamera(
        75,
        node.clientWidth / node.clientHeight,
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
    mesh: THREE.Mesh
}) {
    const scene = new THREE.Scene()
    for (const light of getLights()) {
        scene.add(light)
    }

    scene.add(options.mesh)
    if (getOptions().plane) {
        scene.add(getPlane())
    }
    return scene
}

export function getAnimateFunction(options: {
    scene: THREE.Scene
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer
}) {
    return function animate() {
        options.renderer.render(options.scene, options.camera)
    }
}

export function getWindowResizeFunction(options: {
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    node: Element
}) {
    return function onWindowResize() {
        // remove canvas element from the flow so that it doesn't affect
        // the size of the parent element
        const canvasElement = options.renderer.domElement
        canvasElement.style.position = 'absolute'

        // get new size of the parent element after resize
        const { clientWidth, clientHeight } = options.node

        // update threejs camera and renderer
        options.camera.aspect = clientWidth / clientHeight
        options.camera.updateProjectionMatrix()
        options.renderer.setSize(clientWidth, clientHeight)

        // add canvas element back to the flow
        canvasElement.style.position = ''
    }
}

export function appendSceneToNode(options: {
    node: Element
    volume: number
    color: Color
    type: ShapeType
    generator: RandomGenerator
}): () => void {
    const renderer = setUpRenderer(options)
    const camera = setUpCamera(options)
    options.node.appendChild(renderer.domElement)
    // const controls = getControls({ camera, renderer })
    const geometry = getShape(options)
    const mesh = applyMaterial({
        geometry,
        type: getOptions().materialType,
        color: options.color,
    })
    const controls = new ObjectControls({ mesh, element: renderer.domElement })
    const scene = setUpSceneObject({...options, mesh })
    const animateFunction = getAnimateFunction({
        scene,
        camera,
        renderer,
    })
    const onWindowResize = getWindowResizeFunction({
        ...options,
        camera,
        renderer,
    })
    renderer.setAnimationLoop(animateFunction)

    window.addEventListener('resize', onWindowResize, false)
    return () => {
        window.removeEventListener('resize', onWindowResize)
        controls.removeEventListeners()
    }
}
