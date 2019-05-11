/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import {
  fetchProductReviews,
  fetchProduct,
  addOrderThunk,
  addOrderItemThunk,
} from '../store/index';
import { isCart } from './helperFunctions';

class ProductSingle extends React.Component {
  componentDidMount = () => {
    const { productId } = this.props.match.params;
    const { fetchProduct, fetchProductReviews } = this.props;
    fetchProductReviews(productId);
    fetchProduct(productId);
  };

  addOrderItem = async (userId, order, orderItem) => {
    // localStorage.setItem('cart', JSON.stringify(order))
    let newOrder = {};
    try {
      if (!isCart(order)) {
        const newOrderObj = {
          type: 'pickup',
          status: 'cart',
          subtotal: orderItem.price * orderItem.quantity,
          shipping: 0,
          total: orderItem.price * orderItem.quantity,
          date: Date.now(),
        };
        const newOrderData = await axios.post(`/api/users/${userId}/orders`, newOrderObj);
        newOrder = newOrderData.data;
      }

      const currOrder = !isCart(order) ? newOrder : this.props.order;
      console.log({ currOrder });
      await this.props.addOrderItemThunk(userId, currOrder.id, orderItem);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, order, product, reviews } = this.props;
    const { addOrderItem } = this;
    const orderItem = {
      quantity: 1,
      price: product.price,
      orderId: order.id,
      productId: product.id,
    };

    if (!product) return null;
    return (
      <div>
        <h1>
          <i>Placeholder for image</i>
        </h1>
        <ul>
          <li>{product.title}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
        {/* userId, order, orderItem */}
        <button type="submit" onClick={() => addOrderItem(user.id, order, orderItem)}>
          Add to Cart
        </button>
        <div>
          <h1>
            <i>Reviews</i>
          </h1>
          {reviews.map(review => {
            const { id, rating, comment } = review;

            return (
              <ul key={id}>
                <li>{rating}</li>
                <li>{comment}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, order, product, reviews } = state;
  return {
    order,
    user,
    product,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrderThunk: (userId, order) => dispatch(addOrderThunk(userId, order)),
    addOrderItemThunk: (userId, orderId, orderItem) =>
      dispatch(addOrderItemThunk(userId, orderId, orderItem)),
    fetchProductReviews: id => dispatch(fetchProductReviews(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
