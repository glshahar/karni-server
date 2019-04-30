// npm Initialize
var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');


// Schemes
var Patient = require('./defineSchema/Patient');
var Admin = require('./defineSchema/Admin');

// Get All Patients - Just for admin
exports.getAllPatients = function(req, res){
	if((req.body.user.email)&&(req.body.user.token)){
		Admin.findOne({}).where('email').equals(req.body.user.email). 
		where('_id').equals(req.body.user.token).
		exec (function(err, admin){
			if(err){
		        console.log(err);
				return res.status(500).send();
			}
			if(admin){
				console.log("Start Get All Patients Data...");
				Patient.find().where('_id').exec (function(err, data){
					if(err) {
						console.log(err);
						return res.status(500).send();
					}
					// console.log(JSON.stringify(data, null, 2));
					console.log("Get Patients Successfully Done !");
					return res.status(200).send(data);
				})
			}
		})
	}
};

// Save Questionnaire Form
exports.saveForm = function(req, res){
	console.log("Start Save New Form...");

	if(req.body.userDetails){
		var now = new Date();
		console.log("Start Save New Patient.. ");
		console.log("REQ: "+JSON.stringify(req.body.userDetails, null, 4));

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
		newPatient.married = req.body.userDetails.married;

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


		let siblings = [];
		for (var i = 0; i < req.body.userDetails.siblings.length; i++) {
			siblings[i] = new Object({
			    name: " ",
			    age: " ",
			    gender: " ",
			    probSpeach: " ",
			    speach: " ",
			    school: " ",
			});
			console.log("I => "+i);
			if(req.body.userDetails.siblings[i].name!=undefined){
	            siblings[i].name = req.body.userDetails.siblings[i].name;
	            siblings[i].age = req.body.userDetails.siblings[i].age;
	            siblings[i].gender = req.body.userDetails.siblings[i].gender;
	            siblings[i].probSpeach = req.body.userDetails.siblings[i].probSpeach;
	            siblings[i].speach = req.body.userDetails.siblings[i].speach;
	            siblings[i].school = req.body.userDetails.siblings[i].school;
			}
			else {
	            siblings[i].name = " ";
	            siblings[i].age = " ";
	            siblings[i].gender = " ";
	            siblings[i].probSpeach = " ";
	            siblings[i].speach = " ";
	            siblings[i].school = " ";
			}
			if(i==req.body.userDetails.siblings.length-1)
				console.log("siblings: "+siblings);
		}

		var JSZip = require('jszip');
		var Docxtemplater = require('docxtemplater');

		var fs = require('fs');
		var path = require('path');

		//Load the docx file as a binary
		var content = fs
		    .readFileSync(path.resolve(__dirname, './documents/index.docx'), 'binary');

		var zip = new JSZip(content);

		var doc = new Docxtemplater();
		doc.loadZip(zip);

		//set the templateVariables
		doc.setData({
			"date": dateFormat(now, "dd/mm/yyyy"),
		    "first_name": req.body.userDetails.fName,
		    "last_name": req.body.userDetails.lName,
		    "idNo": req.body.userDetails.idNo,
		    "bDate": req.body.userDetails.bDate,

		    "school": req.body.userDetails.school,
            'langs': req.body.userDetails.langs,
            'address': req.body.userDetails.address,
            'tel': req.body.userDetails.tel,
            'email': req.body.userDetails.email,

            'motherName': req.body.userDetails.motherName,
            'mJob': req.body.userDetails.mJob,
            'mTel': req.body.userDetails.mTel,
            'fatherName': req.body.userDetails.fatherName,
            'fJob': req.body.userDetails.fJob,
			'fTel': req.body.userDetails.fTel,
			'married': req.body.userDetails.married,

            'sib1name': siblings[0].name,
            'sib1age': siblings[0].age,
            'sib1gender': siblings[0].gender,
            'sib1prob': siblings[0].probSpeach,
            'sib1speach': siblings[0].speach,
            'sib1school': siblings[0].school,

            'sib2name': siblings[1].name,
            'sib2age': siblings[1].age,
            'sib2gender': siblings[1].gender,
            'sib2prob': siblings[1].probSpeach,
            'sib2speach': siblings[1].speach,
            'sib2school': siblings[1].school,

            'sib3name': siblings[2].name,
            'sib3age': siblings[2].age,
            'sib3gender': siblings[2].gender,
            'sib3prob': siblings[2].probSpeach,
            'sib3speach': siblings[2].speach,
            'sib3school': siblings[2].school,

            'sib4name': siblings[3].name,
            'sib4age': siblings[3].age,
            'sib4gender': siblings[3].gender,
            'sib4prob': siblings[3].probSpeach,
            'sib4speach': siblings[3].speach,
            'sib4school': siblings[3].school,

            'sib5name': siblings[4].name,
            'sib5age': siblings[4].age,
            'sib5gender': siblings[4].gender,
            'sib5prob': siblings[4].probSpeach,
            'sib5speach': siblings[4].speach,
            'sib5school': siblings[4].school,

            'sib6name': siblings[5].name,
            'sib6age': siblings[5].age,
            'sib6gender': siblings[5].gender,
            'sib6prob': siblings[5].probSpeach,
            'sib6speach': siblings[5].speach,
            'sib6school': siblings[5].school,

            'sib7name': siblings[6].name,
            'sib7age': siblings[6].age,
            'sib7gender': siblings[6].gender,
            'sib7prob': siblings[6].probSpeach,
            'sib7speach': siblings[6].speach,
            'sib7school': siblings[6].school,


            'ans1': req.body.userDetails.ans1,
            'ans2': req.body.userDetails.ans2,
            'ans3': req.body.userDetails.ans3,

            'ans4': req.body.userDetails.ans4,
            'ans5': req.body.userDetails.ans5,
            'ans6': req.body.userDetails.ans6,
            'ans7': req.body.userDetails.ans7,
            'ans8': req.body.userDetails.ans8,
            'ans9': req.body.userDetails.ans9,
            'ans10': req.body.userDetails.ans10,
            'ans11': req.body.userDetails.ans11,
            'ans12': req.body.userDetails.ans12,

            'ans13': req.body.userDetails.ans13,
            'ans14': req.body.userDetails.ans14,
            'ans15': req.body.userDetails.ans15,
            'ans16': req.body.userDetails.ans16,

            'ans17': req.body.userDetails.ans17,
            'ans18': req.body.userDetails.ans18,
            'ans19': req.body.userDetails.ans19,
            'ans20': req.body.userDetails.ans20,
            'ans21': req.body.userDetails.ans21,

            'ans22': req.body.userDetails.ans22,
            'ans23': req.body.userDetails.ans23,
            'ans24': req.body.userDetails.ans24

		});

		try {
		    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		    doc.render()
		}
		catch (error) {
		    var e = {
		        message: error.message,
		        name: error.name,
		        stack: error.stack,
		        properties: error.properties,
		    }
		    console.log(JSON.stringify({error: e}));
		    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		    throw error;
		}

		var buf = doc.getZip().generate({type: 'nodebuffer'});

		// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
		// fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);


		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'cricketownIL@gmail.com',
		        pass: 'cricket838495922Af3_3'
		    }
		});
  		// setup email data with unicode symbols
		let mailOptions = {
		    from: '"הקליניקה של קרני" <cricketownIL@gmail.com>', // sender address
		    // to: "galsh20@gmail.com", // list of receivers
		    to: ["karnishrem@gmail.com", "galsh20@gmail.com"], // list of receivers
		    subject: "התקבל טופס שאלון חדש", // Subject line
		    text: "התקבל טופס שאלון חדש", // plain text body
		    attachments: [{   
		    	// utf-8 string as an attachment
		        filename: req.body.userDetails.fName+".docx",
		        content: buf
		    }]
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});


		newPatient.save(function(err, savedPatient){
			if(err){
				console.log(err);
				// return res.status(406).send(err);
			}
			console.log("Patent Saved Successfully");
			// return res.status(200).send(savedPatient);
		})


		// 	const nodemailer = require('nodemailer');
		// 	// create reusable transporter object using the default SMTP transport
		// 	let transporter = nodemailer.createTransport({
		// 	    service: 'gmail',
		// 	    auth: {
		// 	        user: 'cricketownIL@gmail.com',
		// 	        pass: 'cricket838495922Af3_3'
		// 	    }
		// 	});
	 //  		// setup email data with unicode symbols
		// 	let mailOptions = {
		// 	    from: '"הקליניקה של קרני" <cricketownIL@gmail.com>', // sender address
		// 	    to: "karnishrem@gmail.com", // list of receivers
		// 	    subject: "התקבל טופס הרשמה חדש", // Subject line
		// 	    text: "התקבל טופס הרשמה חדש", // plain text body
		// 	};

		// 	// send mail with defined transport object
		// 	transporter.sendMail(mailOptions, (error, info) => {
		// 	    if (error) {
		// 	        return console.log(error);
		// 	    }
		// 	    console.log('Message %s sent: %s', info.messageId, info.response);
		// 	});

		// 	return res.status(200).send(savedPatient);
		// })
	}
	else console.log("Error Save New Patient - Some details is missing");
};

