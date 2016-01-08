import React from 'react';

var Entry = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		contents: React.PropTypes.string.isRequired,
		authors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		created: React.PropTypes.string.isRequired
	},
	render: function () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">{this.props.title}</div>
				<div className="panel-body">
					{this.props.contents}
				</div>
				<div className="panel-footer">
					<div className="row">
						<div className="col-md-6">Posted By {this.props.authors.join(', ')} on {this.props.created}</div>
						<div className="col-md-6">
							<div className="pull-right"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Entry;
