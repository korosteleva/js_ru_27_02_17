import React, { PropTypes } from 'react'

function Comment(props) {
    const { text, user } = props.comment;
    return (
        <div>
            <p>
                {text}
                <b>by {user}</b>
            </p>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};

export default Comment;
