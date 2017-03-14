import { INCREMENT, DELETE_ARTICLE, APPLY_FILTER } from '../constants'

export function increment() {
    return {
        type: INCREMENT
    };
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    };
}

export function applyFilter(payload) {
    return {
        type: APPLY_FILTER,
        payload
    };
}
