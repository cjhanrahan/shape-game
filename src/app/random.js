import randomNumber from 'random-number'
import { shapeMap, volumeRange } from './constants'

export function getRandomShapeName(givenShapes = shapeMap, randomFunc = randomNumber) {
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

export function getRandomRelativeDimensions(dimensions, randomFunc = randomNumber) {
    const iterator = (acc, dimension) => {
        const { name, relativeMin, relativeMax } = dimension
        return {
            ...acc,
            [name]: randomFunc({ min: relativeMin, max: relativeMax }),
        }
    }
    return dimensions.slice(1).reduce(iterator, {})
}
