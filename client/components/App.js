import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Order from './Order';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
        <Route path="/cart" component={Order} />
      </div>
    </Router>
  );
};

export default App;
