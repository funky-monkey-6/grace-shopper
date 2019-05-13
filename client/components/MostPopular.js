/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchProducts, fetchProductVariants } from '../store';
import MenuItem from './MenuItem';

const mapStateToProps = state => {
  const { products, productVariants } = state;
  return {
    products,
    productVariants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductVariants: () => dispatch(fetchProductVariants()),
  };
};

class MostPopular extends React.Component {
  constructor() {
    super();
    this.state = {
      orderItems: [],
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchProductVariants();
    // TODO change to thunk
    axios
      .get('api/orderItems')
      .then(res => res.data)
      .then(orderItems => this.setState({ orderItems }));
  }

  filterPopular = orderItems => {
    const mostPopular = [];
    const { products, productVariants } = this.props;
    console.log(orderItems);

    // logic to get productIds with highest quantity ordered, from all orderItems:
    orderItems.reduce((sumsByItem, orderItem) => {
      if (!sumsByItem[orderItem.productvariantId]) {
        // eslint-disable-next-line no-param-reassign
        sumsByItem[orderItem.productvariantId] = {
          productvariantId: orderItem.productvariantId,
          quantity: 0,
        };
        mostPopular.push(sumsByItem[orderItem.productvariantId]);
      }
      // eslint-disable-next-line no-param-reassign
      sumsByItem[orderItem.productvariantId].quantity += orderItem.quantity;
      return sumsByItem;
    }, {});

    mostPopular.sort((a, b) => (b.quantity > a.quantity ? 1 : -1));

    //adjust the second slice index to change how many productIds are returned:
    const numProductsDisplayed = 4;

    const mostPopularVariantIds = mostPopular
      .slice(0, numProductsDisplayed)
      .reduce((accum, curVal) => {
        accum.push(curVal.productvariantId);
        return accum;
      }, []);

    const mostPopularVariants = productVariants.filter(variant =>
      mostPopularVariantIds.includes(variant.id),
    );

    const mostPopularProductIds = mostPopularVariants.map(variant => variant.product.id);
    const mostPopularProducts = mostPopularProductIds.map(productId => {
      return products.find(prod => prod.id === productId);
    });

    return mostPopularProducts;
  };

  render() {
    const { orderItems } = this.state;
    const { filterPopular } = this;
    return (
      <div>
        <br />
        <h4>Popular menu items</h4>
        <div className="menu-list">
          {filterPopular(orderItems).map(prod => {
            return <MenuItem product={prod} key={prod.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostPopular);
