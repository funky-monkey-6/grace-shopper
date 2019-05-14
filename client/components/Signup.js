import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser as thunkCreatorAddUser } from '../store';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
    };
  }

  handleChange = ev => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { history, addUser } = this.props;
    addUser(this.state).then(() => {
      history.push('/login');
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
    } = this.state;

    return (
      <div className="login-div">
        <h4 className="login-input">Enter Sign Up Information:</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="login-input">First Name:</label>
            <br />
            <input
              className="login-input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <br />
            <label className="login-input">Last Name:</label>
            <br />
            <input
              className="login-input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
            <br />
            <label className="login-input">Email:</label>
            <br />
            <input
              className="login-input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="login-input">Password:</label>
            <br />
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="form-group">
            <label className="login-input">Address:</label>
            <br />
            <input
              className="login-input"
              type="shippingAddress"
              name="shippingAddress"
              value={shippingAddress}
              onChange={handleChange}
            />
            <br />
            <label className="login-input">City:</label>
            <br />
            <input
              className="login-input"
              type="shippingCity"
              name="shippingCity"
              value={shippingCity}
              onChange={handleChange}
            />
            <label className="login-input">State:</label>
            <br />
            <input
              className="login-input"
              type="shippingState"
              name="shippingState"
              value={shippingState}
              onChange={handleChange}
            />
            <br />
            <label className="login-input">Zip Code:</label>
            <br />
            <input
              className="login-input"
              type="shippingZip"
              name="shippingZip"
              value={shippingZip}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="login-input btn-signup">
            <input type="submit" value="Sign Up" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addUser: enteredUser => dispatch(thunkCreatorAddUser(enteredUser)) };
};

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
