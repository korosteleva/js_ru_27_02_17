import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'

class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.array,
        articleId: PropTypes.string.isRequired
    };

    static defaultProps = {
        comments: []
    };

    render() {
        const { isOpen, toggleOpen } = this.props;
        return (
            <div>
                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const {comments, isOpen, articleId} = this.props;
        if (!isOpen) {
            return null;
        }

        if (!comments.length) {
            return (
                <div>
                    <h3>
                        No comments yet
                    </h3>
                    <NewCommentForm articleId={articleId} />
                </div>
            );
        }

        const commentItems = comments.map(id => <li key={id}><Comment id={id} /></li>);
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
                <NewCommentForm articleId={articleId} />
            </div>
        );
    }
}

export default toggleOpen(CommentList);
