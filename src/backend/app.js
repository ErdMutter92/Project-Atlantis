var express = require('express') ;
var bodyParser = require('body-parser');
var http  = require('http') ;
var fs  = require('fs') ;
var io  = require('socket.io');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', 8180);

// Reads through all the js controllers and requires them.
fs.readdirSync('./src/backend/controllers').forEach(function (file) {
	if (file.substr(-3) === '.js') {
		route = require('./controllers/' + file);
		route.controller(app);
	}
});

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server is running on port ' + app.get('port'));
});
