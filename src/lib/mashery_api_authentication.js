var querystring = require('querystring')
var request = require('request')

exports = module.exports = function authenticate(req,res,next) {
    var post_data = {
        'area_id' : req.body.areaId,
        'area_uuid': req.body.areaUuid,
        'username': req.user.id
    };   
    request.post({url:'http://' + process.env.WEBDB_PORT_5432_TCP_ADDR + ':' + process.env.WEBDB_PORT_5432_TCP_PORT + '/authentication', form: post_data}, function(err,httpResponse,body) { 
        if (httpResponse.statusCode == 200) {
            var mashery_access_token = JSON.parse(body);
            req.session.mashery_access_token = mashery_access_token
            next();
        }
    });
};


