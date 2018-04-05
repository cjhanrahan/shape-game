import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import appReducer from './app/appReducer'

const reducer = combineReducers({
    app: appReducer,
})

export default createStore(
    reducer,
    applyMiddleware(thunk),
    applyMiddleware(logger),
)
