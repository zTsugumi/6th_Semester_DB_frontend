import * as ActionTypes from '../actions/ActionTypes';

const auth = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    isAdmin: localStorage.getItem('isAdmin') ? true : false,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: false, user: action.creds }
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, errMess: '', token: action.token, isAdmin: action.isAdmin };
        case ActionTypes.LOGIN_FAILURE:
            return { ...state, isLoading: false, isAuthenticated: false, errMess: action.message };

        case ActionTypes.SIGNUP_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: false, user: action.creds }
        case ActionTypes.SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, errMess: '', token: action.token };
        case ActionTypes.SIGNUP_FAILURE:
            return { ...state, isLoading: false, isAuthenticated: false, errMess: action.message };

        case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoadissng: true, isAuthenticated: true };
        case ActionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: false, token: '', user: null };
        // case ActionTypes.CHECK_JWT:
        //     return { ...state, isLoading: true, isAuthenticated: false, user: action.creds }

        default:
            return state
    }
}

export default auth;