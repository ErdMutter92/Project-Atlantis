var StargateManager = require('../managers/Stargate');
var ErrorManager = require('../managers/Error');
var cache = require('js-cache');

module.exports.controller = function (app) {
	app.all(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('/stargate', function (req, res) {
		var type = req.query.type;
		if (!cache.get('stargate:'+type)) {
			StargateManager.LoadStargateAddresses().then(function (doc) {
				if (type === 'computercraft') {
					StargateManager.ComputerCraftify(doc).then(function (promise) {
							cache.set('stargate:'+type, promise.data, 30000);
							res.status(200).send(cache.get('stargate'+type));
						});
				} else {
					cache.set('stargate:'+type, doc, 30000);
					res.json(cache.get('stargate:'+type));
				}
			}.bind(this)).catch(function (err) {
				var error = ErrorManager.handle(err);
				res.status(error.status).send(error.message);
			}.bind(this));
		} else {
			if (type === 'computercraft') {
				res.status(200).send(cache.get('stargate:'+type));
			} else {
				res.json(cache.get('stargate:'+type));
			}
		}
	});

	app.get('/stargate/:address', function (req, res) {
		var type = req.query.type;
		var address = req.params.address;
		if (!cache.get('stargate:'+type+':'+address)) {
			StargateManager.LoadStargateAddress(address).then(function (doc) {
				if (type === 'computercraft') {
					StargateManager.ComputerCraftify(doc).then(function (promise) {
							cache.set('stargate:'+type+':'+address, promise.data, 30000);
							res.status(200).send(cache.get('stargate:'+type+':'+address));
						}.bind(this));
				} else {
					cache.set('stargate:'+type+':'+address, doc, 30000);
					res.json(cache.get('stargate:'+type+':'+address));
				}
			}.bind(this)).catch(function (err) {
				var error = ErrorManager.handle(err);
				res.status(error.status).send(error.message);
			});
		} else {
			if (type === 'computercraft') {
				res.status(200).send(cache.get('stargate:'+type+':'+address));
			} else {
				res.json(cache.get('stargate:'+type+':'+address));
			}
		}
	});

	app.put('/stargate/:address', function (req, res) {
		var type = req.query.type;
		var address = req.params.address;
		var content = req.body;
		StargateManager.UpdateStargateAddress(address, content).then(function (doc) {
			if (type === 'computercraft') {
				StargateManager.ComputerCraftify(doc).then(function (promise) {
						cache.set('stargate:'+type+':'+address, promise.data, 30000);
						res.status(200).send(cache.get('stargate:'+type+':'+address));
					}.bind(this));
			} else {
				cache.set('stargate:'+type+':'+address, doc, 30000);
				res.json(cache.get('stargate:'+type+':'+address));
			}
		}.bind(this)).catch(function (err) {
			var error = ErrorManager.handle(err);
			res.status(error.status).send(error.message);
		});
	});

	app.post('/stargate/:address', function (req, res) {
		var type = req.query.type;
		var address = req.params.address;
		var content = req.body;
		StargateManager.CreateStargateAddress(address, content).then(function (doc) {
			if (type === 'computercraft') {
				StargateManager.ComputerCraftify(doc).then(function (promise) {
						cache.set('stargate:'+type+':'+address, promise.data, 30000);
						res.status(200).send(cache.get('stargate:'+type+':'+address));
					}.bind(this));
			} else {
				cache.set('stargate:'+type+':'+address, doc, 30000);
				res.json(cache.get('stargate:'+type+':'+address));
			}
		}.bind(this)).catch(function (err) {
			var error = ErrorManager.handle(err);
			res.status(error.status).send(error.message);
		});
	});
};
