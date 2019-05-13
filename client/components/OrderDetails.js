import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrderItems } from '../store';

class OrderDetails extends Component {
  componentDidMount() {
    const { fetchOrderItemsThunk } = this.props;
    fetchOrderItemsThunk(this.props.match.params.orderId);
  }

  render() {
    const { products, orders } = this.props;
    const orderId = +this.props.match.params.orderId;
    const order = orders.find(_order => _order.id === orderId);
    const orderItems = order ? order.orderitems : [];
    console.log('heres the thing: ', order);
    // console.log('lets look at products, now: ', products);

    // put in link route...
    // products.productvariants.find(
    //   prodvar => prodvar.productvariantid === orderItem.productvariantId,
    // ).productid}

    return (
      <div>
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
            {/* {orderItems.map(orderItem => (
              <tr key={orderItem.id}>
                <td>
                  <Link to={`/menu/${1}`}>
                    {products.find(product => product.id === orderItem.productvariantId).title}
                  </Link>
                </td>
                <td>${orderItem.price}</td>
                <td>{orderItem.quantity}</td>
                <td>${orderItem.quantity * orderItem.price}</td>
              </tr>
            ))} */}
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

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderItemsThunk: orderId => dispatch(fetchOrderItems(orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetails);
