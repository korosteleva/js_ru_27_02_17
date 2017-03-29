import React, { Component, PropTypes } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import ArticlesPage from './ArticlesPage'
import NotFound from './NotFound'
import Filters from './Filters/index'
import CommentsPage from './Comments/page'
import Counter from './Counter'
import Menu, {MenuItem} from './Menu/index'
import {loadAllArticles} from '../AC'

class App extends Component {
    static propTypes = {
    };

    state = {
        text: ''
    }

    componentDidMount() {
        this.props.loadAllArticles()
    }

    render() {
        return (
            <Router>
                <div>
                    Enter your name: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                    <Menu>
                        <MenuItem path="/counter"/>
                        <MenuItem path="/filters"/>
                        <MenuItem path="/articles"/>
                        <MenuItem path="/comments/1"/>
                    </Menu>
                    <Switch>
                        <Route path="/counter" component={Counter} exact />
                        <Route path="/filters" component={Filters} />
                        <Route path="/articles" component={ArticlesPage} />
                        <Route path="/comments/:page" component={CommentsPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }
}

export default connect(null, { loadAllArticles })(App)