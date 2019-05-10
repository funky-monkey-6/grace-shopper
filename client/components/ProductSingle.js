/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import {
  fetchProductReviews,
  addProductReview,
  fetchProduct,
  addOrderThunk,
  addOrderItemThunk,
} from '../store/index';
import { isCart } from './helperFunctions';

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      comment: '',
    };
  }

  componentDidMount = () => {
    const { productId } = this.props.match.params;
    const { fetchProduct, fetchProductReviews } = this.props;
    fetchProductReviews(productId);
    fetchProduct(productId);
  };

  addOrderItem = async (userId, order, orderItem) => {
    let newOrder = {};
    try {
      if (!isCart(order)) {
        const newOrderObj = {
          type: 'pickup',
          status: 'cart',
          subtotal: orderItem.price * orderItem.quantity,
          shipping: 0,
          total: orderItem.price * orderItem.quantity,
        };
        const newOrderData = await axios.post(`/api/users/${userId}/orders`, newOrderObj);
        newOrder = newOrderData.data;
      }

      const currOrder = !isCart(order) ? newOrder : this.props.order;
      console.log({ currOrder });
      await this.props.addOrderItemThunk(userId, currOrder.id, orderItem);
    } catch (err) {
      console.log(err);
    }
  };

  // post a new review
  addReview = evt => {
    evt.preventDefault();
    const { rating, comment } = this.state;
    const { addProductReview, product } = this.props;
    addProductReview({
      rating,
      comment,
      productId: product.id,
      userId: 1,
    });
  };

  handleReviewChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
    console.log(this.state);
  };

  render() {
    const { user, order, product, reviews } = this.props;
    const { rating } = this.state;
    const { addOrderItem, onStarClick } = this;
    const orderItem = {
      quantity: 1,
      price: product.price,
      orderId: order.id,
      productId: product.id,
    };

    if (!product) return null;
    return (
      <div>
        <div className="product-single-container">
          <div className="product-single">
            <img src="default.jpg" className="product-single-img" alt="default" />
            <div className="product-single-details">
              <div className="product-single-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
              </div>
              <div className="product-single-pricing">
                <p>{product.price ? `$${product.price.toFixed(2)}` : 'NA'}</p>
                {/* userId, order, orderItem */}
                <button
                  type="submit"
                  onClick={() => addOrderItem(user.id, order, orderItem)}
                  className="btn btn-secondary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews">
          <div className="review-form">
            <h1>
              <i>Add Review</i>
            </h1>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
            />
            <form onSubmit={this.addReview}>
              <br />
              <label htmlFor="rating">Comments:</label>
              <br />
              <textarea
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={this.handleReviewChange}
              />
              <br />
              <button type="submit" className="btn btn-secondary">
                Submit Review:
              </button>
            </form>
          </div>
          <div className="review-list">
            <h1>
              <i>Reviews</i>
            </h1>
            {reviews.map(review => {
              const { id, rating, comment } = review;
              return (
                <div className="review-card" key={id}>
                  <StarRatingComponent name="rating" editing={false} starCount={5} value={rating} />
                  <p>{comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, order, product, reviews } = state;
  return {
    order,
    user,
    product,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrderThunk: (userId, order) => dispatch(addOrderThunk(userId, order)),
    addOrderItemThunk: (userId, orderId, orderItem) =>
      dispatch(addOrderItemThunk(userId, orderId, orderItem)),
    fetchProductReviews: id => dispatch(fetchProductReviews(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    addProductReview: review => dispatch(addProductReview(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);

// TODO: add the star rating
