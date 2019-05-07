/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addOrderThunk, addOrderItemThunk } from '../store';

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      reviews: [],
    };
  }

  componentDidMount() {
    // TODO: what's a more efficient way of doing this (that linter likes)?
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;

    axios
      .get(`api/products/${productId}`)
      .then(res => res.data)
      .then(product => this.setState({ product }));

    axios
      .get(`api/reviews/${productId}`)
      .then(res => res.data)
      .then(reviews => this.setState({ reviews }));
  }

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
    const { product, reviews } = this.state;
    const { user, order } = this.props;
    const { addOrderItem } = this;
    const orderItem = {
      quantity: 1,
      price: product.price,
      orderId: order.id,
      productId: product.id,
    };

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
        <Link to="/menu">
          <button type="submit">Return to Main Menu</button>
        </Link>
        {reviews.map(review => {
          return <div key={review.id}>{review.comments}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, order } = state;
  return {
    order,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrderThunk: (userId, order) => dispatch(addOrderThunk(userId, order)),
    addOrderItemThunk: (userId, orderId, orderItem) =>
      dispatch(addOrderItemThunk(userId, orderId, orderItem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
