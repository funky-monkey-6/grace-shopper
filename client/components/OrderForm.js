import React from 'react';

class OrderForm extends React.Component {
  constructor() {
    super();
    this.state = {
      status: '',
      type: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="login-div">
        <form onSubmit={this.handleSubmit}>
          <label>Type</label>
          <br />
          <select name="type" onChange={this.handleChange}>
            <option>Delivery</option>
            <option>Pickup</option>
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
        </form>
      </div>
    );
  }
}

export default OrderForm;
