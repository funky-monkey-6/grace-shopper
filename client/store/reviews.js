import axios from 'axios';

//ACTION TYPES

const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

//ACTION CREATORS

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews,
});

const addReview = review => ({
  type: ADD_REVIEW,
  review,
});

//THUNK CREATORS

export const fetchProductReviews = id => {
  return dispatch => {
    return axios
      .get(`api/reviews/${id}`)
      .then(res => res.data)
      .then(reviews => dispatch(setReviews(reviews)));
  };
};

export const addProductReview = newReview => {
  return dispatch => {
    return axios
      .post('api/reviews', newReview)
      .then(res => res.data)
      .then(review => dispatch(addReview(review)))
      .catch(err => { throw new Error(err) });
  };
};

//REDUCER

export const reviews = (state = [], action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};
