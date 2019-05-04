import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder } from '../store';

class Order extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // const { fetchOrder } = this.props;
    // fetchOrder(req.session.userId);
  }

  render() {
    return <div>order</div>;
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
