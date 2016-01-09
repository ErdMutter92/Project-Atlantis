var fs = require('fs');
var nbt = require('nbt');
var MojangAPI = require('mojang-api');
var PlayersManager = require('../managers/Players');
module.exports.controller = function (app) {
	app.all(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});

	app.get('/player/:user', function (req, res) {
		var player = req.params.user;
		MojangAPI.nameToUuid(player, function (err, response) {
			var uuid = PlayersManager.parseUUID(response[0].id);
			fs.readFile('data/world/playerdata/'+uuid+'.dat', function(error, data) {
			    if (error) throw error;

			    nbt.parse(data, function(error, data) {
			        res.json(data);
			    });
			});
		});
	});

  app.get('/player/:user/stats', function (req, res) {
		var player = req.params.user;
		MojangAPI.nameToUuid(player, function (err, response) {
			var uuid = PlayersManager.parseUUID(response[0].id);
			var status = PlayersManager.readJson('data/world/stats/'+uuid+'.json');
			res.json(status);
		});
  });
};
