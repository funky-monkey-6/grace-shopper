import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, addCategory, updateProduct } from '../store';

class AdminCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCategories, fetchProducts } = this.props;
    fetchCategories();
    fetchProducts();
  }

  handleCategoryChangeSubmit = (ev, productId) => {
    updateProduct(productId, ev.target.value).then(() =>
      this.props.fetchCategories().then(() => this.props.fetchProducts()),
    );
  };

  newCategoryChange = ev => {
    ev.preventDefault();
    this.setState({ name: ev.target.value });
  };

  handleNewCategorySubmit = ev => {
    ev.preventDefault();
    addCategory(this.state).then(() => this.props.fetchCategories());
  };

  render() {
    const { products, categories } = this.props;

    return (
      <div>
        <div>
          <h2>Add category</h2>
          <form onSubmit={this.handleNewCategorySubmit}>
            <div className="form-group">
              <label>
                Category Name:
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.newCategoryChange}
                />
              </label>
              <input type="submit" value="Add Category" />
            </div>
          </form>
        </div>
        <div>
          <h2>Categories</h2>
          {categories.map(category => {
            return (
              <div>
                <h4>{category.name}</h4>
                <table key={category.name} className="table table-striped table-condensed">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Change Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(product => {
                        return product.categoryId === category.id;
                      })
                      .map(product => {
                        return (
                          <tr>
                            <td key={product.title}>{product.title}</td>
                            <td key={product.id}>
                              <form>
                                <select
                                  value={category.id}
                                  name={this.state.selectedCategory}
                                  onChange={ev => this.handleCategoryChangeSubmit(ev, product.id)}
                                >
                                  {categories.map(singleCategory => (
                                    <option value={singleCategory.id} name={category.name}>
                                      {singleCategory.name}
                                    </option>
                                  ))}
                                </select>
                              </form>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminCategories);
