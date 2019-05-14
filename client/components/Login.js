import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkUser as checkUserActionCreator } from '../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    document.getElementById('email').focus();
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

  routeChange = () => {
    const { history } = this.props;
    history.push('/signup');
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password } = this.state;

    return (
      <div>
        <div className="login-div">
          <h4 className="login-input">Enter login information below:</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="login-input">Email:</label>
              <br />
              <input
                className="login-input"
                type="text"
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
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="login-input btn-container">
              <input className="btn btn-secondary" type="submit" value="Login" />
              <button type="submit" className="btn btn-secondary" onClick={this.routeChange}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkUser: user => dispatch(checkUserActionCreator(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
