import axios from 'axios';
import Cookies from 'js-cookie';
// TODO how to fix this ???
/* eslint-disable import/no-cycle */
import { setOrderItems } from './orderItems';

//ACTION TYPES

const SET_ORDER = 'SET_ORDER';

//ACTION CREATORS

export const setOrder = order => ({
  type: SET_ORDER,
  order,
});

//THUNK CREATORS

// TODO when login compare cookieCart to dbCart, then merge the 2, if same productVariantId, then add quantities
// export const fetchOrder = userId => {
//   return dispatch => {
//     return axios
//       .get(`/api/users/${userId}/cart`)
//       .then(response => {
//         const dbCart = response.data;
//         const localCart = JSON.parse(Cookies.get('cart'));
//         if (dbCart) {
//           // compare dbCart to localCart

//           return dispatch(setOrder(dbCart));
//         }
//         return dispatch(setOrder({}));
//       })
//       .catch(err => {
//         throw new Error(err);
//       });
//   };
// };

export const fetchOrder = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/cart`)
      .then(response => {
        const order = response.data;
        if (order) {
          dispatch(setOrder(order));
          dispatch(setOrderItems(order.orderitems));
          Cookies.set('cart', order);
        } else {
          dispatch(setOrder({}));
          dispatch(setOrderItems({}));
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

// TODO how to do subtotal & total calculation on server ?
export const fetchOrCreateOrderAddItemThunk = (userId, orderItem) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/cart/addItem`, orderItem)
      .then(res => res.data)
      .then(order => {
        //** TODO do this logic on server (had problems with before but now know how to do)
        // order calculations
        order.subtotal = order.orderitems.reduce(
          (total, item) => total + Number(item.quantity) * item.price,
          0,
        );
        order.total = order.subtotal + order.shipping;

        dispatch(setOrder(order));
        dispatch(setOrderItems(order.orderitems));

        const { subtotal, total } = order;

        // update info in db
        return axios.put(`/api/users/${userId}/orders/${order.id}`, { subtotal, total });
        //** end TODO
      });
  };
};

// TODO may need
// export const deleteOrderThunk = (userId, orderId) => {
//   return dispatch => {
//     return axios.delete(`/api/users/${userId}/orders/${orderId}`)
//       .then(() => dispatch(setOrder({})))
//       .catch(err => {
//         throw new Error(err);
//       });
//   }
// };

// TODO may be replaced by fetchOrCreateOrderAddItemThunk
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

export const setCookieCartToState = order => {
  return dispatch => {
    dispatch(setOrder(order));
    dispatch(setOrderItems(order.orderitems));
  };
};

// TODO change to using dispatch(setOrder()), but not working now
export const updateOrderThunk = (order, isCookieCart) => {
  return dispatch => {
    // guest cart
    if (!isCookieCart) {
      order.shipping = order.type === 'pickup' ? 0 : 5;
      order.total = order.shipping + order.subtotal;
      return dispatch(setCookieCartToState(order));
    }
    // loggedin cart
    return axios
      .put(`/api/users/${order.userId}/orders/${order.id}`, order)
      .then(() => {
        return dispatch(fetchOrder(order.userId));
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

//REDUCER

export const order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};
