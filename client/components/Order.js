import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder, fetchOrderItems } from '../store';
import OrderItem from './OrderItem';

class Order extends Component {

	componentDidMount() {
		// const { fetchOrder, fetchOrderItems, user, order } = this.props;
		// TODO grab current logged in user - this.props.user.id
		this.props.fetchOrder(1)
			.then(() => {
				if (this.props.order) {
					this.props.fetchOrderItems(this.props.order.id);
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const { user, order, orderItems } = this.props;
		// console.log(order, orderItems);
		console.log('user: ', user)


		let subtotal = 0;
		if (orderItems) {
			subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
		}
		// TODO save values in db
		const shipping = order.type === 'delivery' ? 5 : 0;

		const total = subtotal + shipping;

		return (
			<div>
				<h2>Bag</h2>
				<table className='table table-striped table-condensed'>
					<thead>
						<tr>
							<th>Product</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Item Subtotal</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{
							orderItems.map(item => {
								return <OrderItem key={item.id} item={item} />;
							})
						}
						<tr>
							<td></td>
							<td></td>
							<td>
								{/* TODO drop down - [delivery, pickup] */}
								Order Type:<br />
								Subtotal:<br />
								Shipping:<br />
								Total:
							</td>
							<td>
								{order.type}<br />
								{subtotal}<br />
								{shipping}<br />
								{total}
							</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user, order, orderItems } = state;
	return {
		user,
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
