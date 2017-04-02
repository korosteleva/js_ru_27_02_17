import React, { Component, PropTypes } from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import ArticlesPage from './ArticlesPage'
import NotFound from './NotFound'
import Filters from './Filters/index'
import Counter from './Counter'
import CommentsPage from './CommentsPage'
import Menu, {MenuItem} from './Menu/index'
import {loadAllArticles} from '../AC'
import dictionary from '../dictionary';

const LOCATIONS = ['ru', 'en'];

class App extends Component {
    static propTypes = {
        location: PropTypes.string
    };

    static defaultProps = {
        location: 'en'
    };

    static childContextTypes = {
        user: PropTypes.string,
        location: PropTypes.oneOf(LOCATIONS),
        dictionary: PropTypes.object
    };

    state = {
        text: ''
    };

    getChildContext() {
        return {
            user: this.state.text,
            location: this.props.location,
            dictionary: dictionary[this.props.location]
        }
    }

    constructor(props) {
        super(props);

        if (!LOCATIONS.includes(props.location)) {
            throw new Error('Wrong location!');
        }
    }

    componentDidMount() {
        this.props.loadAllArticles()
    }

    render() {
        const { location, match: { url } } = this.props;
        return (
            <div>
                {this.renderLocalization()}
                {dictionary[location]['enterYourName']}: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <Menu>
                    <MenuItem path={`${url}/counter`} />
                    <MenuItem path={`${url}/filters`} />
                    <MenuItem path={`${url}/articles`} />
                    <MenuItem path={`${url}/comments`} />
                </Menu>
                <Switch>
                    <Route path={`${url}/counter`} component={Counter} exact />
                    <Route path={`${url}/filters`} component={Filters} />
                    <Route path={`${url}/articles`} component={ArticlesPage} />
                    <Route path={`${url}/comments/:page`} component={CommentsPage} />
                    <Redirect from={`${url}/comments`} to={`${url}/comments/1`}/>
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        )
    }

    renderLocalization() {
        const { location } = this.props;
        const newLang = location === 'ru' ? 'en' : 'ru';
        return (
            <div>
                <a href={`/${newLang}`}>{dictionary[location]['switchLang']}</a>
            </div>
        );
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }
}

export default connect((state, { match }) => {
    return {
        location: match.params.location
    };
}, { loadAllArticles })(App)