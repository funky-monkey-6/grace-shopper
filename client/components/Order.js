import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder, fetchOrderItems, updateOrderThunk } from '../store';
import OrderItem from './OrderItem';

class Order extends Component {
	// constructor(props) {
	//   super(props);
	// this.state = {
	// 	type: '',
	// 	subtotal: 0,
	// 	shipping: 0,
	// 	total: 0,
	// 	status: '',
	// 	date: '',
	// 	orderItems: [],
	// 	userId: null,
	// }
	// }

	// componentDidUpdate(prevProps) {
	// 	if (prevProps !== this.props) {

	// 	}
	// }

	componentDidMount() {
		// const { fetchOrder, fetchOrderItems, user, order } = this.props;
		// TODO grab current logged in user - this.props.user.id
		this.props
			.fetchOrder(1)
			.then(() => {
				if (this.props.order) {
					this.props.fetchOrderItems(this.props.order.id);
				}
			})
			.catch(err => console.log(err));
	}

	// setLocalState = () => {
	// 	const { type, subtotal, shipping, total, status, date } = this.props.order;
	// 	const { orderItems, user, order } = this.props;
	// 	this.setState({
	// 		type: order ? type : 'pickup',
	// 		subtotal: order ? subtotal : 0,
	// 		shipping: order ? shipping : 0,
	// 		total: order ? total : 0,
	// 		status: order ? status : '',
	// 		date: order ? date : '',
	// 		orderItems: orderItems ? orderItems : [],
	// 		userId: user ? user.id : null,
	// 	}
	// 		, () => console.log('state from setLocalState: ', this.state))
	// };

	onChange = ev => {
		this.props.updateOrderThunk({
			...this.props.order,
			type: ev.target.value,
		});
	};

	render() {
		const { onChange } = this;
		const { orderItems, order, user, history } = this.props;
		console.log('order: ', order);
		console.log('orderItems: ', orderItems);

		// TODO save values in db for subtotal, shipping, total
		let subtotal = 0;
		if (orderItems) {
			subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
		}
		const shipping = order.type === 'delivery' ? 5 : 0;

		const total = subtotal + shipping;

		return (
			<div>
				<h2>Bag</h2>
				<table className="table table-striped table-condensed">
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
						{orderItems.map(orderItem => {
							return (
								<OrderItem
									key={orderItem.id}
									userId={user.id}
									orderId={order.id}
									orderItem={orderItem}
									history={history}
								/>
							);
						})}
						<tr>
							<td />
							<td />
							<td>
								{/* TODO drop down - [delivery, pickup] */}
								Order Type:
                <br />
								Subtotal:
                <br />
								Shipping:
                <br />
								Total:
              </td>
							<td>
								<select
									name="type"
									value={order.type}
									selected="pickup"
									onChange={onChange}
									className="form-control"
								>
									<option key={1} value="pickup">
										Pickup
                  </option>
									<option key={2} value="delivery">
										Delivery
                  </option>
								</select>
								{order.type}
								<br />
								{subtotal}
								<br />
								{shipping}
								<br />
								{total}
							</td>
							<td />
						</tr>
					</tbody>
				</table>
				<button type='submit'>Start Checkout</button>
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
		updateOrderThunk: order => dispatch(updateOrderThunk(order)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Order);
