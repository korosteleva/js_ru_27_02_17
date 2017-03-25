import {INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT,
    LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, START, SUCCESS, FAIL, LOAD_COMMENTS_FOR_ARTICLE} from '../constants'
import $ from 'jquery'

export function increment() {
    const action = {
        type: INCREMENT
    }

    return action
}


export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticleById(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE_BY_ID + START,
            payload: { id }
        })

        setTimeout(() => {
            $.get(`/api/article/${id}`)
                .done(response => dispatch({
                    type: LOAD_ARTICLE_BY_ID + SUCCESS,
                    payload: { response, id }
                }))
                .fail(error => dispatch({
                    type: LOAD_ARTICLE_BY_ID + FAIL,
                    payload: { error, id }
                }))
        }, 1000)
    }
}

export function loadCommentsForArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMMENTS_FOR_ARTICLE + START,
            payload: { id }
        });

        // setTimeout for dev only
        setTimeout(() => {
            $.get(`/api/comment?article=${id}`)
                .done(response => dispatch({
                    type: LOAD_COMMENTS_FOR_ARTICLE + SUCCESS,
                    payload: { response, id }
                }))
                .fail(error => dispatch({
                    type: LOAD_COMMENTS_FOR_ARTICLE + FAIL,
                    payload: { error, id }
                }))
        }, 1000)
    }
}
