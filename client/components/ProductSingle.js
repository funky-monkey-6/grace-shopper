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

class ProductSingle extends React.Component {
  componentDidMount = () => {
    const { productId } = this.props.match.params;
    const { fetchProduct, fetchProductReviews } = this.props;
    fetchProductReviews(productId);
    fetchProduct(productId);
  };

  // if adding item
  // check state.order.status = cart
  // if not, addOrderThunk()
  // addOrderItemThunk()

  addOrderItem = async (userId, order, orderItem) => {
    // const { addOrderThunk, addOrderItemThunk } = this.props;
    userId = 1; // simulates logged-in user
    let newOrder = {};
    try {
      if (Object.keys(order).length === 0) {
        console.log('status is cart');
        // this.props.addOrderThunk(userId, order);
        const newOrderData = await axios.post(`/api/users/${userId}/orders`, order);
        newOrder = newOrderData.data;
        console.log('newOrder: ', newOrder);
      }
      console.log('adding orderItem');
      const currOrder = newOrder ? newOrder : this.props.order;
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
