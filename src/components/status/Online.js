import React from 'react';
import {Panel} from 'react-bootstrap';

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
			return 'There are currently no players online...';
		} else {
			return players.join(', ');
		}
	},
	render: function () {
		return (
			<Panel header={'Currently Online ('+ this.state.players.length +'/'+ this.state.max +')'}>
				{this.stringify(this.state.players)}
			</Panel>
		);
	}
});

export default Online;
