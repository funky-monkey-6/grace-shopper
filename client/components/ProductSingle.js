/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import {
  fetchProductReviews,
  addProductReview,
  fetchProduct,
  addOrderThunk,
  addOrderItemThunk,
  fetchUsers,
} from '../store/index';
import { isCart } from './helperFunctions';

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      title: '',
      comment: '',
    };
  }

  componentDidMount = () => {
    const { productId } = this.props.match.params;
    const { fetchProduct, fetchProductReviews, fetchUsers } = this.props;
    fetchProductReviews(productId);
    fetchProduct(productId);
    fetchUsers();
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

  // update comment/title on state as user enters review
  handleReviewChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  // update rating based on selected stars
  onStarClick = rating => {
    this.setState({ rating });
  };

  // post review to database
  addReview = evt => {
    evt.preventDefault();
    const { rating, comment, title } = this.state;
    const { addProductReview, product, user } = this.props;
    addProductReview({
      rating,
      comment,
      title,
      productId: product.id,
      userId: user.id,
    });
    this.setState({
      rating: 0,
      title: '',
      comment: '',
    });
  };

  render() {
    const { user, order, product, reviews, users } = this.props;
    const { rating, title, comment } = this.state;
    const { addOrderItem, onStarClick, handleReviewChange, addReview } = this;
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
            {user.id ? (
              <div>
                <h1>
                  <i>Add Review</i>
                </h1>
                <StarRatingComponent
                  name="rating"
                  starCount={5}
                  value={rating}
                  onStarClick={onStarClick}
                  renderStarIcon={() => (
                    <span>
                      <h4>★</h4>
                    </span>
                  )}
                />
                <form onSubmit={addReview}>
                  <br />
                  <label htmlFor="title">Review Title:</label>
                  <br />
                  <input type="text" name="title" value={title} onChange={handleReviewChange} />
                  <br />
                  <label htmlFor="comment">Comments:</label>
                  <br />
                  <textarea
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleReviewChange}
                  />
                  <br />
                  <button type="submit" className="btn btn-secondary">
                    Submit Review:
                  </button>
                </form>
              </div>
            ) : (
              <Link to="/login">
                <button type="submit" className="btn btn-secondary">
                  Login to add review:
                </button>
              </Link>
            )}
          </div>
          <div className="review-list">
            <h1>
              <i>Reviews</i>
            </h1>
            {reviews.map(review => {
              const { id, rating, comment, userId } = review;
              const user = users.filter(u => u.id === userId)[0];
              return (
                <div className="review-card" key={id}>
                  <h5>
                    <i>{review.title}</i>
                  </h5>
                  <p>
                    <i>{user ? `${user.firstName} ${user.lastName}` : 'Anonymous'}</i>
                  </p>
                  <StarRatingComponent
                    name="rating"
                    editing={false}
                    starCount={5}
                    value={rating}
                    renderStarIcon={() => (
                      <span>
                        <h4>★</h4>
                      </span>
                    )}
                  />
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
  const { user, order, product, reviews, users } = state;
  return {
    order,
    user,
    product,
    reviews,
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrderThunk: (userId, order) => dispatch(addOrderThunk(userId, order)),
    addOrderItemThunk: (userId, orderId, orderItem) =>
      dispatch(addOrderItemThunk(userId, orderId, orderItem)),
    fetchProductReviews: id => dispatch(fetchProductReviews(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    addProductReview: review => dispatch(addProductReview(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
