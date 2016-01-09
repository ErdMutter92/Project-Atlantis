var StargateManager = require('../managers/Stargate');
var ErrorManager = require('../managers/Error');

module.exports.controller = function (app) {
	app.all(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});

	app.get('/stargate', function (req, res) {
		var type = req.query.type;
		StargateManager.LoadStargateAddresses().then(function (doc) {
			if (type === 'computercraft') {
				StargateManager.ComputerCraftify(doc).then(function (promise) {
						res.status(200).send(promise.data);
					});
			} else {
				res.json(doc);
			}
		}).catch(function (err) {
			var error = ErrorManager.handle(err);
			res.status(error.status).send(error.message);
		});
	});

	app.get('/stargate/:address', function (req, res) {
		var type = req.query.type;
		var address = req.params.address;
		StargateManager.LoadStargateAddress(address).then(function (doc) {
			if (type === 'computercraft') {
				StargateManager.ComputerCraftify(doc).then(function (promise) {
						res.status(200).send(promise.data);
					});
			} else {
				res.json(doc);
			}
		}).catch(function (err) {
			var error = ErrorManager.handle(err);
			res.status(error.status).send(error.message);
		});
	});

	app.put('/stargate/:address', function (req, res) {
		var type = req.query.type;
		var address = req.params.address;
		var content = req.body;
		StargateManager.UpdateStargateAddress(address, content).then(function (doc) {
			if (type === 'computercraft') {
				StargateManager.ComputerCraftify(doc).then(function (promise) {
						res.status(200).send(promise.data);
					});
			} else {
				res.json(doc);
			}
		}).catch(function (err) {
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
						res.status(200).send(promise.data);
					});
			} else {
				res.json(doc);
			}
		}).catch(function (err) {
			var error = ErrorManager.handle(err);
			res.status(error.status).send(error.message);
		});
	});
};
