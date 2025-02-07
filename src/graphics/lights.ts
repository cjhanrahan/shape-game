import * as THREE from 'three'
import { Colors } from './colors'

const LIGHT_DISTANCE = 25
const LIGHT_INTENSITY = 5

export function generateLight(
    color: number, 
    x: number, 
    y: number, 
    z: number
) {
    const light = new THREE.DirectionalLight(color, LIGHT_INTENSITY)
    light.position.set(x, y, z)
    return light
}

export function getLights() {
    const lights: THREE.Light[] = [
        generateLight(
            Colors.WHITE,
            LIGHT_DISTANCE,
            LIGHT_DISTANCE,
            LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.BISQUE,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.LEMON_CHIFFON,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.LIGHT_SKY_BLUE,
            LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
        ),
    ]

    return lights
}