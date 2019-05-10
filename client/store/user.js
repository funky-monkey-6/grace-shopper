import axios from 'axios';

//ACTION TYPES

const SET_USER = 'SET_USER';

//ACTION CREATORS

const setUser = user => ({
  type: SET_USER,
  user,
});

//THUNK CREATORS

export const checkUser = enteredUser => async dispatch => {
  try {
    const response = await axios.put('/api/auth/login', enteredUser);
    const user = response.data;
    return dispatch(setUser(user));
  } catch (error) {
    throw new Error(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.delete('/api/auth/logout');
    return dispatch(setUser({}));
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = enteredUser => async dispatch => {
  try {
    const response = await axios.post('/api/users/adduser', enteredUser);
    const newUser = response.data;
    return dispatch(setUser(newUser));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = user =>

// TODO Erin - keep or delete ?
// export const getMe = () => async dispatch => {
//     try {
//         const response = await axios.get('/api/auth/me')
//         user = response.data
//         return dispatch(setUser(user))
//     } catch (error) { throw new Error(error) }
// };

//REDUCER

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
