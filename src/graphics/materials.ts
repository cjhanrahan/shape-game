import * as THREE from 'three'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { 
    LineSegmentsGeometry 
} from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/Addons.js'

export enum MaterialType { GRADIENT, SOLID, WIREFRAME }

export function applyMaterial(
    geometry: THREE.BufferGeometry, 
    type: MaterialType,
    color: number
): THREE.Mesh | THREE.LineSegments {
    switch (type) {
        case MaterialType.SOLID:
            return getSolidMaterial(geometry, color)
        case MaterialType.WIREFRAME:
            return getWireframeMaterial(geometry, color)
        case MaterialType.GRADIENT:
            return getGradientMaterial(geometry, color)
    }
}

export function getSolidMaterial(
    geometry: THREE.BufferGeometry, 
    color: number
) {
    const material = new THREE.MeshBasicMaterial({ color })
    return new THREE.Mesh(geometry, material)
}

export function getGradientMaterial(
    geometry: THREE.BufferGeometry,
    color: number,
) {   
    const material = new THREE.MeshPhongMaterial({ color })
    return new THREE.Mesh(geometry, material)
}

export function getWireframeMaterial(
    geometry: THREE.BufferGeometry, 
    color: number
) {
    const wireframe = new THREE.WireframeGeometry(geometry)
    const segments = new LineSegmentsGeometry()
    const lineSegmentsGeometry = segments.fromWireframeGeometry(wireframe)
    const material = new LineMaterial({ color, linewidth: 300 })
    return new LineSegments2(lineSegmentsGeometry, material)
}