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

	/**
	 * @api {get} /blog Request All Blog Posts
	 * @apiName GetBlogPosts
	 * @apiGroup Blog
	 * @apiVersion 0.0.4
	 *
	 * @apiParamExample {json} Request-Example:
	 *     [
	 *          {
	 *              "id": 0,
	 *              "created": "Fri Jan 15 2016 00:22:14 GMT-0500 (EST)",
	 *              "authors": "ErdMutter92",
	 *              "content": "The content of the post would go here in the markdown lenguage.",
	 *              "title": "Hello, World!",
	 *          }
	 *     ]
	 *
	 * @apiSuccess {Array} posts An array of blog post objects.
	 * @apiSuccess {object} posts.post
	 * @apiSuccess {string} posts.post.id The unique id of the post.
	 * @apiSuccess {string} posts.post.title The title of the post.
	 * @apiSuccess {string} posts.post.content The content of the post in markdown.
	 * @apiSuccess {string} posts.post.authors A comma seperated list of authors.
	 * @apiSuccess {string} posts.post.created The time stamp of the post creation.
	 */
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

	/**
	 * @api {get} /blog/:id Request Blog Post
	 * @apiName GetBlogPost
	 * @apiGroup Blog
	 * @apiVersion 0.0.4
	 *
	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "id": 0,
	 *       "created": "Fri Jan 15 2016 00:22:14 GMT-0500 (EST)",
	 *       "authors": "ErdMutter92",
	 *       "content": "The content of the post would go here in the markdown lenguage.",
	 *       "title": "Hello, World!",
	 *     }
	 *
	 * @apiSuccess {object} post
	 * @apiSuccess {string} post.id The unique id of the post.
	 * @apiSuccess {string} post.title The title of the post.
	 * @apiSuccess {string} post.content The content of the post in markdown.
	 * @apiSuccess {string} post.authors A comma seperated list of authors.
	 * @apiSuccess {string} post.created The time stamp of the post creation.
	 */
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

	/**
	 * @api {put} /blog/:id Update Blog Post
	 * @apiName PutBlogPost
	 * @apiGroup Blog
	 * @apiVersion 0.0.4
	 *
	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "id": 0,
	 *       "created": "Fri Jan 15 2016 00:22:14 GMT-0500 (EST)",
	 *       "authors": "ErdMutter92",
	 *       "content": "The content of the post would go here in the markdown lenguage.",
	 *       "title": "Hello, World!",
	 *     }
	 *
	 * @apiSuccess {object} post
	 * @apiSuccess {string} post.id The unique id of the post.
	 * @apiSuccess {string} post.title The title of the post.
	 * @apiSuccess {string} post.content The content of the post in markdown.
	 * @apiSuccess {string} post.authors A comma seperated list of authors.
	 * @apiSuccess {string} post.created The time stamp of the post creation.
	 */
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

	/**
	 * @api {post} /blog/:id Create Blog Post
	 * @apiName PostBlogPost
	 * @apiGroup Blog
	 * @apiVersion 0.0.4
	 *
	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "id": 0,
	 *       "created": "Fri Jan 15 2016 00:22:14 GMT-0500 (EST)",
	 *       "authors": "ErdMutter92",
	 *       "content": "The content of the post would go here in the markdown lenguage.",
	 *       "title": "Hello, World!",
	 *     }
	 *
	 * @apiSuccess {object} post
	 * @apiSuccess {string} post.id The unique id of the post.
	 * @apiSuccess {string} post.title The title of the post.
	 * @apiSuccess {string} post.content The content of the post in markdown.
	 * @apiSuccess {string} post.authors A comma seperated list of authors.
	 * @apiSuccess {string} post.created The time stamp of the post creation.
	 */
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
