import axios from 'axios';

//ACTION TYPES

const SET_PRODUCT = 'SET_PRODUCT';
//ACTION CREATORS

const setProduct = product => ({
  type: SET_PRODUCT,
  product,
});

//THUNK CREATORS

export const fetchProduct = id => {
  return dispatch => {
    return axios
      .get(`api/products/${id}`)
      .then(res => res.data)
      .then(product => dispatch(setProduct(product)));
  };
};

export const deleteProduct = async id => {
  try {
    await axios.delete(`api/products/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (id, categoryId) => {
  try {
    await axios.put(`api/products/${id}`, { categoryId });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSingleProduct = async (id, productUpdate) => {
  try {
    await axios.put(`api/products/${id}`, productUpdate);
  } catch (error) {
    throw new Error(error);
  }
};
//REDUCER

export const product = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
