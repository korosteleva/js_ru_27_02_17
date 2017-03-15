import { APPLY_FILTER } from '../constants';

const initState = {
    from: null,
    to: null,
    //а здесь лучше просто id хранить, а не все что в Select приходит
    articles: []
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case APPLY_FILTER:
            return {
                ...state,
                ...payload
            };

        default:
            return state;
    }
}
