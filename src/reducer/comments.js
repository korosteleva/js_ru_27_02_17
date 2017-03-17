import { normalizedComments } from '../fixtures'
import { ADD_NEW_COMMENT } from '../constants'

export default (comments = normalizedComments, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_NEW_COMMENT:
            return comments.concat({
                id: payload.newCommentId,
                text: payload.text,
                user: payload.user
            });

        default:
            return comments;
    }
}