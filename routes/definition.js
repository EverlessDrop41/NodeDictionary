var http = require("http");
module.exports = function (app) {
	app.get('/define', function (req, res) {
		word = req.query.word;
		if (word) {
			http.get({
				"hostname": "localhost",
				"path": "/api/define?word=" + word,
				port: 3000
			}, function(response) {
			  var body = '';
			  response.on('data', function(chunk) {
			    body += chunk;
			  });
			  response.on('end', function() {
			  	console.log("Got response: " + response.statusCode);
				  res.setHeader('Content-Type', 'application/json');
				  res.send(body);
			  });
			}).on('error', function(e) {
			  console.log("Got error: " + e.message);
			  res.json(e);
			});
		} else {
			res.render("error.nunjucks",{message: "Word not specified"});
		}
	});
};