const express = require('express')
const app = express();
const port = 7777
const fileUpload = require('express-fileupload');

var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.listen(port, () => console.log(`kaymies app listening on port ${port}!`));

// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));
app.use(fileUpload());

require('./controllers/mainRouts.js')(app,urlencodedParser,jsonParser);

app.use(serveStatic(__dirname, {'app': ['index.html', 'index.htm']}));
