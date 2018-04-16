import { makeActionCreator } from './appUtils'

export const updateAppStatus = makeActionCreator(
    'UPDATE_APP_STATUS',
    ['newStatus'],
)
