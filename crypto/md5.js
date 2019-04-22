const crypto = require('crypto');

module.exports = function(input) {
	const md5 = crypto.createHash('md5');
	return md5.update(input).digest('hex');
};
