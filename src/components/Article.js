import React, { Component } from 'react';
import CommentList from './CommentList';

class Article extends Component {

    constructor() {
        super();

        this.state = {
            isOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { title } = this.props.article;
        return (
            <div>
                <h3 onClick={this.handleClick}>{title}</h3>
                {this.renderBody()}
            </div>
        );
    }

    renderBody() {
        const { text, comments } = this.props.article;
        const { isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <div>
                <section>{text}</section>
                <CommentList comments={comments} />
            </div>
        );
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default Article;
