import React from 'react';
import {Panel} from 'react-bootstrap';
import axios from 'axios';

var Mojang = React.createClass({
	getInitialState: function () {
		return {
			status: 'black',
			problem_servers: []
		};
	},
	componentDidMount: function () {
		axios.get('http://bleauweb.net/minecraft/api/mojang.php').then(function (promise) {
			this.setState({
				status: promise.data.status,
				problem_servers: promise.data.problem_servers
			});
		}.bind(this));
	},
	render: function () {
		var statusMessage;
		switch (this.state.status) {
			case 'black': statusMessage = 'Mojang is not experience any issues with the minecraft servers at this time.'; break;
			case 'yellow': statusMessage = 'Mojang is currently experiencing some issues with the minecraft servers at this time. You might experience some difficulties during game play.'; break;
			case 'red': statusMessage = 'Mojang is currently experiencing issues with the minecraft servers at this time. You will experience problems playing or signing in.'; break;
		}
		return (
			<Panel header={'Minecraft Server Status'}>
				<p className={'mojang-status-'+this.state.status}>{statusMessage}</p>
				<p>Learn more about the status of the mojang servers at their <a href="https://help.mojang.com/">Offical Help Website</a>!</p>
				<p>{this.state.problem_servers.join(', ')}</p>
			</Panel>
		);
	}
});

export default Mojang;
