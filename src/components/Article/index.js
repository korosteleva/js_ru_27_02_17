import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from '../CommentList'
import Loader from '../Loader'
import CSSTransition from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import {deleteArticle, loadArticleById} from '../../AC'
import {articleByIdSelector} from '../../selectors'
import './style.css'

class Article extends Component {
    static contextTypes = {
        user: PropTypes.string,
        dictionary: PropTypes.object
    };

    componentWillMount() {
        this.checkAndLoad(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.checkAndLoad(nextProps)
    }

    checkAndLoad({article, loadArticleById, match}) {
        if (!article || (!article.text && !article.loading)) loadArticleById(match.params.id)
    }

    render() {
        const {article, isOpen, toggleOpen} = this.props;
        if (!article) return null;
        const { dictionary } = this.context;

        const body = isOpen
            ? <section>
                <p>{dictionary['user']}: {this.context.user}</p>
                {article.text}
                {article.loading && <Loader />}
                <CommentList article={article} ref={this.getCommentList}/>
            </section>
            : null
        return (
            <div>
                <h3 onClick={toggleOpen}>{article.title}</h3>
                <a href="#" onClick={this.handleDelete}>{dictionary['deleteArticle']}</a>
                <CSSTransition
                    transitionName="article"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {body}
                </CSSTransition>
            </div>
        )
    }

    handleDelete = ev => {
        ev.preventDefault()
        const {article, deleteArticle} = this.props
        deleteArticle(article.id)
    }

    getCommentList = ref => {
        this.commentList = ref
    }

    componentDidUpdate() {
//        console.log('---', findDOMNode(this.commentList))
    }
}


Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        comments: PropTypes.array
    }),
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
}

function mapStateToProps(state, {match}) {
    return {
        article: articleByIdSelector(state, match.params)
    }
}

export default connect(mapStateToProps, { deleteArticle, loadArticleById })(Article)