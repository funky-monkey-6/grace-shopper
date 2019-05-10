import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder as fetchOrderThunk } from '../store/order'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            shippingAddress: '',
            shippingCity: '',
            shippingState: '',
            billingFirstName: '',
            billingLastName: '',
            billingAddress: '',
            billingCity: '',
            billingState: '',
            billingEmail: '',
            ccNumber: '',
            sameAddressAsAboveStatus: false,
        };
    }

    componentDidMount = () => {
        const { fetchOrder, user } = this.props
        fetchOrder(user.id);
    }

    handleChange = ev => {
        ev.preventDefault();
        this.setState({ [`${ev.target.name}`]: ev.target.value });
    };

    handleSubmit = ev => {
        ev.preventDefault();

    };

    sameAsAboveButtons = () => {
        const { firstName, lastName, shippingAddress, shippingCity,
            shippingState, billingFirstName, billingLastName,
            billingAddress, billingCity, billingState } = this.state;
        ///add sameAsAboveButton logic, if checked billing information is same as shipping
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { firstName, lastName, shippingAddress, shippingCity, shippingState, email, sameAddressAsAboveStatus } = this.state;
        //const { order } = this.state.props;

        return (
            <div>
                <div>
                    <h4>Enter checkout information below:</h4>
                    <h3>Delivery Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                First Name:
                      <input type="text" name="firstName" value={firstName} onChange={handleChange} />
                            </label>
                            <label>
                                Last Name:
                      <input type="text" name="lastName" value={lastName} onChange={handleChange} />
                            </label>
                            <label>
                                Address:
                      <input type="text" name="address" value={shippingAddress} onChange={handleChange} />
                            </label>
                            <label>
                                City:
                      <input type="text" name="city" value={shippingCity} onChange={handleChange} />
                            </label>
                            <label>
                                State:
                      <input type="text" name="state" value={shippingState} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                    <input type="text" name="email" value={email} onChange={handleChange} />
                            </label>
                        </div>

                        <input type="submit" value="Checkout" />
                    </form>
                </div>
                <div>
                    <h3>Billing Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Billing information same as above
                            <input type="check" name="sameAddressAsAboveStatus" checked={sameAddressAsAboveStatus} />
                            </label>
                            <label>
                                First Name:
                      <input type="text" name="firstName" value={sameAddressAsAboveStatus ? firstName : billingFirstName} onChange={handleChange} />
                            </label>
                            <label>
                                Last Name:
                      <input type="text" name="lastName" value={sameAddressAsAboveStatus ? lastName : billingLastName} onChange={handleChange} />
                            </label>
                            <label>
                                Address:
                      <input type="text" name="address" value={sameAddressAsAboveStatus ? shippingAdddress : billingAddress} onChange={handleChange} />
                            </label>
                            <label>
                                City:
                      <input type="text" name="city" value={sameAddressAsAboveStatus ? shippingCity : billingCity} onChange={handleChange} />
                            </label>
                            <label>
                                State:
                      <input type="text" name="state" value={sameAddressAsAboveStatus ? shippingState : billingState} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                    <input type="text" name="email" value={sameAddressAsAboveStatus ? email : billingEmail} onChange={handleChange} />
                            </label>
                        </div>

                        <input type="submit" value="Checkout" />
                    </form>
                </div>

                <h4> Review order: </h4>

            </div>
        );
    }

}

const mapStateToProps = state => {
    const { user, order } = state;
    return {
        user,
        order,
    };
};

const mapDispatchToProps = dispatch => {
    return { fetchOrder: (id) => dispatch(fetchOrderThunk(id)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)