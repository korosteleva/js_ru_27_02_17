import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { addNewComment } from '../AC/index';

class NewCommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired
    };

    state = {
        text: '',
        user: ''
    };

    handleChange = field => ev => {
        const { value } = ev.target;
        if (validators[field](value)){
            this.setState({
                [field]: value
            })
        }
    };

    handleSubmit = ev => {
        ev.preventDefault();

        const { text, user } = this.state;
        const { articleId, addNewComment } = this.props;

        addNewComment({ articleId, text, user });

        this.setState({
            user: '',
            text: ''
        })
    };

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                comment: <input type="text" value={this.state.text} onChange = {this.handleChange('text')}/>
                user: <input type="text" value={this.state.user} onChange = {this.handleChange('user')}/>
                <input type = "submit"/>
            </form>
        )
    };
}

const validators = {
    text: (text) => text.length < 150,
    user: (text) => text.length < 10
};

export default connect(
    state => ({}),
    { addNewComment }
)(NewCommentForm);
