
import React from 'react';
import axios from 'axios';

class ProductSingle extends React.Component {

    constructor() {
        super();
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        axios.get(`api/products/${this.props.match.params.productId}`)
            .then(res => res.data)
            .then(product => this.setState({ product }))
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1><i>Placeholder for image</i></h1>
                <ul>
                    <li>{this.state.product.title}</li>
                    <li>{this.state.product.description}</li>
                    <li>{this.state.product.price}</li>
                </ul>
                <button>Add to Cart</button>
            </div>
        )
    }
}


export default ProductSingle;
