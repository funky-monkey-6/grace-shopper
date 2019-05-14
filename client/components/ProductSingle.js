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
import Cookies from 'js-cookie';
import {
  fetchProductReviews,
  addProductReview,
  fetchProduct,
  addOrderThunk,
  addOrderItemThunk,
  fetchOrCreateOrderAddItemThunk,
  fetchUsers,
  setCookieCartToState,
} from '../store';
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

  addOrderItem = async (userId, newOrderItem) => {
    // const newOrderItem = {
    //   quantity: Number(quantity),
    //   price,
    // orderId: order.id,
    //   productVariantId,
    // };

    // fetchOrCreateOrderAddItemThunk(userId, newOrderItem)
    // returns cart including new newOrderItem
    // or  cart with just new newOrderItem
    // now have order w/ orderitems
    // updateOrderThunk -
    // use orderitems from other thunk
    // (logic done in thunk) looks at all order items, calculates subtotal & total

    // Order component - pull info from state

    // OrderItem component (Justine)
    // when change qty - update newOrderItem, then updateOrderThunk

    const { fetchOrCreateOrderAddItemThunk, setCookieCartToState } = this.props;

    const currentUserId = Cookies.get('cui');

    if (currentUserId) {
      // loggedIn = true
      fetchOrCreateOrderAddItemThunk(userId, newOrderItem).catch(err => console.log(err));
    } else {
      // guest cart - cookie source of truth (guest db)
      let order = Cookies.getJSON('cart');
      if (!order) {
        // create order
        order = {
          type: 'pickup',
          shipping: 0,
          status: 'cart',
          date: new Date(),
          orderitems: [],
        };
      }

      // add newOrderItem to order
      order.orderitems.push(newOrderItem);

      // TODO if same item, combine into one orderItem
      // order.orderitems.reduce((acc, item) => {
      //   if (newOrderItem.productVariantId === item.productVariantId) {
      //     item.quantity += newOrderItem.quantity;
      //     acc.push(item);
      //   } else {
      //     acc.push(newOrderItem);
      //   }
      //   return acc;
      // }, []);

      order.subtotal = order.orderitems.reduce(
        (total, item) => total + Number(item.quantity) * item.price,
        0,
      );
      order.total = order.subtotal + order.shipping;

      Cookies.set('cart', order);
      // set cart to state
      setCookieCartToState(order);
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

    const variants = product.productVariants;

    let price = 0;
    let inventory = 0;
    let productVariantId = 0;
    if (variants.length === 1 || this.state.variantId === 0) {
      price = variants[0].price;
      inventory = variants[0].inventory;
      productVariantId = variants[0].id;
    } else {
      const selectedVariant = variants.find(variant => variant.id === Number(this.state.variantId));
      price = selectedVariant.price;
      inventory = selectedVariant.inventory;
      productVariantId = selectedVariant.id;
    }

    const inventoryArr = [];
    for (let i = 0; i <= Math.min(inventory, 10); i++) {
      inventoryArr.push(i);
    }

    const orderItem = {
      quantity: Number(quantity),
      price,
      // orderId: order.id,
      productVariantId,
    };

    return (
      <div>
        <div className="product-single-container">
          <div className="product-single flex-container">
            <div className="product-single-img-container">
              <img
                src={`/product-images/${product.images}`}
                className="product-single-img"
                alt="menu-default"
              />
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
                  onClick={() => addOrderItem(user.id, orderItem)}
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
    fetchOrCreateOrderAddItemThunk: (userId, orderItem) =>
      dispatch(fetchOrCreateOrderAddItemThunk(userId, orderItem)),
    fetchProductReviews: id => dispatch(fetchProductReviews(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    addProductReview: review => dispatch(addProductReview(review)),
    setCookieCartToState: order => dispatch(setCookieCartToState(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