// Save Secrecy Form
exports.saveSecrecy = function(req, res){
	// console.log("REQ: "+JSON.stringify(req.body, null, 4));
	console.log("Start Save Secrecy Form...");
	if(req.body.userDetails){
		res.status(200).send();
		var now = new Date();

		var ImageModule = require('docxtemplater-image-module');

		global.atob = require("atob");

		var dataImg = req.body.userDetails.img;
		let buff = dataURItoBlob(req.body.userDetails.img);


		function dataURItoBlob(dataURI) {
		    // convert base64/URLEncoded data to binary data
		    var byteString;
		    if (dataURI.split(',')[0].indexOf('base64') >= 0)
		        byteString = atob(dataURI.split(',')[1]);
		    else
		        byteString = unescape(dataURI.split(',')[1]);

		    // separate out the mime component
		    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		    // write the bytes of the string to a typed array
		    var ia = new Uint8Array(byteString.length);
		    for (var i = 0; i < byteString.length; i++) {
		        ia[i] = byteString.charCodeAt(i);
		    }
		    let buffer = Buffer.from(ia);
			let arraybuffer = Uint8Array.from(buffer).buffer;
			return arraybuffer;
		}



		var opts = {}
		opts.centered = false;
		opts.getImage=function(tagValue, tagName) {return buff;}
		opts.getSize=function(img,tagValue, tagName) {return [140,70];}

		var imageModule = new ImageModule(opts);
		//Load the docx file as a binary
		var content = fs
		    .readFileSync(path.resolve(__dirname, './documents/secrecy.docx'), 'binary');

		var zip = new JSZip(content);
		var doc = new Docxtemplater().attachModule(imageModule);
		doc.loadZip(zip);


		//set the templateVariables
		doc.setData({
			"date": dateFormat(now, "dd/mm/yyyy"),
		    "first_name": req.body.userDetails.fName,
		    "idNo": req.body.userDetails.idNo,
		    "parentName": req.body.userDetails.parentName,
		    "parentId": req.body.userDetails.parentId,
		    "image": "file.png",
		});
		try {
		    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		    doc.render()
		}
		catch (error) {
		    var e = {
		        message: error.message,
		        name: error.name,
		        stack: error.stack,
		        properties: error.properties,
		    }
		    console.log(JSON.stringify({error: e}));
		    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		    throw error;
		}
		var buf = doc.getZip().generate({type:"nodebuffer"});
		// buf is a nodejs buffer, you can either write it to a file
		// fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);


		// Send Email - function
		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'cricketownIL@gmail.com',
		        pass: 'cricket838495922Af3_3'
		    }
		});
    	// setup email data with unicode symbols
		let mailOptions = {
		    from: '"הקליניקה של קרני" <cricketownIL@gmail.com>', // sender address
		    // to: "galsh20@gmail.com", // list of receivers
		    to: ["karnishrem@gmail.com", "galsh20@gmail.com"], // list of receivers
		    subject: "התקבל טופס ויתור סודיות חדש", // Subject line
		    text: "התקבל טופס ויתור סודיות חדש", // plain text body
		    attachments: [{   
		    	// utf-8 string as an attachment
		        filename: req.body.userDetails.fName+" - טופס סודיות.docx",
		        content: buf
		    }]
		};
		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});

	}
};

