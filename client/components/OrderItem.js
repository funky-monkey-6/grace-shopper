import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteOrderItemThunk, fetchProductVariants } from '../store';

class OrderItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchProductVariants();
  }

  render() {
    const { orderItem, product, userId, orderId, productVariants } = this.props;
    const { price, quantity } = orderItem;

    if (!orderItem.price) {
      orderItem.price = product.productVariant[0].price;
    }

    const variant = productVariants.find(prodVar => prodVar.id === orderItem.productVariantId);
    const title = variant ? variant.productName : '';
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
  const { products, productVariants } = state;
  const product = products.find(_product => _product.id === orderItem.productId);
  return {
    product,
    productVariants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrderItemThunk: (userId, orderId, orderItemId) =>
      dispatch(deleteOrderItemThunk(userId, orderId, orderItemId)),
    fetchProductVariants: () => dispatch(fetchProductVariants()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItem);
