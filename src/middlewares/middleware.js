import { ADD_NEW_COMMENT } from '../constants';

export default store => next => action => {
    switch(action.type) {
    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
        case ADD_NEW_COMMENT:
            const newCommentId = generateId();
            next({
                ...action,
                payload: {
                    ...action.payload,
                    newCommentId
                }
            });
            break;

        default:
            next(action);
    }
}

function generateId() {
    const currentTime = new Date();
    return currentTime.getTime();
}
