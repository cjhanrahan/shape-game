export function updateAppStatus(newStatus) {
    return {
        type: 'UPDATE_APP_STATUS',
        payload: newStatus,
    }
}
