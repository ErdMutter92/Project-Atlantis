var PouchDB = require('pouchdb').plugin(require('store.pouchdb'));
var StargateDB = new PouchDB('./data/minecraft');
module.exports = {
	getManager: function () {
		return StargateDB;
	}
};
