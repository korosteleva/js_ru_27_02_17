import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer/index'
import middleware from '../middlewares/middleware'

const enhancer = applyMiddleware(middleware)

const store = createStore(reducer, {}, enhancer)

//dev only
window.store = store

export default store