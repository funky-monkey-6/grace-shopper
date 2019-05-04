import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_ORDER = 'SET_ORDER';

//ACTION CREATORS
const setUser = user => ({
  type: SET_USER,
  user,
});

const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

const setOrder = order => ({
  type: SET_ORDER,
  order,
});

//THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('api/products');
    const products = response.data;
    return dispatch(setProducts(products));
  } catch (error) {
    throw new Error(error);
  }
};

export const checkUser = enteredUser => async dispatch => {
  try {
    const response = await axios.get('api/account');
    const users = response.data;
    const user = users.filter(
      eachUser =>
        eachUser.email === enteredUser.email && eachUser.password === enteredUser.password,
    );
    if (user) {
      return dispatch(setUser(user));
    }
    throw new Error('The email or password you entered is incorrect');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchOrder = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/cart`)
      .then(response => {
        if (response.data) {
          return dispatch(setOrder(response.data));
        }
        return {};
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

//REDUCERS

const product = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { state: action.products };
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return { ...state, order: action.order };
    default:
      return state;
  }
};

const reducer = combineReducers({
  product,
  user,
  order,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
