import * as THREE from 'three'
import random from 'random'


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

export function getRandomSideLength() {
    return random.float(1, 5)
}   

export function getShape(volume: number, type: ShapeType) {
    switch (type) {
        case ShapeType.CUBE:
            return makeCube(volume)
        case ShapeType.RECTANGULAR_PRISM:
            return makeRectangularPrism(volume)
        case ShapeType.REGULAR_PRISM:
            return makeRegularPrism(volume)
        case ShapeType.SPHERE:
            return makeSphere(volume)
        case ShapeType.TORUS:
            return makeTorus(volume)
    }
}

export function makeCube(volume: number){
    const sideLength = Math.cbrt(volume)
    const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
    console.log({ sideLength, volume })
    return geometry
}

export function makeRectangularPrism(volume: number) {
    const sideRatios = [
        getRandomSideLength(),
        getRandomSideLength(),
        getRandomSideLength()
    ]
    const ratioVolume = sideRatios.reduce((acc, cur) => acc * cur, 1)
    const ratioMultiplier = Math.cbrt(volume / ratioVolume)
    const sideLengths = sideRatios.map(side => side * ratioMultiplier)
    console.log({
        volume, sideRatios, ratioVolume, ratioMultiplier, sideLengths
    })
    const geometry = new THREE.BoxGeometry(...sideLengths)
    return geometry
}

export function makeRegularPrism(volume: number) {
    const numOfSides = random.int(3, 8)
    const height = getRandomSideLength()
    const radius = getRandomSideLength()
    const centralAngle = (2 * Math.PI) / numOfSides
    
    // value I need to multiple the height and radius by to get the right volume
    const numerator = 2 * volume
    const denominator = numOfSides * centralAngle * radius * radius * height
    const sideMultiplier = Math.cbrt(numerator / denominator)

    console.log({
        volume,
        numOfSides,
        height,
        radius,
        centralAngle,
        numerator,
        denominator,
        sideMultiplier,
    })
    return new THREE.CylinderGeometry(
        radius * sideMultiplier,
        radius * sideMultiplier,
        height * sideMultiplier,
        numOfSides,
        1
    )
}

export function makeSphere(volume: number) {
    const radius = Math.cbrt(volume / (4/3 * Math.PI))
    return new THREE.SphereGeometry(radius)
}

export function makeTorus(volume: number){
    const majorRadius = getRandomSideLength()
    const minorRadius = random.float(0.25, 3)
    const multiplier = Math.cbrt(
        volume / (2 * Math.PI * Math.PI * majorRadius * minorRadius)
    )
    return new THREE.TorusGeometry(
        majorRadius * multiplier,
        minorRadius * multiplier
    )
}