// Save Agreement Form
exports.saveAgreement = function(req, res){

	console.log("Start Save Agreement Form...");
	if(req.body.userDetails){

		res.status(200).send();

		var JSZip = require('jszip');
		var Docxtemplater = require('docxtemplater');

		var fs = require('fs');
		var path = require('path');

		var now = new Date();

		//Load the docx file as a binary
		var content = fs
		    .readFileSync(path.resolve(__dirname, './documents/agreement.docx'), 'binary');

		var zip = new JSZip(content);

		var doc = new Docxtemplater();
		doc.loadZip(zip);

		//set the templateVariables
		doc.setData({
			// "date": dateFormat(now, "dd/mm/yyyy"),
		    "day": req.body.userDetails.day,
		    "hour": req.body.userDetails.hour,
		    "startDate": req.body.userDetails.startDate
		});

		try {
		    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		    doc.render()
		}
		catch (error) {
		    var e = {
		        message: error.message,
		        name: error.name,
		        stack: error.stack,
		        properties: error.properties,
		    }
		    console.log(JSON.stringify({error: e}));
		    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		    throw error;
		}

		var buf = doc.getZip().generate({type: 'nodebuffer'});

		// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
		// fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'cricketownIL@gmail.com',
		        pass: 'cricket838495922Af3_3'
		    }
		});
    	// setup email data with unicode symbols
		let mailOptions = {
		    from: '"הקליניקה של קרני" <cricketownIL@gmail.com>', // sender address
		    // to: "galsh20@gmail.com", // list of receivers
		    to: ["karnishrem@gmail.com", "galsh20@gmail.com"], // list of receivers
		    subject: "התקבל חוזה טיפולי חדש", // Subject line
		    text: "התקבל חוזה טיפולי חדש", // plain text body
		    attachments: [{   
		    	// utf-8 string as an attachment
		        filename: "agreement.docx",
		        content: buf
		    }]
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});

	}
};




