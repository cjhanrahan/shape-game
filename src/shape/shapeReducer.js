export const defaultState = {
    shapeConfigurationsById: {},
}

export const shapeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_SHAPE_CONFIGURATION': {
            const {
                id,
                shape,
                volume,
                relativeDimensions,
            } = action.payload
            return {
                shapeConfigurationsById: {
                    ...state.shapeConfigurationsById,
                    [id]: { shape, volume, relativeDimensions },
                }
            }
        }
        default:
            return state
    }
}
