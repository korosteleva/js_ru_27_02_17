import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import toggleOpen from '../decorators/toggleOpen';

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    static defaultProps = {
        comments: [],
        isOpen: false,
        toggleOpen: null
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
            return <p>No comments yet</p>;
        }

        return (
            <div>
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <Comment comment={comment} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default toggleOpen(CommentList);
