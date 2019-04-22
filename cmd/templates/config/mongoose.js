var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
	var db = mongoose.connect(config.mongdb, {
		useNewUrlParser: true
	}, function(err) {
		if (err) {
			console.log('Connect Mongodb Err:' + err);
		} else {
			console.log('Connect Mongodb Succeed');
		}
	});

	require('../models/demo.models');

	return db;
};
