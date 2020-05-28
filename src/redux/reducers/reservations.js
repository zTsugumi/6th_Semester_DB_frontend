import * as ActionTypes from '../actions/ActionTypes';

const reservations = (state = { isLoading: true, errMess: null, reservations: null }, action) => {
    switch (action.type) {
        case ActionTypes.RESERVATIONS_LOADING:
            return { ...state, isLoading: true, errMess: null, reservations: null };
        case ActionTypes.ADD_RESERVATIONS:
            return { ...state, isLoading: false, errMess: null, reservations: action.payload };
        case ActionTypes.RESERVATIONS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, reservations: null };

        case ActionTypes.POST_RESERVATIONS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_RESERVATIONS_SUCCESS:
            return { ...state, isLoading: false, reservations: [] };
        case ActionTypes.REMOVE_RESERVATIONS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.UPDATE_RESERVATION_SUCCESS:
            var reservation = action.payload;
            var newReservations = state.reservations.map((item) => {
                if (item._id === reservation._id)
                    return reservation
                else
                    return item
            })
            return { ...state, isLoading: false, reservations: newReservations };
        case ActionTypes.PUT_RESERVATION_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_RESERVATION_SUCCESS:
            var resId1 = action.payload.resId1;
            var resId2 = action.payload.resId2;
            newReservations = state.reservations.map((item) => {
                if (item._id === resId1) {
                    return item.reservations.filter((reservation) => reservation._id !== resId2)
                }
                else
                    return item;
            })
            return { ...state, isLoading: false, reservations: newReservations };
        case ActionTypes.REMOVE_RESERVATION_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}

export default reservations;