import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {

    constructor() {
        super();

        this.state = {
            isOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { comments } = this.props;
        const { isOpen } = this.state;

        const commentsLength = comments ? comments.length : 0;
        const commentButtonText = isOpen ? 'Hide comments' : `Show comments (${commentsLength}) `;

        return (
            <div>
                <button onClick={this.handleClick}>{commentButtonText}</button>

                {this.renderComments()}
            </div>

        );
    }

    renderComments() {
        const { comments } = this.props;
        const { isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        if (!comments) {
            //все хорошо, но по сути comments [] это тоже 'No comments yet'
            return <p>No comments yet</p>;
        }

        return (
            <ul>
                {comments.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                })}
            </ul>
        );
    }


    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
