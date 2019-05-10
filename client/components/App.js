import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Login from '../components/Login';
import ProductSingle from '../components/ProductSingle';
import Nav from '../components/Nav';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Order from '../components/Order';
import Checkout from '../components/Checkout';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/bag" component={Order} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>
  );
};

export default App;
