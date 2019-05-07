import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
<<<<<<< HEAD
import Login from './Login';
import Bag from './Bag';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
=======
import Home from './Home';
import Login from './Login';
import Bag from './Bag';
import Signup from './Signup';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
>>>>>>> 81c36476740a7f53954a0d01266455accbfbd5a6

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
<<<<<<< HEAD
        <Route path="/menu/:productId" component={ProductSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/bag" component={Bag} />
=======
        <Route exact path="/menu/:productId" component={ProductSingle} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bag" component={Bag} />
        <Route exact path="/signup" component={Signup} />
>>>>>>> 81c36476740a7f53954a0d01266455accbfbd5a6
      </div>
    </Router>
  );
};

export default App;
