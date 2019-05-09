import React, { Component } from 'react'
import { connect } from 'react-redux'

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
            ccNumber: '',
        };
    }

    handleChange = ev => {
        ev.preventDefault();
        this.setState({ [`${ev.target.name}`]: ev.target.value });
    };

    handleSubmit = ev => {
        ev.preventDefault();
        const { history, checkUser } = this.props;
        checkUser(this.state).then(() => {
            history.push('/');
        });
    };

    render() {
        const { handleChange, handleSubmit } = this;
        const { firstName, lastName, address, city, state, email } = this.state;

        return (
            <div>
                <div>
                    <h4>Enter checkout information below:</h4>
                    <h3>Shipping Information</h3>
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
                      <input type="text" name="address" value={adddress} onChange={handleChange} />
                            </label>
                            <label>
                                City:
                      <input type="text" name="city" value={city} onChange={handleChange} />
                            </label>
                            <label>
                                State:
                      <input type="text" name="state" value={state} onChange={handleChange} />
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
                      <input type="text" name="address" value={adddress} onChange={handleChange} />
                            </label>
                            <label>
                                City:
                      <input type="text" name="city" value={city} onChange={handleChange} />
                            </label>
                            <label>
                                State:
                      <input type="text" name="state" value={state} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                    <input type="text" name="email" value={email} onChange={handleChange} />
                            </label>
                        </div>

                        <input type="submit" value="Checkout" />
                    </form>
                </div>
            </div>
        );
    }

}