var querystring = require('querystring');
var request = require('request');
module.exports = function(app, config) {
    app.get("/services", function(req, res) {
        res.render("services");
    });

    app.get("/services/swagger", function(req, res) {
          res.render("services/swagger",
            {
                success: null,
                error: null
            });
    });

    app.post("/services/swagger", function(req, res) {
        if (req.body.areaId === '' || req.body.areaUuid === '' || req.body.publicDomain === '' || (req.body.swaggerUri === '' || req.body.swaggerText === '')) {
            res.render("services/swagger",
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
        var post_data = {
            'area_id' : (req.session.areaId !== null ? req.session.areaId : req.body.areaId),
            'area_uuid': (req.session.areaUuid !== null ? req.session.areaUuid : req.body.areaUuid),
            'username': req.user.id
        };   
        request.post({url:'http://localhost:5000/authentication', form: post_data}, function(err,httpResponse,body) { 
            if (httpResponse.statusCode == 200) {
                var mashery_access_token = JSON.parse(body);
                req.session.mashery_access_token = mashery_access_token
                console.log(mashery_access_token.access_token);
                var post_data = {
                    'public_domain' : req.body.publicDomain,
                    'external_source' : req.body.swaggerUri,
                    'create_package': (req.body.createPackage == 'on' ? true : false),
                    'create_iodoc': (req.body.createIodoc == 'on' ? true : false),
                    'mashery_access_token': mashery_access_token.access_token                        
                };
                request.post({url:'http://localhost:5000/api_definitions', form: post_data}, function(err,httpResponse,body) { 
                    if (httpResponse.statusCode == 200) {
                        res.render("services/swagger",
                        {
                            success: body,
                            error: null
                        });
                    } else {
                        res.render("services/swagger",
                        {
                            success : null,
                            error : body
                        });
                    }
                });
                } else {
                    res.render("services/swagger",
                    {
                        success : null,
                        error : body
                    });
                }

                
            });

    });

    app.get("/services/mashery", function(req, res) {
      res.render("services/mashery",
        {
            success: null,
            error: null
        });
    });

    app.get("/services/export", function(req, res) {
      res.render("services/export",
        {
            user : req.user
        });
    });

}