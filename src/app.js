import React from 'react'
import {render} from 'react-dom'
import AppWrapper from './components/AppWrapper'
import store from './store/index'
import {Provider} from 'react-redux'

render(
    <Provider store={store}>
        <AppWrapper />
    </Provider>
    , document.getElementById('container'))