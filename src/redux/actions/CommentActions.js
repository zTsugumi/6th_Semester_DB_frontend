import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************* COMMENTS *******************************************************/
const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

const addCommentsFailed = (errmess) => ({
    type: ActionTypes.ADD_COMMENTS_FAILED,
    payload: errmess
});

const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(addCommentsFailed(error.message)));
};

const postCommentFailed = (errmess) => ({
    type: ActionTypes.POST_COMMENT_FAILED,
    payload: errmess
})

const postComment = (dishId, rating, comment) => (dispatch) => {
    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment,
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
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
        .then(response => response.json())      // After post, new comment will be returned back as response
        .then(newComment => dispatch(addComment(newComment)))
        .catch(error => dispatch(postCommentFailed(error.message)));
}

export default {
    addComment,
    addComments,
    addCommentsFailed,
    fetchComments,
    postComment,
    postCommentFailed
}