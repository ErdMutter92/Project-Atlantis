import React from 'react';
import { Panel, Col, Thumbnail } from 'react-bootstrap';

var Entry = React.createClass({
	propTypes: {
		address: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		discription: React.PropTypes.string.isRequired,
		aliases: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
		return {
			address: '',
			icon: '',
			discription: '',
			title: '',
			aliases: []
		};
	},
	componentDidMount: function () {
		this.setState({
			address: this.props.address,
			icon: this.props.icon,
			discription: this.props.discription,
			title: this.props.title,
			aliases: this.props.aliases
		});
	},
	render: function () {
		var aliases = this.state.aliases.map(function (element, index) {
			return <li key={index}>{element}</li>;
		});
		return (
			<div className="well">
				<div className="media">
					<div className="media-left">
						<img width="128px" height="128px" className="media-object" src={this.state.icon} alt="Stargate Icon" />
					</div>
					<div className="media-body">
						<h4 className="media-heading">{this.state.title}</h4>
						<div><b>{this.state.address}</b></div>
						<div>{this.state.discription}</div>
						<h5>Aliases:</h5>
						<ul>
							{aliases}
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

export default Entry;
