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
      shippingZip: 0,
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: 0,
      // ccNumber: 0,
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
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      sameAddress,
    } = this.state;

    this.setState({ [`${ev.target.name}`]: ev.target.value });
    if (sameAddress) {
      this.setState({
        billingFirstName: firstName,
        billingLastName: lastName,
        billingAddress: shippingAddress,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip,
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
    } = this.state;
    const { updateOrder, updateUserThunk, order, user } = this.props;
    ev.preventDefault();
    updateOrder({ ...order, status: 'processing' });
    updateUserThunk({
      ...user,
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip: parseInt(shippingZip),
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingZip: parseInt(billingZip),
    });
    this.setState({ submitted: true });
    // thunk to update user information
  };

  copyBillingAddress = ev => {
    const {
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
    } = this.state;

    if (ev.target.checked) {
      this.setState({
        billingFirstName: firstName,
        billingLastName: lastName,
        billingAddress: shippingAddress,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip,
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
      email,
      sameAddress,
      submitted,
    } = this.state;

    // const { order } = this.state.props;
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
              <table className="table table-condensed">
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
                          <td>${orderItem.price}</td>
                          <td>{orderItem.quantity}</td>
                          <td>${orderItem ? orderItem.price * orderItem.quantity : 0}</td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
            </div>
            <br />
            <div className="d-flex flex-row">
              <div>
                <br />
                Order Type: <span>{order.type}</span>
                <br />
                Subtotal: <span>${order.subtotal}</span>
                <br />
                Shipping: <span>${order.shipping}</span>
                <br />
                <strong>Total: ${order.total}</strong>
              </div>
            </div>
            <br />
            <br />
            <div>
              <h4>Enter checkout information below:</h4>
              <h3>Delivery Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                    <input
                      type="text"
                      name="shippingCity"
                      value={shippingCity}
                      onChange={handleChange}
                    />
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
                    <input
                      type="text"
                      name="shippingZip"
                      value={shippingZip}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input type="text" name="shippingEmail" value={email} onChange={handleChange} />
                  </label>
                </div>
                <br />
                <br />
                <div>
                  <h3>Billing Information</h3>

                  <label>
                    <input type="checkBox" name="sameAddress" onChange={this.copyBillingAddress} />
                    Billing information same as above
                  </label>
                  <br />
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="billingFirstName"
                      value={sameAddress ? firstName : billingFirstName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="billingLastName"
                      value={sameAddress ? lastName : billingLastName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="billingAddress"
                      value={sameAddress ? shippingAddress : billingAddress}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      name="billingCity"
                      value={sameAddress ? shippingCity : billingCity}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    State:
                    <input
                      type="text"
                      name="billingState"
                      value={sameAddress ? shippingState : billingState}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Zip Code:
                    <input
                      type="text"
                      name="billingZip"
                      value={sameAddress ? shippingZip : billingZip}
                      onChange={handleChange}
                    />
                  </label>
                  {/* TODO? add email? credit card info? */}
                  {/* <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={sameAddress ? email : billingEmail}
                  onChange={handleChange}
                />
              </label> */}
                </div>

                <button type="submit" onClick={handleSubmit}>
                  Checkout
                </button>
              </form>
            </div>
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
