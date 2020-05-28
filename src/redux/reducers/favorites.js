import * as ActionTypes from '../actions/ActionTypes';

const favorites = (state = { isLoading: true, errMess: null, favorites: null }, action) => {
    switch (action.type) {
        case ActionTypes.FAVORITES_LOADING:
            return { ...state, isLoading: true, errMess: null, favorites: null };
        case ActionTypes.ADD_FAVORITES:
            return { ...state, isLoading: false, errMess: null, favorites: action.payload };
        case ActionTypes.FAVORITES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, favorites: null };

        default:
            return state;
    }
}

export default favorites;