import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setSessionThunk, session } from './session'
import { checkUser, logOut, addUser, user, updateUser, getCurrentUser } from './user';
import { fetchUsers, users } from './users';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
import {
  fetchProduct,
  deleteProduct,
  product,
  updateProduct,
  updateSingleProduct,
} from './product';
import { fetchCategories, filterCategories, addCategory, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, order } from './order';
import {
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
  orderItems,
  updateOrderItemQuantity,
} from './orderItems';
import { orders, fetchUserOrders, fetchOrders } from './orders';
import { fetchProductReviews, reviews, addProductReview } from './reviews';
import {
  fetchProductVariants,
  productVariants,
  fetchSingleVariant,
  updateSingleVariant,
  productVariant,
} from './productVariants';

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
  fetchUserOrders,
  deleteOrderItemThunk,
  addOrderItemThunk,
  fetchProductReviews,
  addProductReview,
  setSessionThunk,
  fetchProductVariants,
  updateOrderItemQuantity,
  fetchOrders,
  deleteProduct,
  addCategory,
  updateProduct,
  updateSingleProduct,
  fetchSingleVariant,
  updateSingleVariant,
  productVariant,
};

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  categories,
  order,
  orders,
  orderItems,
  reviews,
  session,
  productVariants,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
