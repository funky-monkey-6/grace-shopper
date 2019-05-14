import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = props => {
  const { product } = props;
  const variantCount = product.productVariants.length;
  const variantPrices = product.productVariants.map(variant => variant.price);
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
    </div>
  );
};

export default MenuItem;
