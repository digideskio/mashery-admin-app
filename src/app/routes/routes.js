var mashery_api_authentication = require('../../lib/mashery_api_authentication');

module.exports = function(app, config, passport) {
	app.get("/", function(req, res) {
		
		if(req.isAuthenticated()) {

			res.render("home",
		  	{
		  		user : req.user
		  	});
		} else {
			res.render("home",
				{
					user : null
				});
		}
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

	app.get("/login",
		passport.authenticate(config.passport.strategy,
		{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);

	app.post('/login/callback',
		passport.authenticate(config.passport.strategy,
			{
				failureRedirect: '/',
				failureFlash: true
			}),
		function(req, res) {
			res.redirect('/');
		}
	);

	app.get("/signup", function (req, res) {
		res.render("signup");
	});

	app.get("/profile", function(req, res) {
		console.log(req.session.mashery_access_token);
    	if(req.isAuthenticated()){
			res.render("profile",
				{
					user : req.user,
					token : (req.session.mashery_access_token !== undefined ? req.session.mashery_access_token.access_token : null)
				});
   		} else {
    	    res.redirect("/login");
	    }
	});

	app.post("/profile", function(req, res) {
    	if(req.isAuthenticated()){
    		mashery_api_authentication(req, res, function() { 
				res.render("profile",
				{
					user : req.user,
					token : req.session.mashery_access_token.access_token
				});

    		});
   		} else {
    	    res.redirect("/login");
	    }
	});

	app.get('/logout', function(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});
}