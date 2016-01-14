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
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('/player/:user/profile', function (req, res) {
		var player = req.params.user;
		MojangAPI.nameToUuid(player, function (err, response) {
			var uuid = PlayersManager.parseUUID(response[0].id);
			MojangAPI.profile(response[0].id, function (err, data) {
				res.json({
					id: '0ec3f49dca3a4dc993fc98ecc2aaa6ad',
  				name: 'ErdMutter92',
  				properties:
   					[
							{
								name: 'textures',
       					value: 'eyJ0aW1lc3RhbXAiOjE0NTIzOTUwNDk0MzIsInByb2ZpbGVJZCI6IjBlYzNmNDlkY2EzYTRkYzk5M2ZjOThlY2MyYWFhNmFkIiwicHJvZmlsZU5hbWUiOiJFcmRNdXR0ZXI5MiIsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9lZTM0NDg5NWM4ODcxZDUxYzU5Y2U0OTFkZDVjNjUzOWJkZjJkM2FlZTJmODFjYWMzMDJmODdkYjY3MmNkN2U2In19fQ=='
							}
						]
					});
			});
		});
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
