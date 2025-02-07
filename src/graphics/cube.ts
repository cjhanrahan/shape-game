import * as THREE from 'three'
import { applyMaterial } from './materials'
import { Config } from '@/app/config'

export function getCube(volume: number) {
    const sideLength = Math.cbrt(volume)
    const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
    const cube = applyMaterial(geometry, Config.materialType)
    return cube
}