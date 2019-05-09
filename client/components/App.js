import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Order from './Order';
import { Checkout } from './Checkout';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" render={() => <div>Sign Up Here</div>} />
        <Route path="/bag" component={Order} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>
  );
};

export default App;
