import React from 'react';
<<<<<<< HEAD
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import ProductSingle from './ProductSingle';
import Nav from './Nav';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/menu" component={Menu} />
        <Route path="/menu/:productId" component={ProductSingle} />
      </div>
    </Router>
  );
=======
import { gotMe } from '../store'


const App = () => {

  componentDidMount(){

  }
  return <div>App</div>;
>>>>>>> Sessions set up
};

export default App;
