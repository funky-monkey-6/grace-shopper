import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';

class AdminOrders extends React.Component {
  componentDidMount = () => {
    this.props.fetchOrders();
  };

  render() {
    console.log(this.props);
    return <div>Hey</div>;
  }
}

const mapStateToProps = state => {
  const { orders } = state;
  return {
    orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminOrders);
