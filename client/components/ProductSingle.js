/* eslint-disable react/no-unused-state */
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
import ReviewForm from './ReviewForm';

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      variantId: 0,
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
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { user, order, product, reviews, users } = this.props;
    const { quantity } = this.state;
    const { addOrderItem, handleChange } = this;

    if (!product.id) return null;

    const variants = product.productvariants;

    let price = 0;
    let inventory = 0;
    if (variants.length === 1 || this.state.variantId === 0) {
      price = variants[0].price;
      inventory = variants[0].inventory;
    } else {
      const selectedVariant = variants.find(variant => variant.id === Number(this.state.variantId));
      price = selectedVariant.price;
      inventory = selectedVariant.inventory;
    }

    const inventoryArr = [];
    for (let i = 0; i <= Math.min(inventory, 10); i++) {
      inventoryArr.push(i);
    }

    const orderItem = {
      quantity: Number(quantity),
      price: product.price,
      orderId: order.id,
      productId: product.id,
    };

    return (
      <div>
        <div className="product-single-container">
          <div className="product-single flex-container">
            <div className="product-single-img-container">
              <img src={`/product-images/${product.images}`} className="product-single-img" alt="menu-default" />
            </div>
            <div className="product-single-details">
              <div className="product-single-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
              </div>
              <div className="product-single-pricing">
                <form>
                  {variants.length > 1 ? (
                    <select name="variantId" onChange={handleChange}>
                      {variants.map(variant => {
                        return (
                          <option key={variant.id} value={variant.id}>
                            {variant.variationName}
                          </option>
                        );
                      })}
                    </select>
                  ) : null}
                  <select name="quantity" onChange={handleChange}>
                    {inventoryArr.map(q => {
                      return (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      );
                    })}
                  </select>
                </form>
                <p>Price: {price.toFixed(2)}</p>
                <p>Total: {(price * this.state.quantity).toFixed(2)}</p>
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
              <ReviewForm />
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
