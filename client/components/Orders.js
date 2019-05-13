import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOrders } from '../store/orders';
import { isLoggedIn } from './helperFunctions';

class Orders extends Component {
  componentDidMount() {
    const { fetchOrdersThunk, user } = this.props;
    if (isLoggedIn(user)) fetchOrdersThunk(user.id);
  }

  render() {
    const { orders } = this.props;
    return (
      <div>
        <h2>Order History</h2>
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Subtotal</th>
              <th>Shipping</th>
              <th>Total</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>{order.type}</td>
                  <td>${order.subtotal}</td>
                  <td>${order.shipping}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>

                  <td>
                    <Link to={`/user/orders/${order.id}`}>
                      Order Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, orders } = state;
  return {
    user,
    orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersThunk: userId => dispatch(fetchUserOrders(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
