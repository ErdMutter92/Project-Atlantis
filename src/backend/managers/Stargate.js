var axios = require('axios');
var DatabaseManager = require('./database');
var StargateDB = DatabaseManager.getManager();

module.exports = {
	ComputerCraftify: function (entry) {
		return axios.post('http://bleauweb.net/minecraft/api/computercraft.php', JSON.stringify(entry));
	},
	ProcessStargateAddresses: function (entry) {
		return {
			address: entry.id,
			title: entry.doc.data.title,
			discription: entry.doc.data.discription,
			aliases: entry.doc.data.aliases.split(', '),
		};
	},
	ProcessStargateAddress: function (results, address) {
		return [
			{
				address: address,
				title: results.data.title,
				discription: results.data.discription,
				aliases: results.data.aliases.split(', ')
			}
		];
	},
	LoadStargateAddresses: function () {
		return StargateDB.allDocs({
			include_docs: true
		}).then(function (results) {
			return results.rows.map(function (entry, key) {
				return this.ProcessStargateAddresses(entry);
			}.bind(this));
		}.bind(this));
	},
	LoadStargateAddress: function (address) {
		return StargateDB.get(address).then(function (results) {
			return this.ProcessStargateAddress(results, address);
		}.bind(this));
	},
	UpdateStargateAddress: function (address, content) {
		return StargateDB.get(address).then(function(doc) {
			return StargateDB.put({
				_id: address,
				_rev: doc._rev,
				data: content
			});
		}.bind(this)).then(function(response) {
			return StargateDB.get(address).then(function (results) {
				return this.ProcessStargateAddress(results, address);
			}.bind(this))
		}.bind(this));
	},
	CreateStargateAddress: function (address, content) {
		return StargateDB.put({
			_id: address,
			data: content
		}).then(function (response) {
			return StargateDB.get(address).then(function (results) {
				return this.ProcessStargateAddress(results, address);
			}.bind(this))
		}.bind(this));
	}
};
