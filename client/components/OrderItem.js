import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteOrderItemThunk } from '../store';

class OrderItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { orderItem, product, userId, orderId } = this.props;
    const { price, quantity } = orderItem;
    console.log(orderItem);
    console.log(product);
    if (!orderItem.price) {
      orderItem.price = product.productvariant[0].price;
    }

    const title = product ? product.title : '';
    const itemTotal = orderItem ? price * quantity : 0;
    return (
      <tr>
        <td>{title}</td>
        <td>${price.toFixed(2)}</td>
        <td>{quantity}</td>
        <td>${itemTotal.toFixed(2)}</td>
        <td>
          <button
            type="submit"
            onClick={() => this.props.deleteOrderItemThunk(userId, orderId, orderItem.id)}
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, { orderItem }) => {
  const { products } = state;
  const product = products.find(_product => _product.id === orderItem.productId);
  return {
    product,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrderItemThunk: (userId, orderId, orderItemId) =>
      dispatch(deleteOrderItemThunk(userId, orderId, orderItemId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItem);
