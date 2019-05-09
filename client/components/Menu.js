/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, searchProducts, filterProducts } from '../store';

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
    filterProducts: categoryIds => dispatch(filterProducts(categoryIds)),
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
    const { fetchCategories, fetchProducts } = this.props;
    fetchCategories();
    fetchProducts();
  }

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

  // update filterCategories - array containing select categoryIds
  selectFilter = ({ target }) => {
    let { filterCategories } = this.state;
    if (filterCategories.includes(Number(target.value))) {
      filterCategories = filterCategories.filter(cat => cat !== Number(target.value));
    } else {
      filterCategories.push(Number(target.value));
    }
    this.setState({ filterCategories });
  };

  // filter products by selected category
  applyFilter = evt => {
    evt.preventDefault();
    const { filterCategories } = this.state;
    const { filterProducts, fetchProducts } = this.props;
    if (filterCategories.length === 0) {
      fetchProducts();
    } else {
      filterProducts(filterCategories);
    }
  };

  // clear filter
  clearFilter = evt => {
    evt.preventDefault();
    const { fetchProducts } = this.props;
    document.querySelectorAll('input[type=checkbox]').forEach(el => {
      el.checked = false;
    });
    this.setState({ filterCategories: [] });
    fetchProducts();
  };

  render() {
    const { searchTerm } = this.state;
    const { categories, products } = this.props;

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
          <h4>Filter by Category:</h4>
          <form onSubmit={this.applyFilter}>
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
