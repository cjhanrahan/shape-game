import * as THREE from 'three'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { 
    LineSegmentsGeometry 
} from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/Addons.js'
import { Colors } from './colors'

export enum MaterialType { GRADIENT, SOLID, WIREFRAME }

export function applyMaterial(
    geometry: THREE.BufferGeometry, 
    type: MaterialType
): THREE.Mesh | THREE.LineSegments {
    switch (type) {
        case MaterialType.SOLID:
            return getSolidMaterial(geometry)
        case MaterialType.WIREFRAME:
            return getWireframeMaterial(geometry)
        case MaterialType.GRADIENT:
            return getGradientMaterial(geometry)
    }
}

export function getSolidMaterial(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshBasicMaterial({ 
        color: Colors.MEDIUM_SLATE_BLUE 
    })
    return new THREE.Mesh(geometry, material)
}

export function getGradientMaterial(geometry: THREE.BufferGeometry) {   
    const material = new THREE.MeshPhongMaterial({ 
        color: Colors.MEDIUM_SLATE_BLUE, 
    })
    return new THREE.Mesh(geometry, material)
}

export function getWireframeMaterial(geometry: THREE.BufferGeometry) {
    const wireframe = new THREE.WireframeGeometry(geometry)
    const segments = new LineSegmentsGeometry()
    const lineSegmentsGeometry = segments.fromWireframeGeometry(wireframe)
    const material = new LineMaterial({
        color: Colors.MEDIUM_SLATE_BLUE,
        linewidth: 300,
    })
    return new LineSegments2(lineSegmentsGeometry, material)
}