//url : "https://wordsapiv1.p.mashape.com/words/{word}" "X-Mashape-Key", "8eVWqtLfcGmsh6SVYIdtEi3RFU0wp1eHyfFjsn55YAFaazgReV")
var https = require("https");

module.exports = function (app) {
	app.get('/api/define', function (req, res) {
		word = req.query.word;
		https.get({
			headers: {
				"X-Mashape-Key": "zgaISKyNoImsha1507SORFsCpzATp1Jp2HYjsnUSEjhIFJHbsJ"
			},
			"hostname": "wordsapiv1.p.mashape.com",
			"path": "/words/" + (word ? word : "?random=true")
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
	});
};