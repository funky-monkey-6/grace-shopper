import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
import Order from './Order';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menu/:productId" component={ProductSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/bag" component={Order} />
        <Route path="/menu/search/:searchTerm" component={Menu} />
      </div>
    </Router>
  );
};

export default App;
