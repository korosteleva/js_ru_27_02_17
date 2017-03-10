import React from 'react';

export default class FormNewComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            comment: ''
        };

        this.formValidation = {
            USER_NAME_MAX: 10,
            COMMENT_MAX: 150
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    render() {
        const { userName, comment } = this.state;
        return (
            <form>
                <h3>New comment</h3>
                <div>
                    <label>User name:</label>
                    <input name='userName' value={userName} onChange={this.handleUserNameChange} />
                    <p>Not more or equal then 10 characters</p>
                </div>
                <div>
                    <label>Comment:</label><br />
                    <textarea name="comment" value={comment} onChange={this.handleCommentChange} />
                    <p>Not more or equal then 150 characters</p>
                </div>

                <button disabled>Add comment</button>
            </form>
        );
    }

    handleUserNameChange(event) {
        if (event.target.value.length <= this.formValidation.USER_NAME_MAX) {
            this.setState({
                userName: event.target.value
            });
        }
    }

    handleCommentChange(event) {
        if (event.target.value.length <= this.formValidation.COMMENT_MAX) {
            this.setState({
                comment: event.target.value
            });
        }
    }
}
