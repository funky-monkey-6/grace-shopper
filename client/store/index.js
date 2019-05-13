import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user, updateUser, getCurrentUser } from './user';
import { fetchUsers, users } from './users';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
import { fetchProduct, deleteProduct, product, updateProduct } from './product';
import { fetchCategories, filterCategories, addCategory, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, setLocalCartToStateThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, orderItems } from './orderItems';
import { fetchProductReviews, reviews, addProductReview } from './reviews';
import { setSessionThunk, session } from './session';
import { fetchProductVariants, productVariants } from './productVariants';

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
  fetchCategories,
  filterCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
  setLocalCartToStateThunk,
  fetchProductReviews,
  addProductReview,
  setSessionThunk,
  fetchProductVariants,
  deleteProduct,
  addCategory,
  updateProduct,
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
  productVariants,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
