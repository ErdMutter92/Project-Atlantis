import React from 'react';
import Bootstrap from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import ServerDataService from '../services/server';
import Online from './status/Online';
import Motd from './status/Motd';
import Mojang from './status/Mojang';

var Menu = React.createClass({
	getInitialState: function () {
		return {
			servername: 'Offline',
			motd: 'Server is currently offline...',
			version: '1.7.10',
			uptime: undefined,
			population: {
				max: 0,
				online: []
			}
		};
	},
	componentDidMount: function () {
		axios.get('http://bleauweb.net/minecraft/api/status.php?version=0.2').then(function (promise) {
			this.setState({
				servername: promise.data.servername,
				motd: promise.data.motd,
				version: promise.data.version,
				uptime: undefined,
				population: {
					max: promise.data.maxplayers,
					online: (promise.data.users !== undefined) ? promise.data.users : []
				}
			});
		}.bind(this));
	},
	render: function () {
		return (
			<div>
				<Online
					players={this.state.population.online}
					capacity={this.state.population.max} />
				<Motd
					message={this.state.motd}
					serverName={this.state.servername}
					version={this.state.version} />
				<Mojang />
			</div>
		);
	}
});

export default Menu;
