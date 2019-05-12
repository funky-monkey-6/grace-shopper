import axios from 'axios';

//ACTION TYPES

const SET_PRODUCT_VARIANTS = 'SET_PRODUCT_VARIANTS';

//ACTION CREATORS

const setProductVariants = productVariants => ({
  type: SET_PRODUCT_VARIANTS,
  productVariants,
});

//THUNK CREATORS

export const fetchProductVariants = () => async dispatch => {
  try {
    const response = await axios.get('api/productVariants');
    const variants = response.data;
    return dispatch(setProductVariants(variants));
  } catch (error) {
    throw new Error(error);
  }
};

//REDUCER

export const productVariants = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_VARIANTS:
      return action.productVariants;
    default:
      return state;
  }
};
