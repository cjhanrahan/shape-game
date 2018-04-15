export function updateShapeConfiguration({ side, shape, volume }) {
    return {
        type: 'UPDATE_SHAPE_CONFIGURATION',
        payload: { side, shape, volume },
    }
}
