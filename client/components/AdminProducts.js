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

  deleteButton = productId => {
    const { fetchProducts } = this.props;
    deleteProduct(productId).then(() => fetchProducts());
  };

  render() {
    const { searchTerm } = this.state;
    const { products } = this.props;

    return (
      <div className="menu">
        <div>
          <div className="menu navigation-menu">
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
            <h2>Product Inventory</h2>
            <Link to="/admin/addProduct">
              <button type="button"> Add Product </button>
            </Link>
            <table className="table table-striped table-condensed">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
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
                      <td>{product.inventory}</td>
                      <td>
                        <button type="submit" onClick={() => this.deleteButton(product.id)}>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminDash);
