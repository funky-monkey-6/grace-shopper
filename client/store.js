/* eslint-disable no-console */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CATEGORIES = 'SET_CATEGORIES';

//ACTION CREATORS
const setUser = user => ({
  type: SET_USER,
  user,
});

const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
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

export const fetchCategories = () => {
  return dispatch => {
    return axios
      .get('api/categories')
      .then(res => res.data)
      .then(categories => dispatch(setCategories(categories)));
  };
};

export const searchProducts = searchTerm => {
  return dispatch => {
    return axios
      .get('api/products')
      .then(res => res.data)
      .then(allProducts =>
        allProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      .then(products => dispatch(setProducts(products)));
  };
};

export const filterProducts = categoryIds => {
  return dispatch => {
    return axios
      .get('api/products')
      .then(res => res.data)
      .then(allProducts => allProducts.filter(product => categoryIds.includes(product.categoryId)))
      .then(products => dispatch(setProducts(products)));
  };
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

//REDUCERS

const product = (state = { products: [] }, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
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

const category = (state = { categories: [] }, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
};

const reducer = combineReducers({
  product,
  user,
  category,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
