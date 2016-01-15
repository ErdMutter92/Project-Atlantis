var fs = require('fs');
var nbt = require('nbt');
var cache = require('js-cache');
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

    /*  GET /player/{user}/profile
     *  @params user string
     *  Takes the user name and turns it into a uuid. Response contains
     *  the json data from mojangs profile api. This response is cached
     *  for a long time as their server rejects repetative requests.
     */
    app.get('/player/:user/profile', function (req, res) {
  		var player = req.params.user;
      if (!cache.get('player:'+player)) {
        MojangAPI.nameToUuid(player, function (err, response) {
          var uuid = PlayersManager.parseUUID(response[0].id);
          MojangAPI.profile(response[0].id, function (err, data) {
            cache.set('player:'+player+':profile', data, 1800000);
            res.json(cache.get('player:'+player+':profile'));
          });
        });
      }
      res.json(cache.get('player:'+player+':profile'));
    });

    /*  GET /player/{user}
     *  @params user string
     *  reads through the requested player's dat file and converts it to
     *  json before sending that data back in a response.
     */
    app.get('/player/:user', function (req, res) {
  		var player = req.params.user;

      // Check the cache to see if we already have this data.
      if (!cache.get('player:'+player)) {

        // Aquire UUID from mojang's api
        MojangAPI.nameToUuid(player, function (err, response) {
    			var uuid = PlayersManager.parseUUID(response[0].id);

          // load the data from the player data using that uuid.
    			fs.readFile('data/world/playerdata/'+uuid+'.dat', function(error, data) {
    			    if (error) throw error;
    						nbt.parse(data, function(error, data) {
                  // cache the user data.
    				      cache.set('player:'+player, data, 60000);
                  res.json(cache.get('player:'+player));
    				    });
    					});
  			});
  		} else {
        // Send the response from the cache at all times.
        res.json(cache.get('player:'+player));
      }
    });


    /*  GET /player/{user}/status
     *  @params user string
     *  Reads the players status file and returns that, this contains all
     *  of the data for statistics, such as kills and what the player has
     *  done in relationship to blocks.
     */
    app.get('/player/:user/stats', function (req, res) {
  		var player = req.params.user;
			if (!cache.get('player:'+player+':stats')) {
    		MojangAPI.nameToUuid(player, function (err, response) {
    				var uuid = PlayersManager.parseUUID(response[0].id);
    				var status = PlayersManager.readJson('data/world/stats/'+uuid+'.json');
    				cache.set('player:'+player+':stats', status, 60000);

      			res.json(cache.get('player:'+player+':stats'));
    		});
  		} else {
  			res.json(cache.get('player:'+player+':stats'));
      }
    });
};
