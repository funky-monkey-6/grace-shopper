/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

    return (
      <div>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
            </tbody>
          </table>

          <br />

          <div className="row justify-content-end">
            <div className="col-3 text-right">
              <span className="align-bottom">Order Type:</span>
            </div>
            <div className="col-3">
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
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-3 text-right">Subtotal:</div>
            <div className="col-3">${subtotal.toFixed(2)}</div>
          </div>

          <div className="row justify-content-end">
            <div className="col-3 text-right">Shipping:</div>
            <div className="col-3">${shipping.toFixed(2)}</div>
          </div>

          <div className="row justify-content-end">
            <div className="col-3 text-right">Total:</div>
            <div className="col-3">${total.toFixed(2)}</div>
          </div>

          <br />

          <Fragment>
            {orderItems.length ? (
              <div className="row justify-content-end">
                <div className="col-3">
                  <Link to="/checkout">
                    <button type="submit">Start Checkout </button>
                  </Link>
                </div>
              </div>
            ) : (
                ''
              )}
          </Fragment>
        </div>
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
