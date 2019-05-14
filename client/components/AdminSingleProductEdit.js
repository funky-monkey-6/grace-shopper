import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, updateSingleProduct } from '../store/index';
import AdminSingleVariantEdit from './AdminSingleVariantEdit';

class AdminSingleProductEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      images: null,
      variantSelectedId: '',
    };
  }

  componentDidMount = () => {
    const { productId } = this.props.match.params;
    // eslint-disable-next-line no-shadow
    const { fetchProduct } = this.props;
    fetchProduct(productId);
  };

  // update comment/title on state as user enters review
  handleChangeProduct = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.value,
    });
    console.log(this.state);
  };

  handleProductSubmit = () => {
    const { id, title, description, images } = this.props.product;
    updateSingleProduct(id, {
      title: this.state.title || title,
      description: this.state.description || description,
      images: this.state.images || images,
    }).then(() => fetchProduct(id));
  };

  handleVariantSelect = ev => {
    console.log(ev.target.value);
    this.setState({ variantSelectedId: ev.target.value });
    console.log(this.state.variantSelectedId);
  };

  render() {
    const product = this.props.product || [];
    const variants = this.props.product.productVariants || [];
    console.log(variants);
    return (
      <div>
        <h2>{product.title}</h2>
        {product ? (
          <form onSubmit={this.handleProductSubmit}>
            <div className="form-group">
              <label>
                Product Name:
                <input
                  type="text"
                  name="title"
                  value={this.state.title ? this.state.title : product.title || ''}
                  onChange={this.handleChangeProduct}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Product Description:
                <input
                  type="textarea"
                  name="description"
                  value={
                    this.state.description ? this.state.description : product.description || ''
                  }
                  onChange={this.handleChangeProduct}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Product Image URL:
                <input
                  type="text"
                  name="images"
                  value={this.state.images ? this.state.images : product.images || ''}
                  onChange={this.handleChangeProduct}
                />
              </label>
            </div>
            <input type="submit" value="Update Product" />
          </form>
        ) : null}
        {variants.length > 1 ? (
          <form>
            <label>
              Edit a product variation:
              <select onChange={this.handleVariantSelect}>
                {variants.map(variant => (
                  <option key={variant.id} value={variant.id}>
                    {variant.variationName}
                  </option>
                ))}
              </select>
            </label>
          </form>
        ) : (
            'There are no product variants'
          )}
        {this.state.variantSelectedId ? (
          <AdminSingleVariantEdit variantId={this.state.variantSelectedId} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { product } = state;
  return {
    product,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSingleProductEdit);
