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

export interface ShapeConfig {
    color: Color
    type: ShapeType
    generator: RandomGenerator
    volume: number
}

export interface ThreeJsConfig {
    height: number
    width: number
}

export interface ThreeJsObjects {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera
}

export function setUpRenderer(threeJsConfig: ThreeJsConfig) {
    const renderer = new THREE.WebGLRenderer({
        antialias: getOptions().antialiasing,
    })
    renderer.setSize(threeJsConfig.width, threeJsConfig.height)
    return renderer
}

export function setUpCamera(threeJsConfig: ThreeJsConfig) {
    const camera = new THREE.PerspectiveCamera(
        75,
        threeJsConfig.width / threeJsConfig.height,
        0.1,
        100000,
    )
    camera.position.z = 15
    return camera
}

export function setUpSceneObject(sceneConfig: ShapeConfig) {
    const scene = new THREE.Scene()
    for (const light of getLights()) {
        scene.add(light)
    }
    const geometry = getShape(sceneConfig)
    const buffer = applyMaterial(
        geometry,
        getOptions().materialType,
        sceneConfig.color,
    )
    scene.add(buffer)
    if (getOptions().plane) {
        scene.add(getPlane())
    }
    return scene
}

export function getThreeJsObjects(
    sceneConfig: ShapeConfig,
    threeJsConfig: ThreeJsConfig,
): ThreeJsObjects {
    const renderer = setUpRenderer(threeJsConfig)
    const camera = setUpCamera(threeJsConfig)
    const scene = setUpSceneObject(sceneConfig)
    const objects = { renderer, scene, camera }
    return objects
}

export function getAnimateFunction(
    objects: ThreeJsObjects,
    controls: TrackballControls,
) {
    return function animate() {
        controls.update()
        objects.renderer.render(objects.scene, objects.camera)
    }
}

export function appendSceneToNode(
    sceneConfig: ShapeConfig,
    threeJsConfig: ThreeJsConfig,
    node: Element,
) {
    const objects = getThreeJsObjects(sceneConfig, threeJsConfig)
    node.appendChild(objects.renderer.domElement)
    const controls = getControls(objects)
    const animateFunction = getAnimateFunction(objects, controls)
    objects.renderer.setAnimationLoop(animateFunction)
}
