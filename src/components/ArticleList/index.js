import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import Article from '../Article/index'
import CSSTransition from 'react-addons-css-transition-group'
import accrdion from '../../decorators/accordion'
import './style.css'
import filter from '../../utils/filter';

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        isItemOpened: PropTypes.func.isRequired,
        toggleOpenItem: PropTypes.func.isRequired
    };

    render() {
        const { toggleOpenItem, isItemOpened, articles } = this.props;
        return (
            <CSSTransition component="ul"
                transitionName="article-list"
                transitionAppear={true}
                transitionAppearTimeout={100}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300} >
                {articles.map(article => {
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
}

const mapStateToProps = state => {
    return {
        articles: filter(state.articles, state.filters),
        filters: state.filters
    }
};

export default connect(mapStateToProps)(accrdion(ArticleList));
