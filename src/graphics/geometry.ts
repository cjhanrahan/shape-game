import * as THREE from 'three'
import random from 'random'


export enum ShapeType {
    CUBE = 'CUBE',
    RECTANGULAR_PRISM = 'RECTANGULAR PRISM',
}

export const allShapes = [
    ShapeType.CUBE,
    ShapeType.RECTANGULAR_PRISM,
]

export function getRandomSideLength() {
    return random.float(1, 5)
}   

export function getShape(volume: number, type: ShapeType) {
    switch (type) {
        case ShapeType.CUBE:
            return makeCube(volume)
        case ShapeType.RECTANGULAR_PRISM:
            return makePrism(volume)
    }
}

export function makeCube(volume: number){
    const sideLength = Math.cbrt(volume)
    const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
    console.log({ sideLength, volume })
    return geometry
}

export function makePrism(volume: number) {
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
