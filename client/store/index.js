import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user } from './user';
import { fetchProducts, searchProducts, filterProducts, getProduct, products } from './products';
import { fetchCategories, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, orderItems } from './orderItems';

//THUNK CREATORS

export {
  checkUser,
  logOut,
  addUser,
  fetchProducts,
  searchProducts,
  filterProducts,
  getProduct,
  fetchCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
};

const reducer = combineReducers({
  user,
  products,
  categories,
  order,
  orderItems,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
