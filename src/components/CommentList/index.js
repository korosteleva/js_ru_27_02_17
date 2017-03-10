import React, { Component, PropTypes } from 'react'
import Comment from '../Comment/index'
import toggleOpen from '../../decorators/toggleOpen'

import FormNewComment from './form-new-comment';

class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.array
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
        const { comments, isOpen } = this.props;
        if (!isOpen) {
            return null;
        }

        if (!comments.length) {
            return (
                <div>
                    <FormNewComment />
                    <h3>
                        No comments yet
                    </h3>
                </div>
            );
        }

        const commentItems = comments.map(comment => <li key={comment.id}><Comment comment={comment} /></li>);
        return (
            <div>
                <FormNewComment />
                <ul>
                    {commentItems}
                </ul>
            </div>
        );
    }
}

export default toggleOpen(CommentList)