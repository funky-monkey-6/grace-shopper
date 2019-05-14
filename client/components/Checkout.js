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
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      ccNumber: '',
      ccv: '',
      ccExpDateMonth: 1,
      ccExpDateYear: 2019,
      sameAddress: false,
      submitted: false,
    };
  }

  componentDidMount = () => {
    const { fetchOrder, user, order } = this.props;
    fetchOrder(user.id);
    fetchOrderItems(order.id);
  };

  handleChange = ev => {
    ev.preventDefault();

    const {
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      sameAddress,
    } = this.state;

    this.setState({ [`${ev.target.name}`]: ev.target.value });

    if (sameAddress) {
      this.setState({
        firstName: billingFirstName,
        lastName: billingLastName,
        shippingAddress: billingAddress,
        shippingCity: billingCity,
        shippingState: billingState,
        shippingZip: billingZip,
      });
    }
  };

  handleSubmit = ev => {
    const {
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      ccNumber,
      ccv,
      ccExpDateMonth,
      ccExpDateYear,
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
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      email,
      phone,
      ccNumber,
      ccv,
      ccExpDate: new Date(ccExpDateYear, ccExpDateMonth, 0, 0, 0, 0, 0),
    });
    this.setState({ submitted: true });
  };

  copyBillingAddress = ev => {
    const {
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
    } = this.state;

    if (ev.target.checked) {
      this.setState({
        firstName: billingFirstName,
        lastName: billingLastName,
        shippingAddress: billingAddress,
        shippingCity: billingCity,
        shippingState: billingState,
        shippingZip: billingZip,
        sameAddress: true,
      });
    } else this.setState({ sameAddress: false });
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
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      ccNumber,
      ccv,
      ccExpDateMonth,
      ccExpDateYear,
      email,
      phone,
      sameAddress,
      submitted,
    } = this.state;

    const { orderItems, order, products, user } = this.props;

    // TODO save values in db for subtotal, shipping, total
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
        {!submitted ? (
          <Fragment>
            <div>
              <h4> Review order: </h4>
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
                          <td>
                            ${orderItem ? (orderItem.price * orderItem.quantity).toFixed(2) : 0}
                          </td>
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
              <h4>Complete your order:</h4>
              <br />
              <h5>Billing Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="billingFirstName"
                      value={billingFirstName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="billingLastName"
                      value={billingLastName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="billingAddress"
                      value={billingAddress}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      name="billingCity"
                      value={billingCity}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    State:
                    <input
                      type="text"
                      name="billingState"
                      value={billingState}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Zip Code:
                    <input
                      type="text"
                      name="billingZip"
                      value={billingZip}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={handleChange} />
                  </label>
                  <label>
                    Phone number:
                    <input type="text" name="phone" value={phone} onChange={handleChange} />
                  </label>
                  {/* The below may be a placeholder for whatever is implemented for Square or Stripe */}
                  <label>
                    Credit Card Number:
                    <input type="text" name="ccNumber" value={ccNumber} onChange={handleChange} />
                  </label>
                  <label>
                    CCV:
                    <input type="text" name="ccv" value={ccv} onChange={handleChange} />
                  </label>
                  <label>
                    Credit Card Expiration Date:
                    <input
                      type="number"
                      name="ccExpDateMonth"
                      value={ccExpDateMonth}
                      onChange={handleChange}
                      min="1"
                      max="12"
                    />
                    /
                    <input
                      type="number"
                      name="ccExpDateYear"
                      value={ccExpDateYear}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <br />
                <br />
                <label>
                  <input type="checkBox" name="sameAddress" onChange={this.copyBillingAddress} />
                  Shipping address is same as above
                </label>
                <br />
                {!sameAddress ? (
                  <div>
                    <h5>Shipping Information</h5>

                    <label>
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        value={sameAddress ? billingFirstName : firstName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="lastName"
                        value={sameAddress ? billingLastName : lastName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Address:
                      <input
                        type="text"
                        name="shippingAddress"
                        value={sameAddress ? billingAddress : shippingAddress}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      City:
                      <input
                        type="text"
                        name="shippingCity"
                        value={sameAddress ? billingCity : shippingCity}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      State:
                      <input
                        type="text"
                        name="shippingState"
                        value={sameAddress ? billingState : shippingState}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Zip Code:
                      <input
                        type="text"
                        name="shippingZip"
                        value={sameAddress ? billingZip : shippingZip}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                ) : (
                  ''
                )}

                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                  Checkout
                </button>
              </form>
            </div>
            <PaymentForm />
          </Fragment>
        ) : (
          <p>Your order has been submitted!</p>
        )}
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
