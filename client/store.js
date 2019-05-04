/* eslint-disable no-console */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CATEGORIES = 'SET_CATEGORIES';
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

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
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

export const getProduct = id => {
  return dispatch => {
    return axios
      .get(`api/products/${id}`)
      .then(res => res.data)
      .then(product => dispatch(setProducts(product)));
  };
};

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

// export const getMe = () => async dispatch => {
//     try {
//         const response = await axios.get('/api/auth/me')
//         user = response.data
//         return dispatch(setUser(user))
//     } catch (error) { throw new Error(error) }
// };

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
  category,
  order,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
