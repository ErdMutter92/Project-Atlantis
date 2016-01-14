var PouchDB = require('pouchdb').plugin(require('store.pouchdb'));
var StargateDB = new PouchDB('./data/minecraft');
var BlogDB = new PouchDB('./data/blog');
module.exports = {
	getManager: function (database) {
		switch (database) {
			case 'stargate': return StargateDB;
			case 'blog': return BlogDB;
			default: return StargateDB;
		};

	}
};
