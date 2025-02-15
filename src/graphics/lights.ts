import * as THREE from 'three'
import { Colors } from './colors'

// const LOW_INTENSITY = 1
// const HIGH_INTENSITY = 3
const LIGHT_DISTANCE = 10

export function generateDirectionalLight(options: {
    x: number
    y: number
    z: number
    intensity: number
}) {
    const light = new THREE.DirectionalLight(
        Colors.WHITE.hex,
        options.intensity,
    )
    light.position.set(options.x, options.y, options.z)
    return light
}

export function getLights() {
    const ambientLight = new THREE.AmbientLight('darkgrey', 5)
    const point1 = new THREE.PointLight(Colors.WHITE.hex, 1000, 100)
    point1.position.set(0, LIGHT_DISTANCE, LIGHT_DISTANCE)
    const point2 = new THREE.PointLight(Colors.WHITE.hex, 1000, 100)
    point2.position.set(0, -LIGHT_DISTANCE, -LIGHT_DISTANCE)
    const lights = [
        // generateDirectionalLight({
        //     x: 0,
        //     y: LIGHT_DISTANCE,
        //     z: LIGHT_DISTANCE,
        //     intensity: HIGH_INTENSITY,
        // }),
        // generateDirectionalLight({
        //     x: 0,
        //     y: -LIGHT_DISTANCE,
        //     z: -LIGHT_DISTANCE,
        //     intensity: HIGH_INTENSITY,
        // }),
        point1,
        point2,
        // generateDirectionalLight({
        //     x: -LIGHT_DISTANCE,
        //     y: LIGHT_DISTANCE,
        //     z: LIGHT_DISTANCE,
        //     intensity: LOW_INTENSITY,
        // }),
        // generateDirectionalLight({
        //     x: LIGHT_DISTANCE,
        //     y: -LIGHT_DISTANCE,
        //     z: -LIGHT_DISTANCE,
        //     intensity: LOW_INTENSITY,
        // }),
        // generateDirectionalLight({
        //     x: LIGHT_DISTANCE,
        //     y: -LIGHT_DISTANCE,
        //     z: LIGHT_DISTANCE,
        //     intensity: LOW_INTENSITY,
        // }),
        // generateDirectionalLight({
        //     x: -LIGHT_DISTANCE,
        //     y: LIGHT_DISTANCE,
        //     z: -LIGHT_DISTANCE,
        //     intensity: LOW_INTENSITY,
        // }),
    ]
    // const helpers = lights.map(
    //     (light) => new THREE.DirectionalLightHelper(light, 5),
    // )
    // lights.push(new THREE.DirectionalLightHelper(lights[0] as any, 5) as any)

    // return [...lights, ...helpers, ambientLight]
    return [...lights, ambientLight]
}
