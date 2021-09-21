import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import listReducer from './reducers/listReducer'

const rootReducer = combineReducers({
    list: listReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store