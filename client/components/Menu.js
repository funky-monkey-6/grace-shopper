/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, searchProducts, filterProducts } from '../store';

const mapStateToProps = state => {
  const { products } = state.product;
  const { categories } = state.category;
  return {
    products,
    categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getCategories: () => dispatch(fetchCategories()),
    search: searchTerm => dispatch(searchProducts(searchTerm)),
    filterByCategory: categoryIds => dispatch(filterProducts(categoryIds)),
  };
};

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filterCategories: [],
    };
  }

  componentDidMount() {
    const { getCategories, getProducts } = this.props;
    getCategories();
    getProducts();
  }

  enterSearch = ({ target }) => {
    this.setState({ searchTerm: target.value });
  };

  clearSearch = evt => {
    evt.preventDefault();
    const { getProducts } = this.props;
    this.setState({ searchTerm: '' });
    getProducts();
  };

  searchProducts = evt => {
    evt.preventDefault();
    const { searchTerm } = this.state;
    const { search } = this.props;
    search(searchTerm);
  };

  selectFilter = ({ target }) => {
    let { filterCategories } = this.state;
    if (filterCategories.includes(Number(target.value))) {
      filterCategories = filterCategories.filter(cat => cat !== Number(target.value));
    } else {
      filterCategories.push(Number(target.value));
    }
    this.setState({ filterCategories });
  };

  filterProducts = evt => {
    evt.preventDefault();
    const { filterCategories } = this.state;
    const { filterByCategory } = this.props;
    filterByCategory(filterCategories);
  };

  clearFilter = evt => {
    evt.preventDefault();
    const { getProducts } = this.props;
    this.setState({ filterCategories: [] });
    getProducts();
  };

  render() {
    const { searchTerm } = this.state;
    const { categories, products } = this.props;

    return (
      <div className="menu-page">
        <div className="menu-filter">
          <form onSubmit={this.searchProducts}>
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
          <h4>Filter by Category:</h4>
          <form onSubmit={this.filterProducts}>
            {categories.map(cat => {
              return (
                <div key={cat.id}>
                  <label htmlFor="filterCategories">{cat.name}</label>
                  <input
                    type="checkbox"
                    name="filterCategories"
                    value={cat.id}
                    onChange={this.selectFilter}
                  />
                </div>
              );
            })}
            <button type="submit">Apply Filter</button>
            <button type="reset" onClick={this.clearFilter}>
              Clear Filter
            </button>
          </form>
        </div>
        <div className="menu-list">
          {products.map(prod => {
            return (
              <div key={prod.id} className="menu-item">
                <ul>
                  <li>Placeholder for image</li>
                  <Link to={`/menu/${prod.id}`}>
                    <li>{prod.title}</li>
                  </Link>
                  <li>{prod.description}</li>
                  <li>{prod.price}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
