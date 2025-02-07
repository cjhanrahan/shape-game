import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Config } from '@/app/config'
import { SceneConfig } from './scene'

export enum ControlType { ORBIT, TRACKBALL }


export function getControls(
    config: SceneConfig
) {
    switch (Config.controlType) {
        case ControlType.ORBIT:
            return getOrbitalControls(config)
        case ControlType.TRACKBALL:
            return getTrackballControls(config)
    }
}

export function getOrbitalControls(
    config: SceneConfig
) {
    const controls = new OrbitControls(
        config.camera,
        config.renderer.domElement
    )
    controls.enableDamping = true
    controls.dampingFactor = 2
    controls.enableZoom = false
    return controls
}

export function getTrackballControls(
    config: SceneConfig
) {
    const controls = new TrackballControls(
        config.camera,
        config.renderer.domElement,
    )
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