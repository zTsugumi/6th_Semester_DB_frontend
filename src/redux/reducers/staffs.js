import * as ActionTypes from '../actions/ActionTypes';

const staffs = (state = { isLoading: true, errMess: null, staffs: [] }, action) => {
    switch (action.type) {
        case ActionTypes.STAFFS_LOADING:
            return { ...state, isLoading: true, errMess: null, staffs: [] }

        case ActionTypes.ADD_STAFFS:
            return { ...state, isLoading: false, errMess: null, staffs: action.payload }

        case ActionTypes.ADD_STAFFS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, staffs: [] }

        default:
            return state;
    }
}

export default staffs;