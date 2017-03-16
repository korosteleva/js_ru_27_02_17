import { APPLY_FILTER } from '../constants';

const initState = {
    from: null,
    to: null,
    articleIds: []
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
