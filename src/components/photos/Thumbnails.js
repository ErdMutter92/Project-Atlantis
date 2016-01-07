import React from 'react';
import {Image, Thumbnail, Col, Row, Grid} from 'react-bootstrap';

var Thumbnails = React.createClass({
	propTypes: {
		images: React.PropTypes.array.isRequired
	},
	processImageUris: function (images) {
		var output = [

		];

		images.forEach(function (element, index) {
			var element = <Col xs={6} md={3}  key={index}><Thumbnail src={element}/></Col>;
			this.push(element);
		}.bind(output));

		return output;
	},
	render: function () {
		return (
			<div>
				{this.processImageUris(this.props.images)}
			</div>
		);
	}
});

export default Thumbnails;
