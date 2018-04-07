import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { appReducer } from './app/appReducer'

const reducer = combineReducers({
    app: appReducer,
})

export const middleware = [thunk, logger]

export default createStore(
    reducer,
    applyMiddleware(...middleware),
)
