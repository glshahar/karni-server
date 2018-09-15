var mongoose = require('mongoose');
var schema = mongoose.Schema;

var logSchema = new schema({
	_id: String,
	logUserId: String,
	logDate: String,
	logAction: String,
	logResolution: String,
}, {collection: 'analytics'});

var Log = mongoose.model('Log', logSchema);

module.exports = Log;