import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder as fetchOrderThunk, fetchOrderItems, updateOrderThunk } from '../store';

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
      ccNumber: 0,
      sameAddressAsAboveStatus: false,
    };
  }

  componentDidMount = () => {
    const { fetchOrder, user, order } = this.props;
    fetchOrder(user.id);
    fetchOrderItems(order.id);
  };

  handleChange = ev => {
    ev.preventDefault();
    this.setState({ [`${ev.target.name}`]: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    // thunk to update user information
    // thunk to update order to status 'processing'
  };

  sameAsAboveButtons = () => {
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
    //add sameAsAboveButton logic, if checked billing information is same as shipping
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
      sameAddressAsAboveStatus,
    } = this.state;

    // const { order } = this.state.props;
    const { orderItems, order, products } = this.props;

    // TODO save values in db for subtotal, shipping, total
    order.subtotal = 0;
    if (orderItems) {
      order.subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    order.shipping = order.type === 'delivery' ? 5 : 0;
    order.total = order.subtotal + order.shipping;

    const findProduct = (_products, orderItem) =>
      _products.find(_product => _product.id === orderItem.productId);

    return (
      <div>
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
                <input type="text" name="shippingZip" value={shippingZip} onChange={handleChange} />
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
                <input
                  type="checkBox"
                  name="sameAddressAsAboveStatus"
                  checked={sameAddressAsAboveStatus}
                />
                Billing information same as above
              </label>
              <br />
              <label>
                First Name:
                <input
                  type="text"
                  name="billingFirstName"
                  value={sameAddressAsAboveStatus ? firstName : billingFirstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="billingLastName"
                  value={sameAddressAsAboveStatus ? lastName : billingLastName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="billingAddress"
                  value={sameAddressAsAboveStatus ? shippingAddress : billingAddress}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="billingCity"
                  value={sameAddressAsAboveStatus ? shippingCity : billingCity}
                  onChange={handleChange}
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="billingState"
                  value={sameAddressAsAboveStatus ? shippingState : billingState}
                  onChange={handleChange}
                />
              </label>
              <label>
                Zip Code:
                <input
                  type="text"
                  name="billingZip"
                  value={sameAddressAsAboveStatus ? shippingZip : billingZip}
                  onChange={handleChange}
                />
              </label>
              {/* <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={sameAddressAsAboveStatus ? email : billingEmail}
                  onChange={handleChange}
                />
              </label> */}
            </div>

            <input type="submit" value="Checkout" />
          </form>
        </div>
      </div>
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
    updateOrderThunk: order => dispatch(updateOrderThunk(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
