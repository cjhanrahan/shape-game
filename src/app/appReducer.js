export const defaultState = {
    status: 'ready',
}

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_APP_STATUS':
            return {
                ...state,
                status: action.payload.newStatus,
            }
        default:
            return state
    }
}
