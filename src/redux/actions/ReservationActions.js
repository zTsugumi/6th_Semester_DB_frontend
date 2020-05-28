import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************** GET RESERVATIONS ********************************************************/
export const reservationLoading = () => ({
    type: ActionTypes.RESERVATIONS_LOADING
});

export const addReservations = (reservations) => ({
    type: ActionTypes.ADD_RESERVATIONS,
    payload: reservations
});

export const reservationsFailed = (errmess) => ({
    type: ActionTypes.RESERVATIONS_FAILED,
    payload: errmess
});

export const fetchReservations = () => (dispatch) => {
    dispatch(reservationLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'reservation', {
        headers: {
            'Authorization': bearer
        },
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(reservations => dispatch(addReservations(reservations)))
        .catch(error => dispatch(reservationsFailed(error.message)));
};

/******************************************************* POST RESERVATIONS ********************************************************/
const postReservationsFailed = (errmess) => ({
    type: ActionTypes.POST_RESERVATIONS_FAILED,
    payload: errmess
})

const postReservations = (reservation) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'reservation', {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(
            response => {           // Promise resolve
                if (response.ok) {  // Server responses ok [200...299]                
                    return response;
                }
                else {              // Server responses errer [300...400]
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {              // Promise rejected
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(reservations => dispatch(addReservations(reservations)))
        .catch(error => dispatch(postReservationsFailed(error.message)));
}

/****************************************************** DELETE RESERVATIONS *******************************************************/
const removeReservations = () => ({
    type: ActionTypes.REMOVE_RESERVATIONS_SUCCESS
})

const removeReservationsFailed = (errmess) => ({
    type: ActionTypes.REMOVE_RESERVATIONS_FAILED,
    payload: errmess
})

const deleteReservations = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'reservation', {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
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
        .then(() => dispatch(removeReservations()))
        .catch(error => dispatch(removeReservationsFailed(error.message)));
};

/******************************************************** PUT RESERVATION *********************************************************/
const updateReservation = (reservation) => ({
    type: ActionTypes.UPDATE_RESERVATION_SUCCESS,
    payload: reservation
});

const putReservationFailed = (errmess) => ({
    type: ActionTypes.PUT_RESERVATION_FAILED,
    payload: errmess
})

const putReservation = (resId1, resId2, updateInfo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(`${baseUrl}reservation/${resId1}/${resId2}`, {
        method: 'PUT',
        body: JSON.stringify(updateInfo),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(
            response => {           // Promise resolve
                if (response.ok) {  // Server responses ok [200...299]
                    return response;
                }
                else {              // Server responses errer [300...400]
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {              // Promise rejected
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(reservation => dispatch(updateReservation(reservation)))
        .catch(error => dispatch(putReservationFailed(error.message)));
}

/******************************************************* DELETE RESERVATION *******************************************************/
// const removeReservation = (resId1, resId2) => ({
//     type: ActionTypes.REMOVE_RESERVATION_SUCCESS,
//     payload: { resId1, resId2 }
// })

const removeReservationFailed = (errmess) => ({
    type: ActionTypes.REMOVE_RESERVATION_FAILED,
    payload: errmess
})

// ?? need to fix the second then with fetch, instead use removeReservation
const deleteReservation = (resId1, resId2) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(`${baseUrl}reservation/${resId1}/${resId2}`, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                console.log(response);
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
        .then(() => dispatch(fetchReservations()))
        .catch(error => dispatch(removeReservationFailed(error.message)));
};

export default {
    reservationsFailed,
    fetchReservations,
    postReservations,
    deleteReservations,
    putReservation,
    deleteReservation
};