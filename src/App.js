import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';
import Menu from './components/Menu';
import Stargates from './components/Stargates';

var history = new createHashHistory();

ReactDOM.render(
	<div>
		<NavBar />
		<div className="container">
			<div className="col-md-8">
				<Router history={history}>
					<Route path="/" component={Blogs}></Route>
					<Route path="/stargate" component={Stargates}></Route>
					<Route path="/Blogs" component={Blogs}></Route>
				</Router>
			</div>
			<div className="col-md-4">
				<Menu />
			</div>
		</div>
	</div>,
	document.getElementById('app')
);
