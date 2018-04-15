export const defaultState = {
    leftShapeConfiguration: {
        shape: null,
        volume: null,
    },
    rightShapeConfiguration: {
        shape: null,
        volume: null,
    },
}

export const shapeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_SHAPE_CONFIGURATION': {
            const { side, shape, volume } = action.payload
            const key = `${side}ShapeConfiguration`
            return {
                ...state,
                [key]: { shape, volume },
            }
        }
        default:
            return state
    }
}
