var express = require('express');
var body_parser = require('body-parser');
var app = express();
var nunjucks = require('nunjucks');

app.use(express.static('public'));

//Refactor requests
app.use(body_parser.urlencoded({
	extended: false
}));

//Configure nunjucks
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//Check for domain from command line
var domain = "localhost";
process.argv.forEach(function (val, index, array) {
	try {
		if (index.toLowerCase() == 'domain') {
	  	domain = val;
	  }
	} catch (e) {}
});

//Log all requests
app.use(function (request, res, next) {
	console.log(request.method + request.url);
	next();
});

require('./routes/index.js')(app);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//Useful prototype
String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};