import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';
import FavoriteActions from './FavoriteActions';
import ReservationActions from './ReservationActions';

/**************************************************** LOGIN ****************************************************/
const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        isAdmin: response.isAdmin
    }
}

const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                if (response.isAdmin)
                    localStorage.setItem('isAdmin', response.isAdmin);

                dispatch(FavoriteActions.fetchFavorites());
                dispatch(ReservationActions.fetchReservations());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)));
};

/**************************************************** LOGOUT ****************************************************/
const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('isAdmin');
    dispatch(FavoriteActions.favoritesFailed("Error 401: Unauthorized"));
    dispatch(ReservationActions.reservationsFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

/**************************************************** SIGNUP ****************************************************/
const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}

const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}

const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

const signupUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup(creds));

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));

                dispatch(FavoriteActions.fetchFavorites());
                dispatch(ReservationActions.fetchReservations());
                // Dispatch the success action                
                dispatch(receiveSignup(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(signupError(error.message)));
};

// const checkUser = () => (dispatch) => {
//     //    dispatch(requestLogin(creds));

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'users/checkJWTToken', {
//         headers: {
//             'Authorization': bearer
//         }
//     })
//         .then(
//             response => {
//                 if (response.ok) {
//                     return response;
//                 } else {
//                     var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                     error.response = response;
//                     throw error;
//                 }
//             },
//             error => {
//                 throw error;
//             }
//         )
//         .then(response => response.json())
//         .then(response => {
//             if (response.success) {
//                 // If login was successful, set the token in local storage
//                 localStorage.setItem('token', response.token);
//                 localStorage.setItem('creds', JSON.stringify(creds));

//                 dispatch(FavoriteActions.fetchFavorites());
//                 dispatch(ReservationActions.fetchReservations());
//                 dispatch(receiveLogin(response));
//             }
//             else {
//                 var error = new Error('Error ' + response.status);
//                 error.response = response;
//                 throw error;
//             }
//         })
//         .catch(error => dispatch(loginError(error.message)));
// }

export default {
    loginUser,
    logoutUser,
    signupUser
}