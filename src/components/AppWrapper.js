import React, { Component, PropTypes } from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {connect} from 'react-redux'
import history from '../history'
import App from './App';

class AppWrapper extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Switch>
                        <Route path="/:location" component={App} />
                        <Redirect from="" to="en" />
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }
}

export default connect(null, { })(AppWrapper)