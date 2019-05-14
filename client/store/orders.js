import axios from 'axios';

//ACTION TYPES

const SET_ORDERS = 'SET_ORDERS';

//ACTION CREATORS

export const setOrders = orders => ({
  type: SET_ORDERS,
  orders,
});

//THUNK CREATORS

export const fetchOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(setOrders(orders)));
  };
};

//REDUCER

export const orders = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
};
