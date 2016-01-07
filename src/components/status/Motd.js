import React from 'react';
import {Panel} from 'react-bootstrap';

var Motd = React.createClass({
	propTypes: {
		message: React.PropTypes.string.isRequired,
		serverName: React.PropTypes.string.isRequired,
		version: React.PropTypes.string.isRequired
	},
	getInitialState: function () {
		return {
			motd: 'Server is currently offline...',
			serverName: 'Offline',
			version: '1.7.10'
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			message: nextProps.message,
			serverName: nextProps.serverName,
			version: nextProps.version
		});
	},
	componentDidMount: function () {
		this.setState({
			message: this.props.message,
			serverName: this.props.serverName,
			version: this.props.version
		});
	},
	render: function () {
		return (
			<Panel header={this.state.serverName +' v'+ this.state.version}>
				<center>{this.state.message}</center>
			</Panel>
		);
	}
});

export default Motd;
