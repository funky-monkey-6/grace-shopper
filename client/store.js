import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_PRODUCTS = 'SET_PRODUCTS';

//ACTION CREATORS
const setUser = user => ({
    type: SET_USER,
    user,
});

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

export const checkUser = enteredUser => async dispatch => {
    try {
        const response = await axios.put('/api/auth/login', enteredUser);
        const user = response.data;
        return dispatch(setUser(user));
    } catch (error) {
        throw new Error(error);
    }
}

// export const getMe = () => async dispatch => {
//     try {
//         const response = await axios.get('/api/auth/me')
//         user = response.data
//         return dispatch(setUser(user))
//     } catch (error) { throw new Error(error) }
// };

//REDUCERS

const product = (state = {}, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return { state: action.products };
        default:
            return state;
    }
};

const user = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return { state: action.user };
        default:
            return state;
    }
};

const reducer = combineReducers({
    product,
    user,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
