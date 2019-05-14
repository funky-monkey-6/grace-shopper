import axios from 'axios';

//ACTION TYPES

const SET_SESSION = 'SET_SESSION';

//ACTION CREATORS

const setSession = session => ({
  type: SET_SESSION,
  session,
});

//THUNK CREATORS

export const setSessionThunk = session => {
  return dispatch => {
    dispatch(setSession(session));
  };
};

//REDUCER

export const session = (state = '', action) => {
  switch (action.type) {
    case SET_SESSION:
      return action.session;
    default:
      return state;
  }
};
