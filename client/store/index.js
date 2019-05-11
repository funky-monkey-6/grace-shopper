import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user } from './user';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
import { fetchProduct, deleteProduct, product } from './product';
import { fetchCategories, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, orderItems } from './orderItems';
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
  deleteProduct,
  fetchCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
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
