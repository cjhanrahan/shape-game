import * as THREE from 'three'

THREE.ColorManagement.enabled = true

export function getPlane() {
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 'red' })
    planeMaterial.side = THREE.DoubleSide
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.castShadow = true
    plane.receiveShadow = true
    // plane.dou
    plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -5
    return plane
}
