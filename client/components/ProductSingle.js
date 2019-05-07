/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { fetchProductReviews, fetchProduct } from '../store';

const mapStateToProps = state => {
  const { product } = state.product;
  const { reviews } = state.reviews;
  return {
    product,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProductReviews: id => dispatch(fetchProductReviews(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
  };
};

class ProductSingle extends React.Component {
  componentDidMount = () => {
    const { productId } = this.props.match.params;
    const { fetchProduct, fetchProductReviews } = this.props;
    fetchProductReviews(productId);
    fetchProduct(productId);
  };

  render() {
    const { product, reviews } = this.props;
    if (!product) return null;
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
        <div>
          <h1>
            <i>Reviews</i>
          </h1>
          {reviews.map(review => {
            const { id, rating, comment } = review;

            return (
              <ul key={id}>
                <li>{rating}</li>
                <li>{comment}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
