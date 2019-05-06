import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const { products } = state.product;
  const product = products.find(prod => prod.id === Number(props.match.params.productId));
  return {
    product,
  };
};

const ProductSingle = props => {
  const { product } = props;
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
    </div>
  );
};

export default connect(mapStateToProps)(ProductSingle);
