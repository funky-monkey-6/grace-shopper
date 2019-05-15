import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleVariant, updateSingleVariant } from '../store';

class AdminSingleVariantEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variationName: null,
      inventory: null,
      price: null,
    };
  }

  componentDidMount = () => {
    //console.log(this.props.variant);
  };

  handleVariantChange = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  handleVariantSubmit = () => {
    const { id, variationName, inventory, price } = this.props.variant[0];
    updateSingleVariant(id, {
      title: this.state.variationName || variationName,
      description: this.state.inventory || inventory,
      images: this.state.price || price,
    });
  };

  render() {
    const { variationName, inventory, price } = this.props.variant[0];
    return (
      <form onSubmit={this.handleVariantSubmit}>
        <div className="form-group">
          <label>
            Variant Name:
            <input
              type="text"
              name="variationName"
              value={this.state.variationName ? this.state.variationName : variationName}
              onChange={this.handleVariantChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Inventory:
            <input
              type="text"
              name="inventory"
              value={this.state.inventory ? this.state.inventory : inventory}
              onChange={this.handleVariantChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={this.state.price ? this.state.price : price}
              onChange={this.handleVariantChange}
            />
          </label>
        </div>
        <input type="submit" value="Update Variant" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { productVariant } = state;
  return {
    productVariant,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleVariant: id => dispatch(fetchSingleVariant(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSingleVariantEdit);
