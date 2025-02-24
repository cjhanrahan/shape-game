import * as THREE from 'three'
import { RandomGenerator } from '@/game/random'

export enum ShapeType {
    CUBE = 'Cube',
    RECTANGULAR_PRISM = 'Rectangular Prism',
    REGULAR_PRISM = 'Regular Prism',
    SPHERE = 'Sphere',
    TORUS = 'Torus',
}

export const allShapes = [
    ShapeType.CUBE,
    ShapeType.RECTANGULAR_PRISM,
    ShapeType.REGULAR_PRISM,
    ShapeType.SPHERE,
    ShapeType.TORUS,
]

export function getRandomSideLength(options: { generator: RandomGenerator }) {
    return options.generator.float(1, 5)
}

export function getShape(options: {
    generator: RandomGenerator
    type: ShapeType
    volume: number
}) {
    switch (options.type) {
        case ShapeType.CUBE:
            return makeCube(options)
        case ShapeType.RECTANGULAR_PRISM:
            return makeRectangularPrism(options)
        case ShapeType.REGULAR_PRISM:
            return makeRegularPrism(options)
        case ShapeType.SPHERE:
            return makeSphere(options)
        case ShapeType.TORUS:
            return makeTorus(options)
    }
}

export function makeCube(options: { volume: number }) {
    const sideLength = Math.cbrt(options.volume)
    const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
    return geometry
}

export function makeRectangularPrism(options: {
    generator: RandomGenerator
    volume: number
}) {
    const sideRatios = [
        getRandomSideLength(options),
        getRandomSideLength(options),
        getRandomSideLength(options),
    ]
    const ratioVolume = sideRatios.reduce((acc, cur) => acc * cur, 1)
    const ratioMultiplier = Math.cbrt(options.volume / ratioVolume)
    const sideLengths = sideRatios.map((side) => side * ratioMultiplier)
    const geometry = new THREE.BoxGeometry(...sideLengths)
    return geometry
}

export function makeRegularPrism(options: {
    generator: RandomGenerator
    volume: number
}) {
    const numOfSides = options.generator.int(3, 8)
    const height = getRandomSideLength(options)
    const radius = getRandomSideLength(options)
    const centralAngle = (2 * Math.PI) / numOfSides

    // value I need to multiple the height and radius by to get the right volume
    const numerator = 2 * options.volume
    const denominator = numOfSides * centralAngle * radius * radius * height
    const sideMultiplier = Math.cbrt(numerator / denominator)

    return new THREE.CylinderGeometry(
        radius * sideMultiplier,
        radius * sideMultiplier,
        height * sideMultiplier,
        numOfSides,
        100,
    )
}

export function makeSphere(options: { volume: number }) {
    const radius = Math.cbrt(options.volume / ((4 / 3) * Math.PI))
    return new THREE.SphereGeometry(radius)
}

export function makeTorus(options: {
    generator: RandomGenerator
    volume: number
}) {
    const majorRadius = getRandomSideLength(options)
    const minorRadius = options.generator.float(0.4, 1)
    const denominator =
        2 * Math.PI * Math.PI * majorRadius * minorRadius * minorRadius
    const multiplier = Math.cbrt(options.volume / denominator)
    return new THREE.TorusGeometry(
        majorRadius * multiplier,
        minorRadius * multiplier,
    )
}
