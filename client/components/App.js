   
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Menu } from './Menu';
//import { ProductSingle } from './ProductSingle';

const App = () => {
	return (
		<Router>
			<div>
				<h1>Welcome!</h1>
				<Route path="/menu" component={Menu} />
			</div>
		</Router>
	)
};

export default App;

//<Route path="/menu/:id" component={ProductSingle} />