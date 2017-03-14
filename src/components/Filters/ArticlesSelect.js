import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        selectedArticles: PropTypes.array,
        onSelect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { articles, selectedArticles } = this.props;

        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }));

        return (
            <Select
                options={options}
                value={selectedArticles}
                multi={true}
                onChange={this.handleChange} />
        );
    }

    handleChange(articles) {
        const { onSelect } = this.props;
        onSelect({ articles });
    }
}

export default SelectFilter