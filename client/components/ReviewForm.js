import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { addProductReview } from '../store/index';

class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      comment: '',
      title: '',
    };
  }

  // update comment/title on state as user enters review
  handleChange = ({ target }) => {
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
    const { product, user } = this.props;
    this.props.addProductReview({
      rating,
      comment,
      title,
      productId: product.id,
      userId: user.id || 1,
    });
    this.setState({
      rating: 0,
      title: '',
      comment: '',
    });
  };

  render() {
    const { rating, title, comment } = this.state;
    const { addReview, onStarClick, handleChange } = this;
    return (
      <div>
        <h2>
          <i className="review-header">Add Review</i>
        </h2>
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
          <div className="md-form">
            <input
              className="form-control menu-search-bar"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <br />
          <label htmlFor="comment">Comments:</label>
          <br />
          <div>
            <textarea
              className="form-control menu-search-bar"
              type="text"
              name="comment"
              value={comment}
              onChange={handleChange}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-secondary">
            Submit Review:
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { product, user } = state;
  return {
    product,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductReview: review => dispatch(addProductReview(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewForm);
