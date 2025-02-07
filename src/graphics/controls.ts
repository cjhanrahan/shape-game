import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { ThreeJsObjects } from './scene'



export function getControls(
    threeJsObjects: ThreeJsObjects,
) {
    const controls = new TrackballControls(
        threeJsObjects.camera,
        threeJsObjects.renderer.domElement,
    )
    controls.rotateSpeed = 6
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    return controls
}
