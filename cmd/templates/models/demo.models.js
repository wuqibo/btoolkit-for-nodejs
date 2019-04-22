var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	account: String,
	password: String,
	avatar: String,
	email: String
}, {
	//这是mongoose内部配置，会自动记录创建时间和修改时间
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
});

mongoose.model('users', UsersSchema, 'users');
