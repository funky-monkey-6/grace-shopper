import axios from 'axios';

//ACTION TYPES

const SET_PRODUCT_VARIANTS = 'SET_PRODUCT_VARIANTS';
const SET_PRODUCT_VARIANT = 'SET_PRODUCT_VARIANT';

//ACTION CREATORS

const setProductVariants = productVariants => ({
  type: SET_PRODUCT_VARIANTS,
  productVariants,
});

const setProductVariant = productVariant => ({
  type: SET_PRODUCT_VARIANT,
  productVariant,
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

export const fetchSingleVariant = id => async dispatch => {
  try {
    const response = await axios.get(`api/productVariants/${id}`);
    const variant = response.data;
    return dispatch(setProductVariant(variant));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSingleVariant = async (id, variantUpdate) => {
  try {
    await axios.put(`api/productVariants/${id}`, variantUpdate);
  } catch (error) {
    throw new Error(error);
  }
};

//REDUCER

export const productVariants = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_VARIANTS:
      return action.productVariants;
    case SET_PRODUCT_VARIANT:
      return action.productVariant;
    default:
      return state;
  }
};
