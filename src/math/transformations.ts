import * as THREE from 'three'

export const getWorldRotation = (obj: THREE.Object3D) => {
    obj.updateMatrix()
    const quarternion = new THREE.Quaternion()
    obj.getWorldQuaternion(quarternion)

    const rotation = new THREE.Euler()
    rotation.setFromQuaternion(quarternion)

    return rotation
}
