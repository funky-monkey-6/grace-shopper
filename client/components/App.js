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
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import Checkout from './Checkout';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import { setSessionThunk, getCurrentUser, fetchOrder } from '../store';

class App extends Component {
  componentDidMount() {
    // grab session cookie and put on state
    const session = Cookies.get('session');
    const currentUserId = Cookies.get('cui');

    // TODO not working, want to check if session cookie and state are same, if not, then delete user cookies
    // because it appears that server does not remove session cookie when session is over
    // want to do because if user does not log out, then user cookies remain
    // const sameSession = session === this.props.session;
    // console.log({ sameSession });

    const { setSessionThunk, getCurrentUser } = this.props;
    if (session) {
      setSessionThunk(session);
    }
    if (currentUserId !== undefined) {
      console.log('getting current user...');
      // set current user on state
      getCurrentUser();
      fetchOrder(currentUserId);
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
            <Route path="/user/orders/:orderId" component={OrderDetails} />
            <Route exact path="/user/orders" component={Orders} />

            {/*<Route path="/user/account" component={Account} />
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
    fetchOrder: userId => dispatch(fetchOrder(userId)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
