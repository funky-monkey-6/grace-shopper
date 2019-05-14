import axios from 'axios';
import Cookies from 'js-cookie';
// TODO how to fix this ???
/* eslint-disable import/no-cycle */
import { fetchOrder, setCookieCartToState } from './order';

//ACTION TYPES

const SET_ORDERITEMS = 'SET_ORDERITEMS';

// ACTION CREATORS

export const setOrderItems = orderItems => ({
  type: SET_ORDERITEMS,
  orderItems,
});

//THUNK CREATORS

export const fetchOrderItems = orderId => {
  return dispatch => {
    return axios
      .get(`/api/users/orders/${orderId}/orderItems`)
      .then(resp => {
        if (resp.data) {
          return dispatch(setOrderItems(resp.data));
        }
        return null;
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

// TODO refactor: don't need orderId ?
export const deleteOrderItemThunk = (userId, order, orderItem) => {
  return dispatch => {
    // guest cart
    if (!userId) {
      // TODO want to only delete one order item, right now will filter out all with the same productVariantId
      order.orderitems = order.orderitems.filter(
        item =>
          item.quantity !== orderItem.quantity &&
          item.productVariantId !== orderItem.productVariantId,
      );

      order.subtotal = order.orderitems.reduce(
        (total, item) => total + Number(item.quantity) * item.price,
        0,
      );
      order.total = order.shipping + order.subtotal;
      Cookies.set('cart', order);
      return dispatch(setCookieCartToState(order));
    } else {
      // loggedin cart
      return axios
        .delete(`/api/users/${userId}/orders/${order.id}/orderItem/${orderItem.id}`)
        .then(() => {
          return dispatch(fetchOrder(userId));
        })
        .catch(err => {
          throw new Error(err);
        });
    }
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

//REDUCER

export const orderItems = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERITEMS:
      return action.orderItems;
    default:
      return state;
  }
};
