import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
<<<<<<< HEAD
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
=======
import Order from './Order';
>>>>>>> refactor: working on cart, displaying items

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
<<<<<<< HEAD
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
=======
        <Route path='/cart' component={Order} />
>>>>>>> refactor: working on cart, displaying items
      </div>
    </Router>
  );
};

export default App;
