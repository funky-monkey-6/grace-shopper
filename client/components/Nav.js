import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut as logOutActionCreator } from '../store';

class Nav extends Component {
  onClick = () => {
    const { logOut } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    logOut().then(() => <Redirect to="/" />);
  };

  render() {
    let buttonStatus;
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
          <Link to="/cart" className="nav-item">
            Bag
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
