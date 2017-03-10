import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList/index'

import DatepickerRange from './DatepickerRange';

class App extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    state = {
        text: '',
        selected: null
    };

    render() {
        const { articles } = this.props;
        return (
            <div>
                <DatepickerRange />
                <ArticleList articles={articles}/>
            </div>
        )
    }
}

export default App