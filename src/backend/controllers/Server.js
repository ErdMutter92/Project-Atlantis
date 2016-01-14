var axios = require('axios');
var parse = require('csv-parse');
var fs = require('fs');
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

	app.get('/server/level', function (req, res) {
		fs.readFile('data/world/level.dat', function(error, data) {
				if (error) throw error;

				nbt.parse(data, function(error, data) {
						res.json(data.value.Data.value);
				});
		});
	});

	app.get('/server/nei/item', function (req, res) {
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
				  res.json(output);
				});
				parser.write(data);
				parser.end();
		});
	});

	app.get('/server/nei/item/:id', function (req, res) {
		var id = req.params.id;
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
					res.json(output);
				}.bind(this));
				parser.write(data);
				parser.end();
		}.bind(this));
	});

	app.get('/server/nei/enchantment', function (req, res) {
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
				  res.json(output);
				});
				parser.write(data);
				parser.end();
		});
	});

	app.get('/server/nei/potion', function (req, res) {
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
					res.json(output);
				});
				parser.write(data);
				parser.end();
		});
	});

  app.get('/server/status', function (req, res) {
    axios.get('http://bleauweb.net/minecraft/api/status.php?version=0.2').then(function (promise) {
      var status = promise.data;
      status.servername = 'Project Atlantis';
      res.json(status)
    });
  });

  app.get('/server/mods', function (req, res) {
    axios.get('http://bleauweb.net/minecraft/api/status.php?raw=true').then(function (promise) {
      res.json(promise.data.raw.modinfo);
    });
  });
};
