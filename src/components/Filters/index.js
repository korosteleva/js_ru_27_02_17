import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticlesSelect from './ArticlesSelect'
import DateRange from './DateRange'
import { applyFilter } from '../../AC'

class Filters extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        applyFilter: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    render() {
        const { articles, filters } = this.props;

        return (
            <div>
                <ArticlesSelect
                    articles={articles}
                    articleIds={filters.articleIds}
                    onSelect={this.handleSelectChange} />
                <DateRange
                    from={filters.from}
                    to={filters.to}
                    onDayChange={this.handleFilterChange} />
            </div>
        );
    }

    handleFilterChange(filtersObject) {
        const { applyFilter } = this.props;
        applyFilter(filtersObject);
    }

    handleSelectChange(selectedArticles) {
        const articleIds = selectedArticles.articles.map(articleInfo => articleInfo.value);
        const { applyFilter } = this.props;
        applyFilter({
            articleIds
        });
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        filters: state.filters
    };
};

export default connect(mapStateToProps, { applyFilter })(Filters);
