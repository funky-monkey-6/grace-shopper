import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder, fetchOrderItems, updateOrderThunk, fetchProducts } from '../store';
import OrderItem from './OrderItem';

class Order extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchOrderItems(this.props.order.id);
  }

  onChange = ev => {
    this.props.updateOrderThunk({
      ...this.props.order,
      type: ev.target.value,
    });
  };

  render() {
    const { onChange } = this;
    const { orderItems, order, user, history } = this.props;

    // TODO save values in db for subtotal, shipping, total
    let subtotal = 0;
    if (orderItems) {
      subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    const shipping = order.type === 'delivery' ? 5 : 0;

    const total = subtotal + shipping;

    const loggedIn = Object.keys(user).length !== 0 ? true : false;
    const cartExists = Object.keys(order).length !== 0 ? true : false;

    return (
      <div>
        <h2>Bag</h2>
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Item Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartExists && loggedIn ? (
              orderItems.map(orderItem => {
                return (
                  <OrderItem
                    key={orderItem.id}
                    userId={user.id}
                    orderId={order.id}
                    orderItem={orderItem}
                    history={history}
                  />
                );
              })
            ) : (
              <tr>
                <td>Your bag is empty.</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
            )}
            <tr>
              <td />
              <td />
              <td>
                {/* TODO drop down - [delivery, pickup] */}
                Order Type:
                <br />
                Subtotal:
                <br />
                Shipping:
                <br />
                Total:
              </td>
              <td>
                <select
                  name="type"
                  value={order.type}
                  selected="pickup"
                  onChange={onChange}
                  className="form-control"
                >
                  <option key={1} value="pickup">
                    Pickup
                  </option>
                  <option key={2} value="delivery">
                    Delivery
                  </option>
                </select>
                {order.type}
                <br />
                {subtotal}
                <br />
                {shipping}
                <br />
                {total}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <button type="submit">Start Checkout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, order, orderItems } = state;
  return {
    user,
    order,
    orderItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    fetchOrderItems: orderId => dispatch(fetchOrderItems(orderId)),
    updateOrderThunk: order => dispatch(updateOrderThunk(order)),
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
