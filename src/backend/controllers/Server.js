var axios = require('axios');
var parse = require('csv-parse');
var fs = require('fs');
var cache = require('js-cache');
var csv = require('csv');
var nbt = require('nbt');
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

	// cached 1 hour
	app.get('/server/level', function (req, res) {
		if (!cache.get('server:level')) {
			fs.readFile('data/world/level.dat', function(error, data) {
					if (error) throw error;

					nbt.parse(data, function(error, data) {
							cache.set('server:level', data.value.Data.value, 3600000);
							res.json(cache.get('server:level'));
					});
			});
		} else {
			res.json(cache.get('server:level'));
		}
	});

	// cache 24 hour
	app.get('/server/nei/item', function (req, res) {
		if (!cache.get('server:nei:items')) {
			fs.readFile('data/dumps/item.csv', function (error, data) {
					if (error) throw error;
					var output = [];
					var parser = csv.parse();
					parser.on('readable', function(){
					while(record = parser.read()){
							output.push(record);
						}
					});
					parser.on('finish', function(){
						cache.set('server:nei:items', output, 90000000);
						res.json(cache.get('server:nei:items'));
					});
					parser.write(data);
					parser.end();
			});
		} else {
			res.json(cache.get('server:nei:items'));
		}
	});

	app.get('/server/nei/item/:id', function (req, res) {
		var id = req.params.id;
		if (!cache.get('server:nei:items:'+id)) {
			fs.readFile('data/dumps/item.csv', function (error, data) {
					if (error) throw error;
					var output = [];
					var parser = csv.parse();
					parser.on('readable', function(){
					while(record = parser.read()){
							output.push(record);
						}
					});
					parser.on('finish', function(){
						output = output.filter(function (ele, key) {
							if (ele[1] === id) {
								return true;
							} else if (ele[1] === 'ID') {
								return true;
							} else {
								return false;
							}
						});
						cache.set('server:nei:items:'+id, output, 90000000);
						res.json(cache.get('server:nei:items:'+id));
					}.bind(this));
					parser.write(data);
					parser.end();
			}.bind(this));
		} else {
			res.json(cache.get('server:nei:items:'+id));
		}
	});

	// cached 24 hours
	app.get('/server/nei/enchantment', function (req, res) {
		if (!cache.get('server:nei:enchantment')) {
			fs.readFile('data/dumps/enchantment.csv', function (error, data) {
					if (error) throw error;
					var output = [];
					var parser = csv.parse();
					parser.on('readable', function(){
					while(record = parser.read()){
							output.push(record);
						}
					});
					parser.on('finish', function(){
						cache.set('server:nei:enchantment', output, 90000000);
						res.json(cache.get('server:nei:enchantment'));
					});
					parser.write(data);
					parser.end();
			});
		} else {
			res.json(cache.get('server:nei:enchantment'));
		}
	});

	// cached 24 hours
	app.get('/server/nei/potion', function (req, res) {
		if (!cache.get('server:nei:potion')) {
			fs.readFile('data/dumps/potion.csv', function (error, data) {
					if (error) throw error;
					var output = [];
					var parser = csv.parse();
					parser.on('readable', function(){
					while(record = parser.read()){
							output.push(record);
						}
					});
					parser.on('finish', function(){
						cache.set('server:nei:potions', output, 90000000);
						res.json(cache.get('server:nei:potions'));
					});
					parser.write(data);
					parser.end();
			});
		} else {
			res.json(cache.get('server:nei:potions'));
		}
	});

	/**
	* @api {get} /server/status Request Server Status
	* @apiName getServerStats
	* @apiGroup Server
	* @apiVersion 0.0.4
	* @apiDescription This will always return a server status, the status field
	* will inform you if the server is 'online' or 'offline'. The other data may
	* or may not be there in the response.
	* @apiParamExample {json} Request-Example:
	* {
	* 	"version": "1.7.10",
	* 	"players": 0,
	* 	"motd": "Mission: Seed the world with Stargates....",
	* 	"ping": 14,
	* 	"discription":"The discription of our minecraft server will go here once OUGuy392 writes it!",
	* 	"status":"online",
	* 	"servername":"Project Atlantis"
	* }
	*/
  app.get('/server/status', function (req, res) {
		if (!cache.get('server:status')) {
			axios.get('http://bleauweb.net/minecraft/api/status.php?version=0.2').then(function (promise) {
	      var status = promise.data;
	      status.servername = 'Project Atlantis';

				// Check if we are offline, if so set some defaults.
				if (status.maxplayers === undefined) {
					status.status = 'offline';
					status.version = '1.7.10';
					status.maxplayers = 0;
					status.motd = 'We are currently offline...';
				}

				cache.set('server:status', status, 30000);
	      res.json(cache.get('server:status'));
	    });
		} else {
			res.json(cache.get('server:status'));
		}
  });

	/**
	* @api {get} /server/mods Request Server Mod List
	* @apiName getServerMods
	* @apiGroup Server
	* @apiVersion 0.0.4
	* @apiDescription Returns a list of all the mods installed on the server along
	* with the version of that mod. Returns as an object of objects.
	*
	* @apiSuccess {object} status
	* @apiSuccess {string} status.type The type of mod loader used on server.
	* @apiSuccess {object} status.modList
	* @apiSuccess {object} status.modList.obj
	* @apiSuccess {string} status.modList.obj.modid The registered name of the mod.
	* @apiSuccess {string} status.modList.obj.version The registered version of the mod.
	*/
  app.get('/server/mods', function (req, res) {
		if (!cache.get('server:mods')) {
	    axios.get('http://bleauweb.net/minecraft/api/status.php?raw=true').then(function (promise) {
	      cache.set('server:mods', promise.data.raw.modinfo, 180000);
				res.json(cache.get('server:mods'));
	    });
		} else {
			res.json(cache.get('server:mods'));
		}
  });
};
