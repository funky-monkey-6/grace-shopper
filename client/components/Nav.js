import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut as logOutActionCreator } from '../store';

class Nav extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    this.state = { isLoggedIn: this.props.user.id ? true : false };
  }

  onClick = () => {
    const { history, logOut } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    logOut()
      .then(() => <Redirect to="/" />)
      // eslint-disable-next-line react/destructuring-assignment
      .then(() => console.log(this.state.isLoggedIn));
  };

  render() {
    let buttonStatus;
    console.log(this.props.user)
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.props.user.id) {
      buttonStatus = (
        <Link to="/login" className="nav-item">
          Login
        </Link>
      );
    } else {
      buttonStatus = (
        <button type="submit" onClick={this.onClick}>
          Log out
        </button>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="nav-menu">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/menu" className="nav-item">
            Menu
          </Link>
        </div>
        <div className="nav-login">
          {buttonStatus}
          <Link to="/" className="nav-item">
            Cart
          </Link>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOutActionCreator()),
  };
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
