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
    // TODO: what's a more efficient way of doing this (that linter likes)?
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;

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
    const { product, reviews } = this.state;

    return (
      <div>
        <h1>
          <i>Placeholder for image</i>
        </h1>
        <ul>
          <li>{product.title}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
        <button type="submit">Add to Cart</button>
        <Link to="/menu">
          <button type="submit">Return to Main Menu</button>
        </Link>
        {reviews.map(review => {
          return <div key={review.id}>{review.comments}</div>;
        })}
      </div>
    );
  }
}

export default ProductSingle;