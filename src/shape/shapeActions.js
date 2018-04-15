export function updateShapeConfiguration({ side, shape, volume, relativeDimensions }) {
    return {
        type: 'UPDATE_SHAPE_CONFIGURATION',
        payload: { side, shape, volume, relativeDimensions },
    }
}
