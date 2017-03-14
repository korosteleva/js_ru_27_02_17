import {combineReducers} from 'redux'
import articleReducer from './articles'
import counterReducer from './counter'
import filtersReducer from './filters'


export default combineReducers({
    articles: articleReducer,
    count: counterReducer,
    filters: filtersReducer
})