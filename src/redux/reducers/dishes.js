import * as ActionTypes from '../actions/ActionTypes';

const dishes = (state = { isLoading: true, errMess: null, dishes: [] }, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] }

        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: action.payload }

        case ActionTypes.ADD_DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] }

        default:
            return state;
    }
}

export default dishes;