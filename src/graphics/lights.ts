import * as THREE from 'three'
import { Colors } from './colors'

const LIGHT_DISTANCE = 10

export function getLights() {
    const ambientLight = new THREE.AmbientLight('white', 1.5)
    const point1 = new THREE.PointLight(Colors.WHITE.hex, 1000, 100)
    point1.position.set(LIGHT_DISTANCE, LIGHT_DISTANCE, LIGHT_DISTANCE)
    const point2 = new THREE.PointLight(Colors.WHITE.hex, 1000, 100)
    point2.position.set(-LIGHT_DISTANCE, -LIGHT_DISTANCE, -LIGHT_DISTANCE)
    const lights = [point1, point2, ambientLight]
    return lights
}
