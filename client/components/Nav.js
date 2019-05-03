
import React from 'react';
import { Link } from 'react-router-dom';

// TODO: if user is logged in, Login -> Logout

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="nav-menu">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/menu" className="nav-item">Menu</Link>
            </div>
            <div className="nav-login">
                <Link to="/" className="nav-item">Login</Link>
                <Link to="/" className="nav-item">Cart</Link>
            </div>
        </nav>
    )
}

export default Nav;
