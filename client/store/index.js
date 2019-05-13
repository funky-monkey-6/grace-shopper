import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user, updateUser, getCurrentUser } from './user';
import { fetchUsers, users } from './users';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
import { fetchProduct, deleteProduct, product } from './product';
import { fetchCategories, filterCategories, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, orderItems } from './orderItems';
import { fetchProductReviews, reviews, addProductReview } from './reviews';
import { setSessionThunk, session } from './session';

//THUNK CREATORS

export {
  checkUser,
  logOut,
  addUser,
  getCurrentUser,
  updateUser,
  fetchUsers,
  fetchProducts,
  searchProducts,
  filterProducts,
  fetchProduct,
  deleteProduct,
  fetchCategories,
  filterCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
  fetchProductReviews,
  addProductReview,
  setSessionThunk,
};

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  categories,
  order,
  orderItems,
  reviews,
  session,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
