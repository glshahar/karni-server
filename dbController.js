// npm Initialize
var mongoose = require('mongoose');
var dateFormat = require('dateformat');

// Schemes
var Patient = require('./defineSchema/Patient');

// Get All Patients - Just for admin
exports.getAllPatients = function(req, res){
	console.log("Start Get All Patients Data...");
	Patient.find().where('_id').exec (function(err, data){
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		console.log(JSON.stringify(data, null, 2));
		console.log("Get Patients Successfully Done !");
		return res.status(200).send(data);
	})
};


// Save Form
exports.saveForm = function(req, res){
	console.log("Start Save New Form...");

	if(req.body.userDetails){
		var now = new Date();
		console.log("Save New Patient.. "+req.body.email+" "+req.body.password+"");

		var newPatient = new Patient();

		newPatient._id = new mongoose.mongo.ObjectId();

		newPatient.fName = req.body.userDetails.fName;
		newPatient.lName = req.body.userDetails.lName;
		newPatient.idNo = req.body.userDetails.idNo;
		newPatient.bDate = req.body.userDetails.bDate;
		newPatient.school = req.body.userDetails.school;
		newPatient.langs = req.body.userDetails.langs;
		newPatient.address = req.body.userDetails.address;
		newPatient.tel = req.body.userDetails.tel;
		newPatient.email = req.body.userDetails.email;

		newPatient.motherName = req.body.userDetails.motherName;
		newPatient.mJob = req.body.userDetails.mJob;
		newPatient.mTel = req.body.userDetails.mTel;
		newPatient.fatherName = req.body.userDetails.fatherName;
		newPatient.fJob = req.body.userDetails.fJob;
		newPatient.fTel = req.body.userDetails.fTel;

		newPatient.siblings = req.body.userDetails.siblings;

		newPatient.ans1 = req.body.userDetails.ans1;
		newPatient.ans2 = req.body.userDetails.ans2;
		newPatient.ans3 = req.body.userDetails.ans3;

		newPatient.ans4 = req.body.userDetails.ans4;
		newPatient.ans5 = req.body.userDetails.ans5;
		newPatient.ans6 = req.body.userDetails.ans6;
		newPatient.ans7 = req.body.userDetails.ans7;
		newPatient.ans8 = req.body.userDetails.ans8;
		newPatient.ans9 = req.body.userDetails.ans9;
		newPatient.ans10 = req.body.userDetails.ans10;
		newPatient.ans11 = req.body.userDetails.ans11;
		newPatient.ans10 = req.body.userDetails.ans12;

		newPatient.ans13 = req.body.userDetails.ans13;
		newPatient.ans14 = req.body.userDetails.ans14;
		newPatient.ans15 = req.body.userDetails.ans15;
		newPatient.ans16 = req.body.userDetails.ans16;

		newPatient.ans17 = req.body.userDetails.ans17;
		newPatient.ans18 = req.body.userDetails.ans18;
		newPatient.ans19 = req.body.userDetails.ans19;
		newPatient.ans20 = req.body.userDetails.ans20;
		newPatient.ans21 = req.body.userDetails.ans21;

		newPatient.ans22 = req.body.userDetails.ans22;
		newPatient.ans23 = req.body.userDetails.ans23;
		newPatient.ans24 = req.body.userDetails.ans24;

		newPatient.dateReg = dateFormat(now, "dd/mm/yyyy");

		newPatient.save(function(err, savedPatient){
			if(err){
				console.log(err);
				return res.status(406).send(err);
			}
			console.log("Patent Saved Successfully");
			return res.status(200).send(savedPatient);
		})
	}
	else console.log("Error Save New Patient - Some details is missing");
};