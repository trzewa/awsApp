var AWS = require("aws-sdk");
var os = require("os");
fs = require('fs');
//accessKeyId ... klucze do amazona 
AWS.config.loadFromPath('./config.json');
template = "status.ejs";
prefix = "pawel.jablonski";
//zawiera funkcje pomocnicze generowania skrótów robienia z jonson obiektu ...
var helpers = require("../helpers");

//obiekt do obsługi simple DB z aws-sdk
var simpledb = new AWS.SimpleDB();

//funkcja która zostanie wykonana po wejściu na stronę 
//request dane o zapytaniu, callback funkcja zwrotna zwracająca kod html
var task =  function(request, callback){
	
	
	//$_GET['bucket'], $_GET['key'], $_GET['etag']
	var key =  request.query.key;
	
	//parametr do wybrania danych z bazy -- taki select ;p
	var paramsXXXX = {
		DomainName: 'PawelKrzysiek', //required 
		ItemName: 'ITEM001', // required 
		AttributeNames: [
			key,
		],
	};
	
	simpledb.getAttributes(paramsXXXX, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {		
			if(data.Attributes[0].Value == "yes"){				
				callback(null, {template: template, params:{send:true}});
			}else{
				callback(null, {template: template, params:{send:false}});
			}
			
		}
	});	
	
    //odczytanie zawartości pliku
	/*fs.readFile('/home/bitnami/awslab4/actions/files/dane.s', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
			//Funkcja zwracająca kod HTML wyświetlany na ekranie
			callback(null,data);	
			//console.log(data);
	});*/

}
exports.action = task
