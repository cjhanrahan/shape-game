import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export enum ControlType { ORBIT, TRACKBALL }

export function getControls(
    camera: THREE.Camera, 
    renderer: THREE.WebGLRenderer, 
    type: ControlType
) {
    switch (type) {
        case ControlType.ORBIT:
            return getOrbitalControls(camera, renderer)
        case ControlType.TRACKBALL:
            return getTrackballControls(camera, renderer)
    }
}

export function getOrbitalControls(
    camera: THREE.Camera, 
    renderer: THREE.WebGLRenderer
) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 2
    controls.enableZoom = false
    // console.log(controls.maxPolarAngle, controls.minPolarAngle)
    // window.controls = controls
    return controls
}

export function getTrackballControls(
    camera: THREE.Camera, 
    renderer: THREE.WebGLRenderer
) {
    const controls = new TrackballControls(camera, renderer.domElement)
    controls.rotateSpeed = 1.0
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    // controls.noZoom = false
    // controls.noPan = false
    // controls.staticMoving = true
    // controls.dynamicDampingFactor = 0.3
    // window.controls = controls
    return controls
} 