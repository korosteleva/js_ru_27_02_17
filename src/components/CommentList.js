import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import { loadCommentsForArticle } from '../AC'
import Loader from './Loader';

class CommentList extends Component {

    static propTypes = {
        article: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.array
    };

    static defaultProps = {
        loading: false
    };

    componentWillReceiveProps({ isOpen, article, loadCommentsForArticle, loading}) {
        if (!this.props.isOpen && isOpen && !loading && !article.commentsLoaded) {
            loadCommentsForArticle(article.id);
        }
    }

    render() {
        const { isOpen, toggleOpen, error } = this.props;
        if (error) {
            return <h4>{error}</h4>;
        }
        return (
            <div>
                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen, loading } = this.props;
        if (!isOpen) return null;

        if (!article.comments || !article.comments.length) {
            return <div>
                <h3>
                    No comments yet
                </h3>
                <NewCommentForm articleId={article.id} />
            </div>
        }

        if (loading) {
            return <Loader />;
        }

        const commentItems = article.comments.map(id => <li key={id}><Comment id={id} /></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
                <NewCommentForm articleId={article.id} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.comments.loading,
        error: state.comments.error
    }
}

export default connect(mapStateToProps, { loadCommentsForArticle })(toggleOpen(CommentList))