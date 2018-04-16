import { appReducer } from '../../src/app/appReducer'
import { updateAppStatus } from '../../src/app/appActions'
import { testReducer } from '../utils/redux'

describe('appReducer', function () {
    it('you can update the status', function () {
        testReducer({
            reducer: appReducer,
            oldState: { status: 'ready' },
            action: updateAppStatus({ newStatus: 'loading' }),
            expectedState: { status: 'loading' },
        })
    })
})
