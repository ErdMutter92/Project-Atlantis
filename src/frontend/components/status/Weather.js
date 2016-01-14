import React from 'react';
import axios from 'axios';
import {Panel, Table, Nav, NavItem} from 'react-bootstrap';

var Weather = React.createClass({
	getInitialState: function () {
		return {
      raining: 0,
      thundering: 0,
      dayTime: ''
		};
	},
	componentWillReceiveProps: function (nextProps) {

	},
	componentDidMount: function () {
		axios.get('http://localhost:3333/server/level').then(function (promise) {
			this.setState({
				raining: promise.data.raining.value,
				thundering: promise.data.thundering.value,
        dayTime: promise.data.DayTime.value[1]
			});
		}.bind(this));
	},
	render: function () {
    var raining = 'The is a slight chance of increased spawn rate, with some rain. ';
    var thundering = 'Oh, and did we mention that thunder storm? ';
    var clear = 'The skys seem to be clear of rain, snow, and cloud coverage! ';
		return (
			<Panel header={'Current Weather Report'}>
        {this.state.raining === 1 ? raining : null}
        {this.state.thundering === 1 ? thundering : null}
        {this.state.thundering === 1 ? null : this.state.raining === 1 ? null : clear}
			</Panel>
		);
	}
});

export default Weather;
