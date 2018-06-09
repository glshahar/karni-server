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


/*** All routes ***/

// Get All Patients
app.get('/getAllPatients', db.getAllPatients);


// Save Form
app.post('/saveForm', db.saveForm);


app.listen(port);
console.log("karni server app listening on port " + port);