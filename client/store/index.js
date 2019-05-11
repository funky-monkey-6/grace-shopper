import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user } from './user';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
import { fetchProduct, product } from './product';
import { fetchCategories, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, setLocalCartToStateThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, setLocalCartItemsToStateThunk, orderItems } from './orderItems';
import { fetchProductReviews, reviews } from './reviews';

//THUNK CREATORS

export {
  checkUser,
  logOut,
  addUser,
  fetchProducts,
  searchProducts,
  filterProducts,
  fetchProduct,
  fetchCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  setLocalCartToStateThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
  setLocalCartItemsToStateThunk,
  fetchProductReviews,
};

const reducer = combineReducers({
  user,
  products,
  product,
  categories,
  order,
  orderItems,
  reviews,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
