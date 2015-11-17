var http = require("http");
module.exports = function (app) {
	app.get('/define', function (req, res) {
		word = req.query.word;
		http.get({
			"hostname": "localhost",
			"path": "/api/define" + (word ? "?word=" + word : ""),
			port: 3000
		}, function(response) {
		  var body = '';
		  response.on('data', function(chunk) {
		    body += chunk;
		  });
		  response.on('end', function() {
		  	console.log("Got response: " + response.statusCode);
		  	try {
		  		body = JSON.parse(body);
			  	res.render("definition.nunjucks", {word: body.word, definitions: body.results});
		  	} catch (e) {
		  		res.render("definition.nunjucks", {word: body.word, definitions: []});
		  	}
		  });
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		  res.render("message.nunjucks",{message: e.message});
		});
	});
};