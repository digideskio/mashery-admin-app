var querystring = require('querystring');
var request = require('request');
module.exports = function(app, config) {
    app.get("/reports", function(req, res) {
          res.render("reports");
    });

    app.get("/reports/query", function(req, res) {
          res.render("reports/query");
    });

    app.post("/reports/query", function(req, res) {
        if(req.isAuthenticated()) {
            if (req.body.areaId === '' || req.body.areaUuid === '') {
                res.render("reports/query",
                {
                    user : req.user,
                    success : null,
                    error : 'Missing required parameters. Please fill out form completely.'
                });

            }
            if (req.body.saveMasheryAreaInformation == 'on') {
                req.session.areaId = req.body.areaId;
                req.session.areaUuid = req.body.areaUuid;
            } else {
                req.session.areaId = null;
                req.session.areaUuid = null;

            }

        } else {
            res.render("reports/query",
            {
                user : null
            });
        }
    });

}