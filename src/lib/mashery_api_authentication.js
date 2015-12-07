var querystring = require('querystring')
var request = require('request')

exports = module.exports = function authenticate(req,res,next) {
    var post_data = {
        'area_id' : req.body.areaId,
        'area_uuid': req.body.areaUuid,
        'username': req.user.id
    };   
    //console.log(post_data);
    request.post({url:'http://localhost:5000/authentication', form: post_data}, function(err,httpResponse,body) { 
        if (httpResponse.statusCode == 200) {
            var mashery_access_token = JSON.parse(body);
            req.session.mashery_access_token = mashery_access_token
            next();
        }
    });
};


