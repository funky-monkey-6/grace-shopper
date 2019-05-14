/* eslint-disable indent */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchOrder as fetchOrderThunk,
  fetchOrderItems,
  updateOrderThunk,
  updateUser,
} from '../store';
import { isLoggedIn } from './helperFunctions';
import PaymentForm from './PaymentForm';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      submitted: false,
    };
  }

  componentDidMount = () => {
    const { fetchOrder, user, order } = this.props;
    fetchOrder(user.id);
    fetchOrderItems(order.id);

    const sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.defer = true;
    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  };

  handleChange = ev => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    const {
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      email,
      phone,
    } = this.state;

    const { updateOrder, updateUserThunk, order, user } = this.props;

    ev.preventDefault();

    updateOrder({
      ...order,
      status: 'processing',
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      date: new Date(),
    });

    updateUserThunk({
      ...user,
      firstName,
      lastName,
      email,
      phone,
    });
    this.setState({ submitted: true });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const {
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      email,
      phone,
    } = this.state;

    const { orderItems, order, products, user } = this.props;

    order.subtotal = 0;
    if (orderItems) {
      order.subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    order.shipping = order.type === 'delivery' ? 5 : 0;
    order.total = order.subtotal + order.shipping;

    const findProduct = (_products, orderItem) =>
      _products.find(_product => _product.id === orderItem.productId);

    return isLoggedIn(user) && orderItems.length ? (
      <div>
        <div>
          <h4> Review and place your order </h4>
          <table className="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Item Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.length
                ? orderItems.map(orderItem => (
                    <tr key={orderItem.id}>
                      <td>{findProduct(products, orderItem).title}</td>
                      <td>${orderItem.price.toFixed(2)}</td>
                      <td>{orderItem.quantity}</td>
                      <td>${orderItem ? (orderItem.price * orderItem.quantity).toFixed(2) : 0}</td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>
        </div>
        <br />

        <div className="row justify-content-end">
          <div className="col-3 text-right">Order Type:</div>
          <div className="col-3">{order.type}</div>
        </div>

        <div className="row justify-content-end">
          <div className="col-3 text-right">Subtotal:</div>
          <div className="col-3">${order.subtotal.toFixed(2)}</div>
        </div>

        <div className="row justify-content-end">
          <div className="col-3 text-right">Shipping:</div>
          <div className="col-3">${order.shipping.toFixed(2)}</div>
        </div>

        <br />

        <div className="row justify-content-end">
          <div className="col-3 text-right">
            <h5>
              <strong>Total:</strong>
            </h5>
          </div>
          <div className="col-3">
            <h5>
              <strong>${order.total.toFixed(2)}</strong>
            </h5>
          </div>
        </div>
        <br />
        <br />

        <div>
          <h5>Address and contact information</h5>
          <br />
          <form>
            <label>
              First Name:
              <input type="text" name="firstName" value={firstName} onChange={handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={lastName} onChange={handleChange} />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="shippingAddress"
                value={shippingAddress}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input type="text" name="shippingCity" value={shippingCity} onChange={handleChange} />
            </label>
            <label>
              State:
              <input
                type="text"
                name="shippingState"
                value={shippingState}
                onChange={handleChange}
              />
            </label>
            <label>
              Zip Code:
              <input type="text" name="shippingZip" value={shippingZip} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={email} onChange={handleChange} />
            </label>
            <label>
              Phone number:
              <input type="text" name="phone" value={phone} onChange={handleChange} />
            </label>
          </form>
        </div>
        <br />
        <br />
        <PaymentForm paymentForm={window.SqPaymentForm} />
      </div>
    ) : (
      <div />
    );
  }
}

const mapStateToProps = state => {
  const { user, order, orderItems, products } = state;
  return {
    user,
    order,
    orderItems,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: id => dispatch(fetchOrderThunk(id)),
    fetchOrderItems: orderId => dispatch(fetchOrderItems(orderId)),
    updateOrder: order => dispatch(updateOrderThunk(order)),
    updateUserThunk: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
