import randomNumber from 'random-number'
import { shapes, volumeRange } from './constants'

export function getRandomShapeDefinition(givenShapes = shapes, randomFunc = randomNumber) {
    const shapesArray = [...givenShapes.values()]
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
