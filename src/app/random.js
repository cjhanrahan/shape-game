import randomNumber from 'random-number'
import { shapes, volumeRange } from './constants'

export function getRandomShapeName(givenShapes = shapes, randomFunc = randomNumber) {
    const shapesArray = [...givenShapes.keys()]
    const index = randomFunc({
        min: 0,
        max: shapesArray.length - 1,
        integer: true
    })
    return shapesArray[index]
}

export function getRandomVolume(
    min = volumeRange.min,
    max = volumeRange.max,
    randomFunc = randomNumber
) {
    return randomFunc({ min, max })
}
