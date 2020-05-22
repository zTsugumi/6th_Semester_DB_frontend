import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************* STAFFS *******************************************************/
const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

const addStaffsFailed = (errmess) => ({
    type: ActionTypes.ADD_STAFFS_FAILED,
    payload: errmess
});

// This is a thunk :)
const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading());

    return fetch(baseUrl + 'staffs')
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
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(addStaffsFailed(error.message)));
};

export default {
    staffsLoading,
    addStaffs,
    addStaffsFailed,
    fetchStaffs
}