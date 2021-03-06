var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var db = require('./dbController');
var port = process.env.PORT || 3000;

/*** Server settings ***/
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});


app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '5mb'
}));




/*** All routes ***/

// Client Routes //
app.post('/saveForm', db.saveForm);
app.post('/saveSecrecy', db.saveSecrecy);
app.post('/saveAgreement', db.saveAgreement);


// Admin Routes //
app.post('/serverCheck', db.serverCheck);
app.post('/adminLogin', db.adminLogin);
app.post('/getAllPatients', db.getAllPatients);

// Shadow Yoga Routes //
app.post('/sendContactForm', db.sendContactForm);

// Portfolio //
app.post('/sendContactGal', db.sendContactGal);

// Portfolio //
app.post('/sendAnalytics', db.sendAnalytics);
app.post('/getLogs', db.getLogs);

app.listen(port);
console.log("karni server app listening on port " + port);