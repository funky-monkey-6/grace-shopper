import axios from 'axios';

//ACTION TYPES

const SET_PRODUCTS = 'SET_PRODUCTS';

//ACTION CREATORS

const setProducts = products => ({
	type: SET_PRODUCTS,
	products,
});

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

//REDUCER

export const products = (state = [], action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		default:
			return state;
	}
};
