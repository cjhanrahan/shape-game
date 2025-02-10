import * as THREE from 'three'
import { RandomGenerator } from '@/game/random'
import { SceneConfig } from './scene'

export enum ShapeType {
    CUBE = 'CUBE',
    RECTANGULAR_PRISM = 'RECTANGULAR PRISM',
    REGULAR_PRISM = 'REGULAR PRISM',
    SPHERE = 'SPHERE',
    TORUS = 'TORUS',
}

export const allShapes = [
    ShapeType.CUBE,
    ShapeType.RECTANGULAR_PRISM,
    ShapeType.REGULAR_PRISM,
    ShapeType.SPHERE,
    ShapeType.TORUS,
]

export function getRandomSideLength(generator: RandomGenerator) {
    return generator.float(1, 5)
}

export function getShape(config: SceneConfig) {
    switch (config.type) {
        case ShapeType.CUBE:
            return makeCube(config)
        case ShapeType.RECTANGULAR_PRISM:
            return makeRectangularPrism(config)
        case ShapeType.REGULAR_PRISM:
            return makeRegularPrism(config)
        case ShapeType.SPHERE:
            return makeSphere(config)
        case ShapeType.TORUS:
            return makeTorus(config)
    }
}

export function makeCube(config: SceneConfig) {
    const sideLength = Math.cbrt(config.volume)
    const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
    return geometry
}

export function makeRectangularPrism(config: SceneConfig) {
    const sideRatios = [
        getRandomSideLength(config.generator),
        getRandomSideLength(config.generator),
        getRandomSideLength(config.generator),
    ]
    const ratioVolume = sideRatios.reduce((acc, cur) => acc * cur, 1)
    const ratioMultiplier = Math.cbrt(config.volume / ratioVolume)
    const sideLengths = sideRatios.map((side) => side * ratioMultiplier)
    const geometry = new THREE.BoxGeometry(...sideLengths)
    return geometry
}

export function makeRegularPrism(config: SceneConfig) {
    const numOfSides = config.generator.int(3, 8)
    const height = getRandomSideLength(config.generator)
    const radius = getRandomSideLength(config.generator)
    const centralAngle = (2 * Math.PI) / numOfSides

    // value I need to multiple the height and radius by to get the right volume
    const numerator = 2 * config.volume
    const denominator = numOfSides * centralAngle * radius * radius * height
    const sideMultiplier = Math.cbrt(numerator / denominator)

    return new THREE.CylinderGeometry(
        radius * sideMultiplier,
        radius * sideMultiplier,
        height * sideMultiplier,
        numOfSides,
        1,
    )
}

export function makeSphere(config: SceneConfig) {
    const radius = Math.cbrt(config.volume / ((4 / 3) * Math.PI))
    return new THREE.SphereGeometry(radius)
}

export function makeTorus(config: SceneConfig) {
    const majorRadius = getRandomSideLength(config.generator)
    const minorRadius = config.generator.float(0.25, 3)
    const denominator =
        2 * Math.PI * Math.PI * majorRadius * minorRadius * minorRadius
    const multiplier = Math.cbrt(config.volume / denominator)
    return new THREE.TorusGeometry(
        majorRadius * multiplier,
        minorRadius * multiplier,
    )
}
