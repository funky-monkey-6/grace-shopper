/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Menu from './Menu';
import Login from './Login';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
import Order from './Order';
import Checkout from './Checkout';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories'
import { setSessionThunk, getCurrentUser } from '../store';

class App extends Component {
  componentDidMount() {
    // grab session cookie and put on state
    const session = Cookies.get('session');
    const currentUserId = Cookies.get('cui');

    const { setSessionThunk, getCurrentUser } = this.props;
    if (session) {
      setSessionThunk(session);
    }
    if (currentUserId !== undefined) {
      console.log('getting current user...');
      getCurrentUser();
    }
  }

  render() {
    return (
      <Router>
        <header id="main-header">
          <div id="site-name" className="flex-container">
            Lovin Today
          </div>
          <Route render={location => <Nav location={location} />} />
        </header>
        <section id="content" className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/menu" component={Menu} />
            <Route path="/menu/product/:productId" component={ProductSingle} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/bag" component={Order} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/admin/products" component={AdminProducts} />
            <Route path="/admin/categories" component={AdminCategories} />
            {/* <Route path="/admin/users" component={AdminUsers} /> */}
            {/* TODO new paths added, not done with */}
            {/* put user.id (?), category.id, product.id in url */}

            {/* <Route path="/user/orders" component={Orders} />
            <Route path="/user/account" component={Account} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/product" component={Product} />
            <Route path="/admin/categories" component={Categories} />
            <Route path="/admin/user" component={User} />
            <Route path="/admin/users" component={Users} /> */}
          </Switch>
        </section>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSessionThunk: session => dispatch(setSessionThunk(session)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
