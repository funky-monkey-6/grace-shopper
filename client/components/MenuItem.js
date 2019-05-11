import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = props => {
  const { product } = props;
  return (
    <div key={product.id} className="menu-item">
      <img src="default.jpg" className="menu-img" alt="menu-default" />
      <Link to={`/menu/product/${product.id}`}>
        <h5>{product.title}</h5>
      </Link>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default MenuItem;
