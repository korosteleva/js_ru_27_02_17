import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_NEW_COMMENT } from '../constants'

export default (state = normalizedArticles, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_ARTICLE:
            return state.filter(article => article.id !== payload.id);

        case ADD_NEW_COMMENT:
            return state.map(article => {
                if (article.id === payload.articleId) {
                    return {
                        ...article,
                        comments: article.comments.concat(payload.newCommentId)
                    }
                }
                return article;
            });

        default:
            return state;
    }
}