import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, searchProducts, deleteProduct } from '../store';

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const { fetchCategories, fetchProducts } = this.props;
    fetchCategories();
    fetchProducts();
  }

  // componentDidUpdate() {
  //   const { fetchProducts } = this.props;
  //   fetchProducts();
  // }

  // update search term on state
  enterSearch = ({ target }) => {
    this.setState({ searchTerm: target.value });
  };

  // clear user search
  clearSearch = evt => {
    evt.preventDefault();
    const { fetchProducts } = this.props;
    this.setState({ searchTerm: '' });
    fetchProducts();
  };

  // filter products by search term
  applySearch = evt => {
    evt.preventDefault();
    const { searchTerm } = this.state;
    const { searchProducts } = this.props;
    searchProducts(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    const { products } = this.props;

    return (
      <div className="menu-page">
        <div className="menu-filter">
          <form onSubmit={this.applySearch}>
            <label htmlFor="searchItems">
              <h4>Search Products:</h4>
            </label>
            <input
              type="search"
              name="searchItems"
              value={searchTerm}
              onChange={this.enterSearch}
            />
            <button type="submit">Search</button>
            <button type="submit" onClick={this.clearSearch}>
              Clear Search
            </button>
          </form>
        </div>
        <div>
          <h2 className="col-sm">Product Inventory</h2>
          <Link to="/admin/addProduct">
            <button type="button"> Add Product </button>
          </Link>
          <table className="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                return (
                  <tr key={product.id}>
                    <td>
                      {product.title} <Link to={`/admin/productEdit/${product.id}`}>(edit)</Link>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button type="submit" onClick={() => this.props.deleteProduct(product.id)}>
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { products, categories } = state;
  return {
    products,
    categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    searchProducts: searchTerm => dispatch(searchProducts(searchTerm)),
    deleteProduct: productId => dispatch(deleteProduct(productId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminDash);
