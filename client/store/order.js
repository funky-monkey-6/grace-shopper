import axios from 'axios';
import Cookies from 'js-cookie';
import { setOrderItems } from './orderItems';

//ACTION TYPES

const SET_ORDER = 'SET_ORDER';

//ACTION CREATORS

export const setOrder = order => ({
  type: SET_ORDER,
  order,
});

//THUNK CREATORS

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
        console.log('fetchOrCreateOrderAddItemThunk order ', order);
        order.subtotal = order.orderitems.reduce(
          (total, item) => total + Number(item.quantity) * item.price,
          0,
        );
        order.total = order.subtotal + order.shipping;
        console.log('order after calc ', order);

        Cookies.set('cart', order);
        dispatch(setOrder(order));
        dispatch(setOrderItems(order.orderitems));

        const { subtotal, total } = order;

        return axios.put(`/api/users/${userId}/orders/${order.id}`, { subtotal, total });
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

export const setCookieCartToState = order => {
  return dispatch => {
    dispatch(setOrder(order));
    dispatch(setOrderItems(order.orderItems));
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
