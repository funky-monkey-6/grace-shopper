import axios from 'axios';

//ACTION TYPES

const SET_REVIEWS = 'SET_REVIEWS';

//ACTION CREATORS

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews,
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

//REDUCER

export const reviews = (state = [], action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};
