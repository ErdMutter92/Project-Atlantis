import React from 'react';
import Bootstrap from 'react-bootstrap';
import axios from 'axios';
import StargateDataService from '../services/stargate';
import Entry from './stargates/Entry';

var Stargates = React.createClass({
	getInitialState: function () {
		return {
			stargates: []
		};
	},
	componentDidMount: function () {
		axios.get('http://api.bleauweb.net/stargate').then(function (promise) {
			this.setState({
				stargates: promise.data
			});
		}.bind(this));
	},
	render: function () {
		var stargates = this.state.stargates.map(function (element, index) {
			return (
					<Entry
						key={index}
						address={element.address}
						icon={'http://bleauweb.net/minecraft/resources/images/600px-Stargate.svg.png'}
						title={element.title}
						discription={element.discription}
						aliases={element.aliases} />
			);
		});
		return (
			<div className="col-md-12">
				{stargates}
			</div>
		);
	}
});

export default Stargates;
