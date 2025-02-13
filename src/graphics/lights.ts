import * as THREE from 'three'
import { Colors } from './colors'

const LIGHT_DISTANCE = 25
const LIGHT_INTENSITY = 3

export function generateLight(color: number, x: number, y: number, z: number) {
    const light = new THREE.DirectionalLight(color, LIGHT_INTENSITY)
    light.position.set(x, y, z)
    return light
}

export function getLights() {
    const AmbientLight = new THREE.AmbientLight(Colors.LIGHT_YELLOW.hex, 0.5)
    const lights: THREE.Light[] = [
        generateLight(
            Colors.WHITE.hex,
            LIGHT_DISTANCE,
            LIGHT_DISTANCE,
            LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.WHITE.hex,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.LEMON_CHIFFON.hex,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            LIGHT_DISTANCE,
        ),
        generateLight(
            Colors.WHITE.hex,
            LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
            -LIGHT_DISTANCE,
        ),
        AmbientLight,
    ]

    return lights
}
