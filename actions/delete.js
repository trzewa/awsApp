var helpers = require("../helpers"),
    template = "deleteResult.ejs",
    AWS = require("aws-sdk"),
    configFilePath = "config.json",
    prefix = "pawel.jablonski";

  var params = {
                Bucket: 'lab4-weeia',
                Prefix: prefix,
        };

exports.action = function(request, callback) {

	AWS.config.loadFromPath(configFilePath);
        
	params.Delete = {};
	params.Delete.Objects = [];

	var s3 = new AWS.S3();
	var keys = request.query.keys;
	keys = Array.isArray(keys)?keys:[keys];
	keys.forEach(function(key){
	     params.Delete.Objects.push({Key: keys})
                s3.deleteObject(params, function(err, data) {
	           if (err)
	              callback(null, {template: template, params:{keys:keys, prefix:prefix}});
	           else     
		      callback(null, {template: template, params:{keys:keys, prefix:prefix}});
		});
	});
}
