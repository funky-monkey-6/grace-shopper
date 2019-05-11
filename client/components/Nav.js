/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
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
      <Fragment>
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
            {/* TODO isLoggedIn(user) = true - then show Account and Orders  */}
            <NavLink to="/user/account" className="nav-item">
              Account
            </NavLink>
            <NavLink to="/user/orders" className="nav-item">
              Orders
            </NavLink>
            {/* end isLoggedIn */}

            {buttonStatus}
            <Link to="/bag" className="nav-item">
              Bag
            </Link>
          </div>
        </nav>

        {/* TODO isAdmin(user) then display: */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="nav-admin">
            <span className="nav-item">Admin:</span>
            <NavLink to="/admin/dash" className="nav-item" activeClassName="active">
              Admin Dashboard
            </NavLink>
          </div>
        </nav>
      </Fragment>
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
