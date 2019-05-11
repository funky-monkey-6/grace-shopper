import axios from 'axios';

//ACTION TYPES

const SET_ORDER = 'SET_ORDER';

//ACTION CREATORS

export const setOrder = order => ({
  type: SET_ORDER,
  order,
});

//THUNK CREATORS

export const fetchOrder = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/cart`)
      .then(response => {
        const dbCart = response.data;
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (dbCart) {
          // compare dbCart to localCart

          return dispatch(setOrder(dbCart));
        }
        return dispatch(setOrder({}));
      })
      .catch(err => {
        throw new Error(err);
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

export const setLocalCartToStateThunk = order => {
  return dispatch => {
    return dispatch(setOrder(order));
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
