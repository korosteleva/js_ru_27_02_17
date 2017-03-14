import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import Article from '../Article/index'
import CSSTransition from 'react-addons-css-transition-group'
import accrdion from '../../decorators/accordion'
import './style.css'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        isItemOpened: PropTypes.func.isRequired,
        toggleOpenItem: PropTypes.func.isRequired
    };

    render() {
        const { toggleOpenItem, isItemOpened } = this.props;
        const filteredArticles = this.applyFilters();

        return (
            <CSSTransition component="ul"
                transitionName="article-list"
                transitionAppear={true}
                transitionAppearTimeout={100}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300} >
                {filteredArticles.map(article => {
                    return (
                        <li key={article.id}>
                            <Article
                                article={article}
                                isOpen={isItemOpened(article.id)}
                                toggleOpen={toggleOpenItem(article.id)} />
                        </li>
                    );
                })}
            </CSSTransition>
        )
    }

    applyFilters() {
        const { articles, filters } = this.props;
        let filterFromDate = filters.from ? new Date(filters.from).getTime() : null;
        let filterToDate = filters.to ? new Date(filters.to).getTime() : null;

        return articles.filter(article => {
            let articleDate = new Date(article.date).getTime();
            let filteredArticle = filters.articles.filter(filterTag => filterTag.value === article.id);

            let conditionFromDate = filterFromDate ? articleDate >= filterFromDate : true;
            let conditionToDate = filterToDate ? articleDate <= filterToDate : true;
            let conditionArticles = filters.articles.length ? filteredArticle.length : true;

            return conditionFromDate && conditionToDate && conditionArticles;
        });
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        filters: state.filters
    }
};

export default connect(mapStateToProps)(accrdion(ArticleList));
