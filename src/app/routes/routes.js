var mashery_api_authentication = require('../../lib/mashery_api_authentication');

module.exports = function(app, config) {
	app.get("/", function(req, res) {
		res.render("home");
	});

	app.get("/packages", function(req, res) {
		if(req.isAuthenticated()) {
		  res.render("packages",
		  	{
		  		user : req.user
		  	});
		} else {
			res.render("packages",
				{
					user : null
				});
		}
	});

	app.get("/members", function(req, res) {
		if(req.isAuthenticated()) {
		  res.render("members",
		  	{
		  		user : req.user
		  	});
		} else {
			res.render("members",
				{
					user : null
				});
		}
	});


	app.get("/profile", function(req, res) {
		console.log(req.session.mashery_access_token);
		res.render("profile",
			{
				token : (req.session.mashery_access_token !== undefined ? req.session.mashery_access_token.access_token : null)
			}
		);
	});

	app.post("/profile", function(req, res) {
		mashery_api_authentication(req, res, function() { 
			res.render("profile",
			{
				token : req.session.mashery_access_token.access_token
			});

		});
	});

}