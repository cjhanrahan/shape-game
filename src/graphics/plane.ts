import * as THREE from 'three'

export function getPlane() {
    const planeGeometry = new THREE.PlaneGeometry(10, 10)
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -0.5
    return plane
}