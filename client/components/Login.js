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
        <div>
          <h4>Enter login information below:</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Email:
                <input type="text" name="email" value={email} onChange={handleChange} />
              </label>
            </div>

            <div className="form-group">
              <label>
                Password:
                <input type="text" name="password" value={password} onChange={handleChange} />
              </label>
            </div>

            <input type="submit" value="Login" />
          </form>
        </div>
        <div>
          Or create a new account: <br />
          <button type="submit" onClick={this.routeChange}>
            Create New Account
          </button>
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
