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
    const { firstName, lastName, email, password } = this.state;

    return (
      <div>
        <div>
          <h4>Enter sign-up information below:</h4>
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
                Email:
                <input type="email" name="email" value={email} onChange={handleChange} />
              </label>
            </div>

            <div className="form-group">
              <label>
                Password:
                <input type="password" name="password" value={password} onChange={handleChange} />
              </label>
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
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
