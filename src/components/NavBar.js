import React from 'react';
import {Navbar, Nav, NavItem, Input} from 'react-bootstrap';
import Search from 'react-search';

var NavBar = React.createClass({
	getInitialState: function () {
		return {
			active: window.location.hash.split('?')[0]
		};
	},
	componentDidMount: function () {
		window.addEventListener('hashchange', function () {
			this.setState({
				active: window.location.hash.split('?')[0]
			});
		}.bind(this));
	},
	render: function () {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Project Atlantis</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem active={((this.state.active === "#/blogs") || (this.state.active === "#/")) ? true : false} eventKey={1} href="#/blogs">Blog</NavItem>
						<NavItem active={(this.state.active === "#/stargate") ? true : false} eventKey={2} href="#/stargate">Stargate</NavItem>
						<NavItem active={(this.state.active === "#/photos") ? true : false} eventKey={2} href="#/photos">Photos</NavItem>
					</Nav>
					<Navbar.Form pullRight>
						<Input type="text" placeholder="Search"/>
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
});

export default NavBar;
