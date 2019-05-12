import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = props => {
  const { product } = props;
  const variantCount = product.productvariants.length;
  const variantPrices = product.productvariants.map(variant => variant.price);
  return (
    <div className="menu-item">
      <img src={`/product-images/${product.images}`} className="menu-img" alt="menu-default" />
      <Link to={`/menu/product/${product.id}`}>
        <h5 className="product-title">{product.title}</h5>
      </Link>
      <p>{product.description}</p>
      <p>
        {variantCount === 1
          ? `$${variantPrices[0].toFixed(2)}`
          : `$${Math.min(...variantPrices).toFixed(2)}+ (multiple sizes)`}
      </p>
      <button type="submit" className="btn btn-secondary">
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
