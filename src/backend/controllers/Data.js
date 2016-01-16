var fs = require('fs');
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

	/**
	 * @api {get} /data/translations Request Data Translations
	 * @apiName getDataTranslations
	 * @apiGroup Data
	 * @apiVersion 0.0.4
	 *
	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "stat.killEntity.Blaze": "Number of Blazes killed",
	 *       "stat.deaths": "Number of deaths",
	 *       "stat.killEntity.PigZombie": "Number of Pig Zombies killed",
	 *     }
	 *
	 * @apiSuccess {object} data
	 * @apiSuccess {string} data.tag A key value pair for a single translation.
	 */
	app.get('/data/translations', function (req, res) {
		if (!cache.get('data:translations')) {
			var data = JSON.parse(fs.readFileSync('data/world/status/status_string.json', 'utf8'));
			cache.set('data:translations', data, 60000);
			res.json(cache.get('data:translations'));
		} else {
			res.json(cache.get('data:translations'));
		}

    res.json(cache.get('data:translations'));
	});
};
