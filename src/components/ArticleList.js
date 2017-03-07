import React, { PropTypes, Component } from 'react';
import Article from './Article';
import accordion from '../decorators/accordion'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        openedId: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onClick: PropTypes.func
    };

    static defaultProps = {
        articles: [],
        openedId: null,
        onClick: null
    };

    constructor(props) {
        super(props);

        this.state = {
            openedId: null
        }
    }

    render() {
        const { articles, openedId, onClick } = this.props;

        return (
            <ul>
                {articles.map(article => {
                    return (
                        <li key={article.id}>
                            <Article
                                article={article}
                                isOpen={article.id === openedId}
                                onClick={onClick(article.id)} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default accordion(ArticleList);
