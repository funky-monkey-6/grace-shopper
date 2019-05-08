import axios from 'axios';

//ACTION TYPES
const SET_CATEGORIES = 'SET_CATEGORIES';

//ACTION CREATORS
const setCategories = categories => ({
	type: SET_CATEGORIES,
	categories,
});

//THUNK CREATORS
export const fetchCategories = () => {
	return dispatch => {
		return axios
			.get('api/categories')
			.then(res => res.data)
			.then(categories => dispatch(setCategories(categories)));
	};
};


//REDUCER

export const categories = (state = [], action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
};