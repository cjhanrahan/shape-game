import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'

export function getControls(options: {
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer
}) {
    const controls = new TrackballControls(
        options.camera,
        options.renderer.domElement,
    )
    controls.rotateSpeed = 6
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    controls.noZoom = true
    return controls
}
