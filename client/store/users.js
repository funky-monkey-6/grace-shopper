import axios from 'axios';

//ACTION TYPES

const SET_USERS = 'SET_USERS';

//ACTION CREATORS

const setUsers = users => ({
  type: SET_USERS,
  users,
});

//THUNK CREATORS

export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('api/users')
      .then(res => res.data)
      .then(users => dispatch(setUsers(users)));
  };
};

//REDUCER

export const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};
