'use client'

import * as THREE from 'three'
import { applyMaterial, MaterialType } from './materials'
import { ControlType, getControls } from './controls'
import { getPlane } from './plane'
import { Config } from '@/app/config'

export function getRendererNode() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    )
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ antialias: Config.antialiasing })
    const geometry = new THREE.BoxGeometry()
    const cube = applyMaterial(geometry, MaterialType.WIREFRAME)
    scene.add(cube)
    

    scene.add(getPlane())
    
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    light.castShadow = true
    scene.add(light)
    
    const controls = getControls(camera, renderer, Config.controlType)

    function animate() {
        if (Config.controlType === ControlType.TRACKBALL) {
            // controls.update()
        }
        controls.update()
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
    renderer.setSize(window.innerWidth, window.innerHeight)

    return renderer.domElement
}