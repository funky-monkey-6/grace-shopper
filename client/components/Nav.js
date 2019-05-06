import React from 'react';
import { Link } from 'react-router-dom';

// TODO: if user is logged in, Login -> Logout and signup disappears

const Nav = () => {
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
        <Link to="/login" className="nav-item">
          Login
        </Link>
        <Link to="/signup" className="nav-item">
          Signup
        </Link>
        <Link to="/bag" className="nav-item">
          Bag
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
