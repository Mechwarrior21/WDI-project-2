var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	displayName	: {type: String},
	email 		: {type: String, unique: true, required: true},
	password 	: {type: String},

	twitter: {
		accessToken: String,
		refreshToken: String,
		id: String,
		profile: mongoose.Schema.Types.Mixed
	},
    
    google: {
		accessToken: String,
		refreshToken: String,
		id: String,
		profile: mongoose.Schema.Types.Mixed
    },
		
},{
	timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;