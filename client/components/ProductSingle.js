/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      reviews: [],
    };
  }

  componentDidMount() {
    const { productId } = this.props.match.params;

    axios
      .get(`api/products/${productId}`)
      .then(res => res.data)
      .then(product => this.setState({ product }));

    axios
      .get(`api/reviews/${productId}`)
      .then(res => res.data)
      .then(reviews => this.setState({ reviews }));
  }

  render() {
    return (
      <div>
        <h1>
          <i>Placeholder for image</i>
        </h1>
        <ul>
          <li>{this.state.product.title}</li>
          <li>{this.state.product.description}</li>
          <li>{this.state.product.price}</li>
        </ul>
        <button type="submit">Add to Cart</button>
        <Link to="/menu">
          <button type="submit">Return to Main Menu</button>
        </Link>
        {this.state.reviews.map(review => {
          return <div key={review.id}>{review.comments}</div>;
        })}
      </div>
    );
  }
}

export default ProductSingle;
