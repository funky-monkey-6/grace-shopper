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
// const ADD_ORDER = 'ADD_ORDER';
// const UPDATE_ORDER = 'UPDATE_ORDER';
const SET_ORDERITEMS = 'SET_ORDERITEMS';
// const ADD_ORDERITEM = 'ADD_ORDERITEM';
// const DELETE_ORDERITEM = 'DELETE_ORDERITEM';

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

// const addOrder = (userId, order) => ({
//   type: ADD_ORDER,
//   userId,
//   order,
// });

// const updateOrder = order => ({
//   type: UPDATE_ORDER,
//   order,
// });

const setOrderItems = orderItems => ({
  type: SET_ORDERITEMS,
  orderItems,
});

// const addOrderItem = (orderItem, userId) => ({
//   type: ADD_ORDERITEM,
//   orderItem,
//   userId
// });

// const deleteOrderItem = orderItemId => ({
//   type: DELETE_ORDERITEM,
//   orderItemId,
// })

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

export const addUser = enteredUser => async dispatch => {
  try {
    const response = await axios.post('/api/users/adduser', enteredUser);
    const newUser = response.data;
    return dispatch(setUser(newUser));
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
        return dispatch(setOrder({}));
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

// export const deleteOrderThunk = (userId, orderId) => {
//   return dispatch => {
//     return axios.delete(`/api/users/${userId}/orders/${orderId}`)
//       .then(() => dispatch(setOrder({})))
//       .catch(err => {
//         throw new Error(err);
//       });
//   }
// };

export const addOrderThunk = (userId, order) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders`, order)
      .then(resp => dispatch(setOrder(resp.data)))
      .catch(err => {
        throw new Error(err);
      });
  };
};

export const fetchOrderItems = orderId => {
  return dispatch => {
    return (
      axios
        .get(`/api/users/orders/${orderId}/orderItems`)
        // .then(resp => resp)
        .then(resp => {
          if (resp.data) {
            console.log('fetchOrderItems() being called');
            return dispatch(setOrderItems(resp.data));
          }
          return null;
        })
        .catch(err => {
          throw new Error(err);
        })
    );
  };
};

// TODO change to using dispatch(setOrder()), but not working now
export const updateOrderThunk = order => {
  return dispatch => {
    return axios
      .put(`/api/users/${order.userId}/orders/${order.id}`, order)
      .then(resp => {
        console.log('resp.data: ', resp.data);
        return dispatch(fetchOrder(order.userId));
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

// TODO refactor: don't need orderId ?
export const deleteOrderItemThunk = (userId, orderId, orderItemId) => {
  return dispatch => {
    // TODO change on line below:  1 => ${userId}
    return axios
      .delete(`/api/users/1/orders/${orderId}/orderItem/${orderItemId}`)
      .then(() => {
        return dispatch(fetchOrderItems(orderId));
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

export const addOrderItemThunk = (userId, orderId, orderItem) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders/${orderId}/orderItem`, orderItem)
      .then(() => dispatch(fetchOrderItems(orderId)))
      .catch(err => {
        throw new Error(err);
      });
  };
};

//REDUCERS

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

const order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};

const order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order[0];
    default:
      return state;
  }
};

const orderItems = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERITEMS:
      return action.orderItems;
    default:
      return state;
  }
};

const order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};

const orderItems = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDERITEMS:
      return action.orderItems;
    default:
      return state;
  }
};

const reducer = combineReducers({
  user,
  products,
  categories,
  order,
  orderItems,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
