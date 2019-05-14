import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders, fetchUsers } from '../store';

class AdminOrders extends React.Component {
  componentDidMount = () => {
    this.props.fetchOrders();
    this.props.fetchUsers();
  };

  render() {
    const { orders } = this.props;
    return (
      <div>
        <br />
        <h2>Orders</h2>
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const user = this.props.users.find(u => u.id === order.userId);
              const userName = user ? `${user.firstName} ${user.lastName}` : '';
              //console.log(`${user.firstName} ${user.lastName}`);
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{userName}</td>
                  <td>{order.status}</td>
                  <td>{order.type}</td>
                  <td>
                    <Link to={`/admin/orders/edit/${order.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button type="submit">X</button>
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
  const { orders, users } = state;
  return {
    orders,
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminOrders);
