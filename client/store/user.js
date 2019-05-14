import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchOrder, setOrder } from './order';
import { setOrderItems } from './orderItems';
import { setSessionThunk } from './session';
import { isAdmin } from '../components/helperFunctions';

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
    dispatch(setUser(user));

    Cookies.set('cui', user.id); // set currentUserId
    Cookies.set('isa', !!isAdmin(user)); // set currentIsAdmin - yes = 1

    // 'session' key set on cookie by server, now grab and set to state
    const session = Cookies.get('session');
    dispatch(setSessionThunk(session));

    dispatch(fetchOrder(user.id));
  } catch (error) {
    throw new Error(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.delete('/api/auth/logout');
    dispatch(setUser({}));
    Cookies.remove('cui'); // remove currentUserId
    Cookies.remove('isa'); // remove currentIsAdmin
    Cookies.remove('cart');
    dispatch(setOrder({}));
    dispatch(setOrderItems([]));
    Cookies.remove('session');
    dispatch(setSessionThunk(''));
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

export const updateUser = user => async dispatch => {
  try {
    const response = await axios.put(`/api/users/${user.id}`, user);
    const updatedUser = response.data;
    return dispatch(setUser(updatedUser));
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = () => {
  return dispatch => {
    return axios
      .get('/api/auth/user')
      .then(resp => resp.data)
      .then(user => dispatch(setUser(user)));
  };
};

//REDUCER

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
