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
    StargateDB.allDocs({
			include_docs: true
		}).then(function (results) {
			res.json(results.rows.map(function (ele, index) {
        return ele.doc.data;
      }));
		}.bind(this));
  });

  app.get('/blog/:id', function (req, res) {
    var id = req.params.id;
    StargateDB.get(id).then(function (results) {
			res.json(results.data);
		}.bind(this));
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
			return StargateDB.get(id).then(function (results) {
				res.json(results.data);
			}.bind(this))
		}.bind(this));
  });

  app.post('/blog/:id', function (req, res) {
    var id = req.params.id;
    var content = req.body;
    content.id = id;
    StargateDB.put({
			_id: id,
			data: content
		}).then(function (response) {
			return StargateDB.get(id).then(function (results) {
				res.json(results.data);
			}.bind(this))
		}.bind(this));
  });
};
