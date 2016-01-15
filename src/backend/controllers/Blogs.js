var cache = require('js-cache');
var DatabaseManager = require('../managers/database');
var StargateDB = DatabaseManager.getManager('blog');
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

  app.get('/blog', function (req, res) {
		if (!cache.get('blog')) {
	    StargateDB.allDocs({
				include_docs: true
			}).then(function (results) {
				cache.set('blog', results.rows.map(function (ele, index) {
	        return ele.doc.data;
	      }), 60000);
				res.json(cache.get('blog'));
			}.bind(this));
		} else {
			res.json(cache.get('blog'));
		}
  });

  app.get('/blog/:id', function (req, res) {
    var id = req.params.id;
		if (!cache.get('blog:'+id)) {
	    StargateDB.get(id).then(function (results) {
				cache.set('blog:'+id, results.data, 60000);
				res.json(cache.get('blog:'+id));
			}.bind(this));
		} else {
			res.json(cache.get('blog:'+id));
		}
  });

  app.put('/blog/:id', function (req, res) {
    var id = req.params.id;
    var content = req.body;
    content.id = id;
    StargateDB.get(id).then(function(doc) {
			return StargateDB.put({
				_id: id,
				_rev: doc._rev,
				data: content
			});
		}.bind(this)).then(function(response) {
			StargateDB.get(id).then(function (results) {
					cache.set('blog:'+id, results.data, 60000);
					res.json(cache.get('blog:'+id));
			}.bind(this));
		}.bind(this));
  });

  app.post('/blog/:id', function (req, res) {
    var id = req.params.id;
    var content = req.body;
    content.id = id;
    StargateDB.put({
			_id: id,
			data: content
		}).bind(this).then(function(response) {
			StargateDB.get(id).then(function (results) {
					cache.set('blog:'+id, results.data, 60000);
					res.json(cache.get('blog:'+id));
			}.bind(this));
		}.bind(this));
  });
};
