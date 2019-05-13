import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
import Order from './Order';
import Checkout from './Checkout';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';

const App = () => {
  return (
    <Router>
      <header id="main-header">
        <div className="header-bar">
          <Link to="/">
            <img src="logo.png" alt="logo" className="logo-img" />
          </Link>
          <div id="site-name" className="flex-container">
            Lovin Today
          </div>
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

          <Route path="/admin/products" component={Products} />
          <Route path="/admin/categories" component={Categories} />
          <Route path="/admin/user" component={User} />
          <Route path="/admin/users" component={Users} /> */}
        </Switch>
      </section>
    </Router>
  );
};

export default App;
