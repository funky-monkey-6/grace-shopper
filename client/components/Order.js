/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchOrder as fetchOrderThunk,
  fetchOrderItems as fetchOrderItemsThunk,
  updateOrderThunk,
  fetchProducts,
} from '../store';
import OrderItem from './OrderItem';
import { isLoggedIn, isCart } from './helperFunctions';

class Order extends Component {
  componentDidMount() {
    const { order, fetchOrder, fetchOrderItems, user } = this.props;
    if (isLoggedIn(user)) {
      fetchOrder(user.id);
    }

    fetchProducts();
    if (isCart(order)) {
      console.log('trying to fetch orders...');
      fetchOrderItems(order.id);
    }
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
    order.subtotal = 0;
    if (orderItems) {
      order.subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    order.shipping = order.type === 'delivery' ? 5 : 0;
    order.total = order.subtotal + order.shipping;

    const { subtotal, shipping, total, type } = order;

    console.log({ order });

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
            {isCart(order) && isLoggedIn(user) ? (
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
                  value={type}
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
                {type}
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
    fetchOrder: userId => dispatch(fetchOrderThunk(userId)),
    fetchOrderItems: orderId => dispatch(fetchOrderItemsThunk(orderId)),
    updateOrderThunk: order => dispatch(updateOrderThunk(order)),
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