// Auto Server Check (Admin Mode)
exports.serverCheck = function(req, res){
	console.log("Server Checked..");
	return res.status(200).send();
};

// Check Admin Login
exports.adminLogin = function(req, res){
	if((req.body.user.email)&&(req.body.user.password)){
		Admin.findOne({}).where('email').equals(req.body.user.email). 
		where('password').equals(req.body.user.password).
		exec (function(err, admin){
			if(err){
		        console.log(err);
				return res.status(500).send();
			}
			if(!admin){
		        console.log("Email / Password Incorrect");
				return res.status(404).send("Error");
			}
			if(admin){
				console.log("Admin Login => Email: "+req.body.user.email+" / Password: "+req.body.user.password);
				var admin = {
					email: admin.email,
					token: admin._id,
					patients: Array
				}
				console.log("Start Get All Patients Data...");
				Patient.find().where('_id').exec (function(err, data){
					if(err) {
						console.log(err);
						return res.status(500).send();
					}
					// console.log(JSON.stringify(data, null, 2));
					admin.patients = data;
					console.log("Get Patients Successfully Done !");
					return res.status(200).send(admin);
				})	
			}
		})
	}
	else {
		console.log("email / password is missing");
		return res.status(500).send();
	}
};






// send Contact Form - Shadow Yoga Shala
exports.sendContactForm = function(req, res){
	console.log("Start Save Contact Form...");
	if(req.body.contactForm){
		console.log("JSON: "+JSON.stringify(req.body.contactForm, null, 4));
		res.status(200).send();
		var now = new Date();


		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'cricketownIL@gmail.com',
		        pass: 'cricket838495922Af3_3'
		    }
		});
    	// setup email data with unicode symbols
		let mailOptions = {
		    from: '"Shadow Yoga Shala" <cricketownIL@gmail.com>', // sender address
		    // to: "galsh20@gmail.com", // list of receivers
		    to: ["galsh20@gmail.com", "shuher.shani@gmail.com"], // list of receivers
		    subject: "Shadow Yoga Shala - New Message", // Subject line
		    text: "שם מלא: "+req.body.contactForm.fullName+"\n\n"+
		    		'כתובת דוא"ל: '+req.body.contactForm.email+"\n\n"+
		    		'תוכן ההודעה: \n'+req.body.contactForm.message		
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});

	}
	else return res.status(500).send();
};

