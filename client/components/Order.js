/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  fetchOrder as fetchOrderThunk,
  fetchOrderItems as fetchOrderItemsThunk,
  updateOrderThunk,
  fetchProducts,
  setLocalCartToStateThunk,
  setCookieCartToState,
} from '../store';
import OrderItem from './OrderItem';
import { isLoggedIn, isCart } from './helperFunctions';

class Order extends Component {

  componentDidMount() {
    const { fetchOrder, setLocalCartToState } = this.props;
    fetchProducts();
    const cookieUserId = Cookies.get('cui');

    if (cookieUserId) {
      fetchOrder(cookieUserId);
    } else {
      // const localCart = Cookies.get('cart');
      // console.log(JSON.parse(localCart));
      // if (localCart !== null) {
      //   console.log({ localCart });

      // setLocalCartToState(localCart);
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
    const { order, user, history } = this.props;
    const { orderitems, subtotal, shipping, total, type } = order;

    let isOrderitems;
    if (order) {
      if (orderitems) {
        isOrderitems = orderitems.length !== 0;
      }
    }

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
                orderitems.map(orderItem => {
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
          {isOrderitems ? (
            <Fragment>
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
            </Fragment>
          ) : ''
          }
          <br />

          <Fragment>
            {isOrderitems ? (
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
    setLocalCartToState: order => dispatch(setLocalCartToStateThunk(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
