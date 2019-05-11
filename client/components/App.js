import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Menu from './Menu';
import Login from './Login';
import ProductSingle from './ProductSingle';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
import Order from './Order';
import { getUser } from '../store';

class App extends Component {
  // componentDidUpdate(prevProps) {
  //   const cookie = Cookies.get('userId')
  //   console.log(cookie)
  //   if (prevProps.user.id !== this.props.user.id) {
  //     const { getUser } = this.props;
  //     getUser();
  //     console.log(this.props.state.user)
  //   }
  // }

  componentDidMount() {
    // const cookie = Cookies.get('userId')
    // console.log({ cookie })
    // const { getUser } = this.props;
    // getUser();
    // console.log(this.props.state.user)
  }

  render() {
    // const cookie = Cookies.get('userId')
    // able to set cookies here, but not sure how to read session cookie
    const cookie = Cookies.set('name', 'value');
    console.log({ cookie });
    const getCookie = Cookies.get();
    console.log('getCookie: ', getCookie);

    return (
      <Router>
        <header id="main-header">
          <div id="site-name" className="flex-container">
            Lovin Today
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
            {/* TODO new paths added, not done with */}
            {/* put user.id (?), category.id, product.id in url */}

            {/* <Route path="/user/orders" component={Orders} />
            <Route path="/user/account" component={Account} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/product" component={Product} />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/categories" component={Categories} />
            <Route path="/admin/user" component={User} />
            <Route path="/admin/users" component={Users} /> */}
          </Switch>
        </section>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
