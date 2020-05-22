import auth from './auth';
import dishes from './dishes';
import comments from './comments';
import staffs from './staffs';
import { combineReducers } from 'redux';

// Reducer
// Note that reducer is a pure function, it means that it should not 
// mutate state, in other word, the previous state should not be changed by any means
const rootReducers = combineReducers({
    auth,
    dishes,
    comments,
    staffs
});

export default rootReducers;