// send Contact Form - Portfolio
exports.sendContactGal = function(req, res){
	console.log("Start Save Contact Form...");
	if(req.body.contactForm){
		console.log("JSON: "+JSON.stringify(req.body.contactForm, null, 4));
		res.status(200).send();
		var now = new Date();


		const nodemailer = require('nodemailer');

		// create reusable transporter object using the default SMTP transport
		// let transporter = nodemailer.createTransport({
		//     service: 'gmail',
		//     auth: {
		//         user: 'cricketownIL@gmail.com',
		//         pass: 'cricket838495922Af3_3'
		//     }
		// });

		// New reusable transporter object using the default SMTP transport
		// let transporter = nodemailer.createTransport({
		// 	service: 'Gmail',
		// 	auth: {
		// 		type: 'OAuth2',
		// 		user: 'cricketownIL@gmail.com',
		// 		pass: 'cricket838495922Af3_3',
		// 		clientId: '332571259822-f5oo1v25so1uq7oq9oo2h41gus7bsagj.apps.googleusercontent.com',
		// 		clientSecret: 'etYF6gGEIbiQIPI0dFPuNZU1',
		// 		refreshToken: '1/KyLmMvEqrPT6wr6D-MWst1zND8Dnpmy5eIqW7D5RmlA',
		// 		accessToken: 'ya29.Glv7BptWidIf1L1zz4WgCmS94whd0C9KEUARbqdqUmQO2iQgQLtAv76ApPyfeONORwEeYahgWrknHM8Iq0xIhAoTn2p35R6B0e9ZPobTAF0pDd0qQB0xu5wlyEPL',
		// 		expires: 1556636498754
		// 	}
		// });
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: 'cricketownIL@gmail.com',
				accessToken: 'ya29.Glv7BptWidIf1L1zz4WgCmS94whd0C9KEUARbqdqUmQO2iQgQLtAv76ApPyfeONORwEeYahgWrknHM8Iq0xIhAoTn2p35R6B0e9ZPobTAF0pDd0qQB0xu5wlyEPL',
			}
		});

    	// setup email data with unicode symbols
		let mailOptions = {
		    from: '"Gal Portfolio Msg" <cricketownIL@gmail.com>', // sender address
		    // to: "galsh20@gmail.com", // list of receivers
		    to: "galsh20@gmail.com", // list of receivers
		    subject: "Gal Portfolio - New Message", // Subject line
		    text: "שם מלא: "+req.body.contactForm.fullName+"\n\n"+
		    		'כתובת דוא"ל: '+req.body.contactForm.email+"\n\n"+
		    		'תוכן ההודעה: \n'+req.body.contactForm.message		
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});

	}
	else return res.status(500).send();
};


var Log = require('./defineSchema/Log');
var Logs = require('./defineSchema/Logs');

// Send Analytics
exports.sendAnalytics = function(req, res){
	if(req.body.analytics){
		console.log("REQ JSON: "+JSON.stringify(req.body.analytics, null, 4));
		res.status(200).send();

		var newLog = new Log();
	    var id = mongoose.Types.ObjectId();
	    newLog._id = id;
	    newLog.logUserId = req.body.analytics.userId;
	    newLog.logDate = req.body.analytics.date;
	    newLog.logAction = req.body.analytics.action;
	    newLog.logResolution = req.body.analytics.resolution;
	    console.log("NEW LOG: "+JSON.stringify(newLog, null, 2));



	    // Updade Logs Collection
	    // Logs.update(
	    // { logsType: "analytics" },
	    // { $push: { logsArr : newLog } } ).
	    // where('logUserId').equals(req.body.analytics.userId).
	    // exec (function(err, newLog){
	    //     if(err) console.log(err);
	    //     if(!newLog) console.log("Error Log");
	    //     if(newLog) console.log("Log Saved Successfully");
	    // })

	    
	    // Updade Logs Collection
	    Logs.update(
	    { logsType: "analytics" },
	    { $push: { logsArr : newLog } } ).
	    exec (function(err, newLog){
	        if(err) console.log(err);
	        if(!newLog) console.log("Error Log");
	        if(newLog) console.log("Log Saved Successfully");
	    })
	}
};

// Get Logs by Type (Admin Mode)
exports.getLogs = function(req, res){
	if(req.body.logsType){
		Logs.findOne({}).where('logsType').equals(req.body.logsType).
		exec (function(err, data){
			if(err) {
				console.log(err);
				return res.status(500).send();
			}
			// console.log(JSON.stringify(data.logsArr, null, 2));
			console.log("Get Logs Successfully");
			return res.status(200).send(data.logsArr);
		})
	}
	else return res.status(404).send();
};