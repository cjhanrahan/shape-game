import { BoxBufferGeometry } from 'three'

export const dimensions = [
    { name: 'width' },
    { name: 'height', relativeMin: 0.5, relativeMax: 2 },
    { name: 'depth', relativeMin: 0.5, relativeMax: 2 },
]

export function getAbsoluteDimensions(volume, relativeDimensions) {
    const absoluteWidthCubed = volume / (relativeDimensions.height * relativeDimensions.depth)
    const absoluteWidth = absoluteWidthCubed ** (1 / 3)
    const absoluteHeight = relativeDimensions.height * absoluteWidth
    const absoluteDepth = relativeDimensions.depth * absoluteWidth
    return {
        width: absoluteWidth,
        height: absoluteHeight,
        depth: absoluteDepth,
    }
}

export function getThreeGeometry(absoluteDimensions) {
    const { width, height, depth } = absoluteDimensions
    return new BoxBufferGeometry(width, height, depth)
}
