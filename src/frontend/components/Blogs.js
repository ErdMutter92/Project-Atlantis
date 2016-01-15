import React from 'react';
import Entry from './content/Entry';
import hdate from 'human-date';
import axios from 'axios';

var Blogs = React.createClass({
  getInitialState: function () {
    return {
      posts: [],
    }
	},
	componentWillMount: function () {
		axios.get('http://api.bleauweb.net/blog').then(function (promise) {
			this.setState({
				posts: promise.data.map(function (entry, index) {
					return (
						<Entry
							title={entry.title}
							contents={entry.content}
							authors={[entry.authors]}
							created={hdate.prettyPrint(new Date(entry.created))}
							key={index} />
					);
				})
			});
		}.bind(this));
	},
	render: function () {
		return (
			<div className="col-md-12">
				{this.state.posts}
			</div>
		);
	}
});

export default Blogs;
