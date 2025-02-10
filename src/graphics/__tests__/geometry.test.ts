import * as THREE from 'three'
import { describe, it, expect } from 'vitest'
import { getRandomSideLength, getShape, ShapeType } from '../geometry'
import { makeRandomMock } from '@/test-utils/randomMock'
import { SceneConfig } from '../scene'

describe('geometry', () => {
    const config: SceneConfig = {
        color: 0x000000,
        type: ShapeType.CUBE,
        generator: makeRandomMock(),
        volume: 8,
    }
    it('should generate random side lengths', () => {
        const randomMock = makeRandomMock()
        randomMock.floatMock.mockReturnValue(2)
        const sideLength = getRandomSideLength(randomMock)
        expect(randomMock.floatMock).toHaveBeenCalledWith(1, 5)
        expect(sideLength).toBe(2)
    })

    it('generate cube geometries', () => {
        const sideLength = 2
        const volume = Math.pow(sideLength, 3)
        const geometry = getShape({
            ...config,
            type: ShapeType.CUBE,
            volume,
        }) as THREE.BoxGeometry
        expect(geometry.parameters.width).toBe(sideLength)
        expect(geometry.parameters.height).toBe(sideLength)
        expect(geometry.parameters.depth).toBe(sideLength)
    })

    it('generates rectangular prism geometries', () => {
        const length = 2
        const width = 3
        const height = 4
        const volume = length * width * height
        const geometry = getShape({
            ...config,
            type: ShapeType.RECTANGULAR_PRISM,
            volume,
        }) as THREE.BoxGeometry
        expect(geometry.parameters.width).toBe(width)
        expect(geometry.parameters.height).toBe(height)
        expect(geometry.parameters.depth).toBe(length)
    })
})