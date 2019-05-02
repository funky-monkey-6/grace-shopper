
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import ProductSingle from './ProductSingle';

const App = () => {
	return (
		<Router>
			<div>
				<Route exact path="/menu" component={Menu} />
				<Route path="/menu/:productId" component={ProductSingle} />
			</div>
		</Router>
	)
};

export default App;
