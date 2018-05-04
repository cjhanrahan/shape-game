export const defaultState = {
    leftShapeConfiguration: {
        shape: null,
        volume: null,
        relativeDimensions: null,
    },
    rightShapeConfiguration: {
        shape: null,
        volume: null,
        relativeDimensions: null,
    },
}

export const shapeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_SHAPE_CONFIGURATION': {
            const {
                side,
                shape,
                volume,
                relativeDimensions,
            } = action.payload
            const key = `${side}ShapeConfiguration`
            return {
                ...state,
                [key]: { shape, volume, relativeDimensions },
            }
        }
        default:
            return state
    }
}
