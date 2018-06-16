var mongoose = require('mongoose');
var schema = mongoose.Schema;

var adminSchema = new schema({
	email: String,
	password: String,
	token: String,

}, {collection: 'KarniAdmin'});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
