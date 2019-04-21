var mongoose = require('mongoose');
var schema = mongoose.Schema;

var patientSchema = new schema({
	// _id: {type: String, required:true, unique:true},
	dateReg: String,

	fName: String,
	lName: String,
	idNo: Number,
	bDate: String,
	school: String,
	langs: String,
	address: String,
	tel: String,
	email: String,

	motherName: String,
	mJob: String,
	mTel: String,
	fatherName: String,
	fJob: String,
	fTel: String,
	married: String,

	siblings: Array,

	ans1: String,
	ans2: String,
	ans3: String,

	ans4: String,
	ans5: String,
	ans6: String,
	ans7: String,
	ans8: String,
	ans9: String,
	ans10: String,
	ans11: String,
	ans12: String,

	ans13: String,
	ans14: String,
	ans15: String,
	ans16: String,

	ans17: String,
	ans18: String,
	ans19: String,
	ans20: String,
	ans21: String,

	ans22: String,
	ans23: String,
	ans24: String,

}, {collection: 'Patients'});

var Patinet = mongoose.model('Patinet', patientSchema);

module.exports = Patinet;
