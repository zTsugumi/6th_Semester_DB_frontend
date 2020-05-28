/******************************************************** GET DISHES ********************************************************/
export const DISHES_LOADING = 'DISHES_LOADING';
export const ADD_DISHES = 'ADD_DISHES';                     // Add dishes to view ~ Add new dishes to Redux store
export const ADD_DISHES_FAILED = 'ADD_DISHES_FAILED';       // Add dishes to view failed, it's triggered when fetch failed

/******************************************************* POST DISHES ********************************************************/
export const POST_DISHES_SUCCESS = 'POST_DISHES_SUCCESS';   // Post new dish to view ~ Add new dish to Redux store
export const POST_DISHES_FAILED = 'POST_DISHES_FAILED';     // Post new dish to db failed, it's triggered when fetch post failed

/****************************************************** DELETE DISHES *******************************************************/
export const REMOVE_DISHES_SUCCESS = 'REMOVE_DISHES_SUCCESS';   // Remove all dishes from view ~ Change Redux store
export const REMOVE_DISHES_FAILED = 'REMOVE_DISHES_FAILED';

/******************************************************** PUT DISH **********************************************************/
export const UPDATE_DISH_SUCCESS = 'UPDATE_DISH_SUCCESS';   // Update view ~ Change Redux store with updated dish
export const PUT_DISH_FAILED = 'PUT_DISH_FAILED';           // Update dish to db failed, it's triggered when fetch put failed

/******************************************************* DELETE DISH ********************************************************/
export const REMOVE_DISH_SUCCESS = 'REMOVE_DISH_SUCCESS';   // Remove dish from view ~ Change Redux store
export const REMOVE_DISH_FAILED = 'REMOVE_DISH_FAILED';





/******************************************************* GET COMMENTS *******************************************************/
export const COMMENTS_LOADING = 'COMMENT_LOADING';
export const ADD_COMMENTS = 'ADD_COMMENTS';                 // Add comments to view ~ Add new comments to Redux store
export const ADD_COMMENTS_FAILED = 'COMMENTS_FAILED';       // Add comments to view failed, it's triggered when fetch failed

/******************************************************* POST COMMENTS ******************************************************/
export const POST_COMMENTS_SUCCESS = 'POST_COMMENTS_SUCCESS';  // Post new comment to view ~ Add new comment to Redux store
export const POST_COMMENTS_FAILED = 'POST_COMMENTS_FAILED';  // Post new comment to db failed, it's triggered when fetch post failed





/******************************************************** GET STAFFS ********************************************************/
export const STAFFS_LOADING = 'STAFFS_LOADING';
export const ADD_STAFFS = 'ADD_STAFFS';                     // Add staffs to view ~ Add new staffs to Redux store
export const ADD_STAFFS_FAILED = 'STAFFS_FAILED';           // Add staffs to view failed, it's triggered when fetch failed

/******************************************************** POST STAFFS *******************************************************/
export const POST_STAFFS_SUCCESS = 'POST_STAFFS_SUCCESS';   // Post new staff to view ~ Add new dish to Redux store
export const POST_STAFFS_FAILED = 'POST_STAFFS_FAILED';     // Post new staff to db failed, it's triggered when fetch post failed

/******************************************************* DELETE STAFFS ******************************************************/
export const REMOVE_STAFFS_SUCCESS = 'REMOVE_STAFFS_SUCCESS';// Remove all staffs from view ~ Change Redux store
export const REMOVE_STAFFS_FAILED = 'REMOVE_STAFFS_FAILED';

/********************************************************* PUT STAFF ********************************************************/
export const UPDATE_STAFF_SUCCESS = 'UPDATE_STAFF_SUCCESS'; // Update view ~ Change Redux store with updated staff
export const PUT_STAFF_FAILED = 'PUT_STAFF_FAILED';         // Update staff to db failed, it's triggered when fetch put failed

/******************************************************** DELETE STAFF ******************************************************/
export const REMOVE_STAFF_SUCCESS = 'REMOVE_STAFF_SUCCESS'; // Remove dish from view ~ Change Redux store
export const REMOVE_STAFF_FAILED = 'REMOVE_STAFF_FAILED';





/***************************************************** GET RESERVATIONS *****************************************************/
export const RESERVATIONS_LOADING = 'RESERVATIONS_LOADING';
export const ADD_RESERVATIONS = 'ADD_RESERVATIONS';         // Add reservations to view ~ Add new reservations to Redux store
export const RESERVATIONS_FAILED = 'RESERVATIONS_FAILED';   // Add reservations to view failed, it's triggered when fetch failed

/***************************************************** POST RESERVATIONS ****************************************************/
export const POST_RESERVATIONS_FAILED =                     // Post new reservation to db failed, it's triggered when fetch post failed
    'POST_RESERVATIONS_FAILED';                             // Here we don't have POST_RESERVATION to add new reservation to view because
                                                            // from server responses all reservations, not just the one we just post

export const REMOVE_RESERVATIONS_SUCCESS =                  // Remove all reservations from view ~ Change Redux store
    'REMOVE_RESERVATIONS_SUCCESS';
export const REMOVE_RESERVATIONS_FAILED = 
    'REMOVE_RESERVATIONS_FAILED';

/****************************************************** PUT RESERVATION *****************************************************/
export const UPDATE_RESERVATION_SUCCESS =                   // ?? WIP
    'UPDATE_RESERVATION_SUCCESS';   
export const PUT_RESERVATION_FAILED =                       // Update reservation to db failed, it's triggered when fetch put failed
    'PUT_RESERVATION_FAILED';           

/***************************************************** DELETE RESERVATION ***************************************************/
export const REMOVE_RESERVATION_SUCCESS =                   // Remove reservation from view ~ Change Redux store
    'REMOVE_RESERVATION_SUCCESS'; 
export const REMOVE_RESERVATION_FAILED = 
    'REMOVE_RESERVATION_FAILED';






/****************************************************** GET FAVORITES *******************************************************/
export const FAVORITES_LOADING = 'FAVORITES_LOADING';
export const ADD_FAVORITES = 'ADD_FAVORITES';               // Add favorites to view ~ Add new favorites to Redux store
export const FAVORITES_FAILED = 'FAVORITES_FAILED';         // Add favorites to view failed, it's triggered when fetch failed
                                                            // Here we don't handle post failed, because it's hard to happen)





/******************************************************** POST FILE *********************************************************/
export const POST_FILE_FAILED = 'POST_FILE_FAILED';         // Post new file to db failed, it's triggered when fetch post failed





/******************************************************* AUTHORIZATION ******************************************************/
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SIGNUP_REQUEST = 'LOGIN_REQUEST';
export const SIGNUP_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_FAILURE = 'LOGIN_FAILURE';

export const CHECK_JWT = 'CHECK_JWT';                       // WIP