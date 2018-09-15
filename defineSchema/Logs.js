var mongoose = require('mongoose');
var schema = mongoose.Schema;

var logsSchema = new schema({
	_id: String,
	logType: String,
	logsArr: []
}, {collection: 'analytics'});

var Logs = mongoose.model('Logs', logsSchema);

module.exports = Logs;