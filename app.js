const express = require('express')
const app = express()
const port = 7777

var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, () => console.log(`kaymies app listening on port ${port}!`));

app.get('/test', (req, res) => res.send('Hello World!'));

app.get('/', function(req, res){

  res.render("index", {hello: "This is your fonts"});
});

app.use(serveStatic(__dirname, {'app': ['index.html', 'index.htm']}));

app.get('/BookingForm.html', function(req, res){

  res.render("bookingForm", {hello: "Hello", world: "World"});
});

app.get('/Shop.html', function(req, res){

  res.render("shopHome", {warning: "Stop being nosey"});
});

//this may or may not be used... ill see soon
function getParamValuesKey(urlPath){
	var urlArray = urlPath.split("?");
	var paramString = urlArray[1];

	var params = paramString.split("=");

	let map = new Map();

	for(var i=0; i < params.length;i++){
		var key;
		var value;

		if(i % 2 == 0){
			key = params[i];
		}else{
			var valueParam = params[i].split("&");
			if(valueParam.length > 1){
				value = valueParam[0];
				params[i+1] = valueParam[i];
			}else{
				value = params[i];
			}

		}
		map.set(key, value);

	}

  if(map.get('email') != null){
    map.set('email', map.get('email').replace('%','@'));
  }

	console.log(map);
	return map;
}
