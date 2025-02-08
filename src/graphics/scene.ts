import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { Config } from '@/app/config'
import { getPlane } from './plane'
import { getLights } from './lights'
import { getControls } from './controls'
import { getShape, ShapeType } from './geometry'
import { applyMaterial } from './materials'

export interface SceneConfig {
    width: number
    height: number
    type: ShapeType 
    volume: number
}

export interface ThreeJsObjects {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera
}

export function getSceneConfig(
    node: Element, 
    type: ShapeType, 
    volume: number
): SceneConfig {
    const width = node.clientWidth
    const height = node.clientHeight
    return { width, height, type, volume }
}

export function setUpRenderer(config: SceneConfig) {
    const renderer = new THREE.WebGLRenderer({ antialias: Config.antialiasing })
    renderer.setSize(config.width, config.height)
    return renderer
}

export function setUpCamera(config: SceneConfig) {
    const camera = new THREE.PerspectiveCamera(
        75, 
        config.width / config.height, 
        0.1, 
        100000
    )
    camera.position.z = 15
    return camera
}

export function setUpSceneObject(config: SceneConfig) {
    const scene = new THREE.Scene()
    for (const light of getLights()) {
        scene.add(light)
    }
    const geometry = getShape(config.volume, config.type)
    const buffer = applyMaterial(geometry, Config.materialType)
    scene.add(buffer)
    if (Config.plane) {
        scene.add(getPlane())
    }
    return scene
}

export function getThreeJsObjects(config: SceneConfig): ThreeJsObjects {
    const renderer = setUpRenderer(config)
    const camera = setUpCamera(config)
    const scene = setUpSceneObject(config)
    const objects = { renderer, scene, camera }
    return objects
}

export function getAnimateFunction(
    objects: ThreeJsObjects,
    controls: TrackballControls
) {
    return function animate() {
        controls.update()
        objects.renderer.render(objects.scene, objects.camera)
    }
}

export function appendSceneToNode(
    node: Element, 
    type: ShapeType, 
    volume: number
) {
    const config = getSceneConfig(node, type, volume)
    const objects = getThreeJsObjects(config)
    node.appendChild(objects.renderer.domElement)
    const controls = getControls(objects)
    const animateFunction = getAnimateFunction(objects, controls)
    objects.renderer.setAnimationLoop(animateFunction)
}