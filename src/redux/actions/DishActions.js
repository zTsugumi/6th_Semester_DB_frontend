import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************** DISHES ********************************************************/
const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

const addDishesFailed = (errmess) => ({
    type: ActionTypes.ADD_DISHES_FAILED,
    payload: errmess
});

// This is a thunk :)
const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
        .then(
            response => {           // Promise resolve
                if (response.ok) {  // Server responses ok [200...299]
                    return response
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
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(addDishesFailed(error.message)));
};

export default {
    dishesLoading,
    addDishes,
    addDishesFailed,
    fetchDishes
}