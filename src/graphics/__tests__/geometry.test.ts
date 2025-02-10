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
        const randomMock = makeRandomMock()
        const width = 3
        const height = 4
        const depth = 2
        randomMock.floatMock
            .mockReturnValueOnce(width)
            .mockReturnValueOnce(height)
            .mockReturnValueOnce(depth)
        const volume = depth * width * height
        const geometry = getShape({
            ...config,
            generator: randomMock,
            type: ShapeType.RECTANGULAR_PRISM,
            volume,
        }) as THREE.BoxGeometry
        expect(geometry.parameters.width).toBe(width)
        expect(geometry.parameters.height).toBe(height)
        expect(geometry.parameters.depth).toBe(depth)
    })

    it('generates sphere geometries', () => {
        const radius = 1
        const volume = (4 / 3) * Math.PI * Math.pow(radius, 3)
        const geometry = getShape({
            ...config,
            type: ShapeType.SPHERE,
            volume,
        }) as THREE.SphereGeometry
        expect(geometry.parameters.radius).toBe(radius)
    })

    it('generates torus geometries', () => {
        const randomMock = makeRandomMock()
        const majorRadius = 4
        const minorRadius = 0.5
        randomMock.floatMock
            .mockReturnValueOnce(majorRadius)
            .mockReturnValueOnce(minorRadius)
        const volume =
            2 * Math.PI * Math.PI * majorRadius * minorRadius * minorRadius
        const geometry = getShape({
            ...config,
            generator: randomMock,
            type: ShapeType.TORUS,
            volume,
        }) as THREE.TorusGeometry
        expect(geometry.parameters.radius).toBe(majorRadius)
        expect(geometry.parameters.tube).toBe(minorRadius)
    })
})
