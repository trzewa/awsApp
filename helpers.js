var fs = require('fs');
var crypto = require('crypto');
var async = require("async");

var readJSONFile = function(fileName){
	if(!fs.existsSync(fileName)) {
		console.log("unable to open file: " + fileName);
		throw new Error("unable to open file: " + fileName);
	}
	var data = fs.readFileSync(fileName, {encoding:'utf8'});
	var object = JSON.parse(data);
	return object;	  	
}

exports.readJSONFile = readJSONFile;
