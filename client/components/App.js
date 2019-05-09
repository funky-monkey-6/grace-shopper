import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/bag" component={Order} />
      </Switch>
    </Router>
  );
};

export default App;
