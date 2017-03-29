import { LOAD_COMMENT_BY_PAGE, COMMENTS_PER_PAGE, RENDER_COMMENT_BY_PAGE, START, SUCCESS } from '../constants';
import { arrToMap } from './utils';
import { Record, Map } from 'immutable';

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
});

const DefaultReducerState = Record({
    entities: new Map({}),
    currentPageEntities: new Map({}),
    loading: false,
    loadedPages: [],
    totalCount: 0,
    loadedCount: 0,
    limit: COMMENTS_PER_PAGE
});

export default (comments = new DefaultReducerState(), action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_COMMENT_BY_PAGE + START: {
            return comments.set('loading', true);
        }

        case LOAD_COMMENT_BY_PAGE + SUCCESS: {
            const currentPageRecords = arrToMap(payload.response.records, CommentModel);
            const loadedPages = comments.get('loadedPages');
            const newLoadedPages = !loadedPages.includes(payload.page) ?
                loadedPages.concat(payload.page) :
                loadedPages;

            return comments
                .mergeIn(['entities'], currentPageRecords)
                .set('loadedPages', newLoadedPages)
                .set('currentPageEntities', currentPageRecords)
                .set('loading', false)
                .set('loadedCount', comments.get('loadedCount') + payload.response.records.length)
                .set('totalCount', payload.response.total);
        }

        case RENDER_COMMENT_BY_PAGE: {
            return comments
                .set(
                    'currentPageEntities',
                    comments
                        .get('entities')
                        .slice(payload.offset, payload.offset + COMMENTS_PER_PAGE ));
        }

        default:
            return comments;
    }
}
