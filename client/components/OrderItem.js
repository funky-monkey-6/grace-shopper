import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderItem extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { item, product } = this.props;
		const { price, quantity } = item;
		console.log('item: ', item)
		// console.log('products: ', this.props.products);
		if (!item.price) {
			item.price = product.price;
		}

		const title = product ? product.title : '';
		const itemTotal = item ? price * quantity : 0;
		return (
			<tr>
				<td>{title}</td>
				<td>{item.price}</td>
				<td>{item.quantity}</td>
				<td>{itemTotal}</td>
				<td><a href=''>X</a></td>
			</tr>
		);
	};
	;
}

const mapStateToProps = (state, { item }) => {
	const { products } = state;
	const product = products.find(product => product.id === item.productId)
	console.log('product: ', product)
	console.log('state: ', state);
	return {
		product
	}
};

export default connect(mapStateToProps)(OrderItem);
