import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder, fetchOrderItems } from '../store';

class Order extends Component {

	componentDidMount() {
		const { fetchOrder, fetchOrderItems } = this.props;
		fetchOrder(1)
			// .then(resp => console.log('order: ', resp));
			.then(() => {
				console.log('cart: ', this.props.order.order[0].id);
				if (this.props.order.order[0]) {
					fetchOrderItems(this.props.order.order[0].id);
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const { order, orderItems } = this.props;
		console.log(order, orderItems);
		return (
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>X</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{orderItems.orderItems.map(item => {
							return <td key={item.id}>{item.productId}</td>;
						})}
					</tr>
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = state => {
	const { order, orderItems } = state;
	return {
		order,
		orderItems,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrder: userId => dispatch(fetchOrder(userId)),
		fetchOrderItems: orderId => dispatch(fetchOrderItems(orderId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Order);
