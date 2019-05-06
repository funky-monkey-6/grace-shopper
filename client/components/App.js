import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Login from './Login';
import Bag from './Bag';
import Signup from './Signup';
import ProductSingle from './ProductSingle';
import Nav from './Nav';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menu/:productId" component={ProductSingle} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bag" component={Bag} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </Router>
  );
};

export default App;
