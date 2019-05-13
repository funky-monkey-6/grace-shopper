import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderDetails = props => {
  const { orders } = props;
  const orderId = Number(props.match.params.orderId);
  const order = orders.find(_order => _order.id === orderId);
  const orderItems = order ? order.orderitems : [];

  return (
    <div>
      <h2>Order Details </h2>
      <br />
      <div className="row justify-content-start">
        <div className="col-2 ">
          <strong>Order number:</strong>
        </div>
        <div className="col-4">{order ? order.id : ''}</div>
      </div>

      <div className="row justify-content-start">
        <div className="col-2 ">
          <strong>Date:</strong>
        </div>
        <div className="col-4">{order ? new Date(order.date).toLocaleString() : ''}</div>
      </div>

      <div className="row justify-content-start">
        <div className="col-2 ">
          <strong>Status:</strong>
        </div>
        <div className="col-4">{order ? order.status : ''}</div>
      </div>

      <br />

      <table className="table table-striped table-condensed">
        <thead>
          <tr>
            <th>Order Items</th>
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

      <div className="row justify-content-end">
        <div className="col-2 text-right">
          <strong>Subtotal:</strong>
        </div>
        <div className="col-3">{order ? `$${order.subtotal.toFixed(2)}` : ''}</div>
      </div>

      <div className="row justify-content-end">
        <div className="col-2 text-right">
          <strong>Shipping:</strong>
        </div>
        <div className="col-3">{order ? `$${order.shipping.toFixed(2)}` : ''}</div>
      </div>

      <div className="row justify-content-end">
        <div className="col-2 text-right">
          <strong>Total:</strong>
        </div>
        <div className="col-3">{order ? `$${order.total.toFixed(2)}` : ''}</div>
      </div>

      <br />
    </div>
  );
};

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
