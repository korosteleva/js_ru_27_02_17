import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, START, SUCCESS, FAIL } from '../constants'
import {arrToMap} from './utils'
import {Map, Record} from 'immutable'

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
});

const DefaultReducerState = Record({
    entities: new Map({}),
    //здесь так просто уже не выйдет, ведь ты загружаешь не все комменты сразу, а отдельно для каждой статьи
    loading: false,
    error: null
});

export default (state = DefaultReducerState(), action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case LOAD_COMMENTS_FOR_ARTICLE + START:
            return state.set('loading', true);

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:
            return state
                .mergeIn(['entities'], arrToMap(payload.response, CommentModel))
                .set('loading', false);

        case LOAD_COMMENTS_FOR_ARTICLE + FAIL:
            return state
                .set('error', error.statusText)
                .set('loading', false);

        case ADD_COMMENT:
            return state.set(randomId, new CommentModel({
                id: randomId,
                ...payload.comment
            }))
    }

    return state
}
