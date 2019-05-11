/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  searchProducts,
  filterCategories,
  filterProducts,
} from '../store';
import MenuItem from './MenuItem';

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
    filterCategories: categoryIds => dispatch(filterCategories(categoryIds)),
    filterProducts: categoryIds => dispatch(filterProducts(categoryIds)),
  };
};

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filterCategoryIds: [],
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

  // TODO: filter on categoryId not productId so that menu organization is maintained
  // update filterCategoryIds - array containing select categoryIds
  selectFilter = ({ target }) => {
    let { filterCategoryIds } = this.state;
    if (filterCategoryIds.includes(Number(target.value))) {
      filterCategoryIds = filterCategoryIds.filter(cat => cat !== Number(target.value));
    } else {
      filterCategoryIds.push(Number(target.value));
    }
    this.setState({ filterCategoryIds });
  };

  // filter products by selected category
  applyFilter = evt => {
    evt.preventDefault();
    const { filterCategoryIds } = this.state;
    const { filterProducts, fetchProducts } = this.props;
    if (filterCategoryIds.length === 0) {
      fetchProducts();
    } else {
      filterProducts(filterCategoryIds);
    }
  };

  // clear filter
  clearFilter = evt => {
    evt.preventDefault();
    const { fetchProducts } = this.props;
    document.querySelectorAll('input[type=checkbox]').forEach(el => {
      el.checked = false;
    });
    this.setState({ filterCategoryIds: [] });
    fetchProducts();
  };

  // TODO: add category headers to menu
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
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
            <button type="submit" onClick={this.clearSearch} className="btn btn-secondary">
              Clear Search
            </button>
          </form>
          <h4>Filter by Category:</h4>
          <form onSubmit={this.applyFilter}>
            {categories.map(cat => {
              return (
                <div key={cat.id} className="filter-cat">
                  <label htmlFor="filterCategoryIds">{cat.name}</label>
                  <input
                    type="checkbox"
                    name="filterCategoryIds"
                    value={cat.id}
                    onChange={this.selectFilter}
                  />
                </div>
              );
            })}
            <button type="submit" className="btn btn-secondary">
              Apply Filter
            </button>
            <button type="reset" onClick={this.clearFilter} className="btn btn-secondary">
              Clear Filter
            </button>
          </form>
        </div>
        <div className="menu-list">
          {products.map(prod => {
            return <MenuItem product={prod} />;
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
