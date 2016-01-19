var helpers = require("../helpers"),
    template = "send.ejs",
    AWS = require("aws-sdk"),
    configFilePath = "config.json",
    prefix = "pawel.jablonski",
    QueueUrl = "https://sqs.us-west-2.amazonaws.com/983680736795/trzewikowskiSQS",
    Queue = require("queuemanager");

exports.action = function(request, callback) {

	AWS.config.loadFromPath(configFilePath);
	var keys = request.query.keys;
	keys = Array.isArray(keys)?keys:[keys];
	keys.forEach(function(key){
	var queue = new Queue(new AWS.SQS(), QueueUrl);
	queue.sendMessage(key, function(err, data){
        var sdb = new AWS.SimpleDB();
	var dbParams = {
	    Attributes: 
            [{
	       Name:"key",
	       Value: key,
	       Replace: false
	    }],
	    DomainName: 'PawelKrzysiek', 
	    ItemName: "Sended to queue" 
	 };
	 sdb.putAttributes(dbParams, function(err, data) {
		if (err)
			callback(null, {template: template, params:{send:true, log:false, keys:keys, prefix:prefix}});
		else     
			callback(null, {template: template, params:{send:true, log:true, keys:keys, prefix:prefix}});
		});

	});
});
}
