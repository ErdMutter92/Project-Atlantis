import React from 'react';
import {Panel, Table, Nav, NavItem} from 'react-bootstrap';

var Online = React.createClass({
	propTypes: {
		players: React.PropTypes.array.isRequired,
		capacity: React.PropTypes.number.isRequired
	},
	getInitialState: function () {
		return {
			players: [],
			max: 0
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			players: nextProps.players,
			max: nextProps.capacity
		});
	},
	stringify: function (players) {
		if (players.length <= 0) {
			return (<NavItem disabled>There are currently no players online...</NavItem>);
		} else {
			return players.map(function(ele, index) {
				return (<NavItem key={index} href={'#/profiles/'+ele}>{ele}</NavItem>);
			});
		}
	},
	render: function () {
		return (
			<Panel header={'Currently '+ this.state.players.length +' of '+ this.state.max +' Online'}>
				<Nav bsStyle="pills" stacked>
					{this.stringify(this.state.players)}
			  </Nav>
			</Panel>
		);
	}
});

export default Online;
