import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderDetails extends Component {
  render() {
    const { orders } = this.props;
    const orderId = +this.props.match.params.orderId;
    const order = orders.find(_order => _order.id === orderId);
    const orderItems = order ? order.orderitems : [];

    return (
      <div>
        <h2>Order Details</h2>
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
            {orderItems.map(orderItem => (
              <tr key={orderItem.id}>
                <td>
                  <Link to={`/menu/product/${orderItem.productvariant.productId}`}>
                    {orderItem.productvariant.productName}
                  </Link>
                </td>
                <td>${orderItem.price}</td>
                <td>{orderItem.quantity}</td>
                <td>${orderItem.quantity * orderItem.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, orders, products } = state;
  return {
    user,
    orders,
    products,
  };
};

export default connect(
  mapStateToProps,
  null,
)(OrderDetails);
