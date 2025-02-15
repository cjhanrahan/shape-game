import * as THREE from 'three'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/Addons.js'
import { ColorObject } from './colors'

export enum MaterialType {
    GRADIENT,
    SOLID,
    WIREFRAME,
}

export function applyMaterial(options: {
    geometry: THREE.BufferGeometry
    type: MaterialType
    color: ColorObject
}): THREE.Mesh | THREE.LineSegments {
    switch (options.type) {
        case MaterialType.SOLID:
            return getSolidMaterial(options)
        case MaterialType.WIREFRAME:
            return getWireframeMaterial(options)
        case MaterialType.GRADIENT:
            return getGradientMaterial(options)
    }
}

export function getSolidMaterial(options: {
    geometry: THREE.BufferGeometry
    color: ColorObject
}) {
    const material = new THREE.MeshBasicMaterial({ color: options.color.hex })
    return new THREE.Mesh(options.geometry, material)
}

export function getGradientMaterial(options: {
    geometry: THREE.BufferGeometry
    color: ColorObject
}) {
    const material = new THREE.MeshPhysicalMaterial({
        color: options.color.hex,
    })
    material.metalness = 0.3
    material.roughness = 0.9
    material.sheen = 0.5
    // material.clearcoatRoughness
    return new THREE.Mesh(options.geometry, material)
}

export function getWireframeMaterial(options: {
    geometry: THREE.BufferGeometry
    color: ColorObject
}) {
    const wireframe = new THREE.WireframeGeometry(options.geometry)
    const segments = new LineSegmentsGeometry()
    const lineSegmentsGeometry = segments.fromWireframeGeometry(wireframe)
    const material = new LineMaterial({
        color: options.color.hex,
        linewidth: 300,
    })
    return new LineSegments2(lineSegmentsGeometry, material)
}
