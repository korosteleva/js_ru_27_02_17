import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {createFindCommentSelector} from '../selectors'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.shape({
            text: PropTypes.string,
            user: PropTypes.string
        })
    };

    static defaultProps = {
        comment: {}
    };

    render() {
        const { text, user } = this.props.comment;

        return (
            <div>
                <p>{text} <b>by {user}</b></p>
            </div>
        );
    }
}


const mapStateToProps = () => {
    const findCommentSelector = createFindCommentSelector();
    return (state, props) => {
        return {
            comment: findCommentSelector(state, props)
        }
    }
};

export default connect(mapStateToProps)(Comment)