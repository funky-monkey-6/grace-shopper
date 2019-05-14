import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateOrderThunk, fetchProductVariants } from '../store';

class OrderForm extends React.Component {
  constructor() {
    super();
    this.state = {
      order: {},
      status: '',
      type: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
    };
  }

  componentDidMount = () => {
    this.props.fetchProductVariants();
    const orderId = Number(this.props.match.params.orderId);
    axios
      .get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        const { status, type, shippingAddress, shippingCity, shippingState, shippingZip } = order;
        this.setState({
          order,
          status,
          type,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip,
        });
      });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { status, type, shippingAddress, shippingCity, shippingState, shippingZip } = this.state;
    const newOrder = {
      status,
      type,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
    };
    this.props.updateOrderThunk(newOrder);
  };

  render() {
    const { order } = this.state;
    if (!order.orderitems) return null;
    console.log(this.props);
    return (
      <div>
        <h2>Edit Order:</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <b>Order Details:</b>
          </p>
          <label>Type</label>
          <br />
          <select name="type" onChange={this.handleChange}>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>
          <br />
          <label>Status</label>
          <br />
          <select name="status" onChange={this.handleChange} selected={this.state.status}>
            <option value="cart">Cart</option>
            <option value="processing">Processing</option>
            <option value="on hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
          <br />
          <p>
            <b>Shipping Address:</b>
          </p>
          <label htmlFor="shippingAddress">Address:</label>
          <br />
          <input
            className="form-control address-order-form"
            name="shippingAddress"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="shippingCity">City</label>
          <br />
          <input
            className="form-control address-order-form"
            name="shippingCity"
            value={this.state.shippingCity}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="shippingState">State:</label>
          <br />
          <input
            className="form-control address-order-form"
            name="shippingState"
            value={this.state.shippingState}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="shippingZip">Zip:</label>
          <br />
          <input
            className="form-control address-order-form"
            name="shippingZip"
            value={this.state.shippingZip}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <p>
            <b>Order Items:</b>
          </p>
          <table className="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Item Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderitems.map(item => {
                const variant = this.props.productVariants.find(
                  prod => prod.id === item.productvariantId,
                );
                return (
                  <tr key={item.id}>
                    <td>{variant ? variant.product.title : ''}</td>
                    <td>{variant ? variant.variationName : ''}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
        <button type="submit" className="btn btn-secondary">
          Update Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { productVariants } = state;
  return {
    productVariants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrderThunk: order => dispatch(updateOrderThunk(order)),
    fetchProductVariants: () => dispatch(fetchProductVariants()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderForm);
