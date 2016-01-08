import React from 'react';
import Entry from './content/Entry';
import hdate from 'human-date';

var Blogs = React.createClass({
	render: function () {
		return (
			<div className="col-md-12">
				<Entry
					title={'Hello, World!'}
					contents={'This is a test!'}
					authors={['ErdMutter92']}
					created={hdate.prettyPrint(new Date()) + ''} />
			</div>
		);
	}
});

export default Blogs;
