import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteOrderItemThunk, fetchProductVariants, updateOrderItemQuantity } from '../store';

class OrderItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }

  componentDidMount() {
    const { quantity } = this.props.orderItem;
    this.props.fetchProductVariants();
    this.setState({ quantity });
  }

  handleQuantityChange = ({ target }) => {
    const { orderItem } = this.props;
    this.setState({
      quantity: Number(target.value),
    });
    orderItem.quantity = this.state.quantity;
    this.props.updateOrderItemQuantity(orderItem);
  };

  render() {
    const { orderItem, product, userId, orderId, productVariants } = this.props;
    const { price } = orderItem;
    const { quantity } = this.state;

    const variant = productVariants.find(prodVar => prodVar.id === orderItem.productvariantId);
    const title = variant ? variant.productName : '';
    const itemTotal = orderItem ? price * quantity : 0;
    return (
      <tr>
        <td>{title}</td>
        <td>${price.toFixed(2)}</td>
        <td>
          <form>
            <select name="quantity" onChange={this.handleQuantityChange}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => {
                if (this.state.quantity === q) {
                  return (
                    <option key={q} value={q} selected>
                      {q}
                    </option>
                  );
                }
                return (
                  <option key={q} value={q}>
                    {q}
                  </option>
                );
              })}
            </select>
          </form>
        </td>
        <td>${(price * this.state.quantity).toFixed(2)}</td>
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
    updateOrderItemQuantity: orderItem => dispatch(updateOrderItemQuantity(orderItem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItem);
