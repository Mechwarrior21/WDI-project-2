var twitterStrategy = require('passport-twitter').Strategy;

var appid = '2XqnFyoPyYhrVqPtcOt7JYwpw';
var appSecret = 'npg243Jr9Bo28w6z0KYLFArxkKzifdVzwzlfDRLTNFmOlLeZQ8';
var callback = 'http://localhost:3000/auth/twitter/callback';

var User = require('../models/user');

module.exports = function (passport) {
    
	passport.use("twitter", new twitterStrategy({
	    consumerKey: appid,
	    consumerSecret: appSecret,
	    callbackURL: callback,
        includeEmail: true,
        profileFields: ['id', 'emails', 'displayName']
	},

    function(token, tokenSecret, profile, done){
        
        process.nextTick(function(){
            
            var email = profile.emails[0].value
            
            User.findOne({'email' : email}, function(err, user){
                
                if(user){
                    console.log("twitterStrategy: local user found - merging data");
                    
                    user.twitter.accessToken = token;
                    user.twitter.refreshToken = tokenSecret;
                    user.twitter.id = profile.id;
                    user.twitter.profile = profile;
                    
                    user.save(function(err, user){
                        return done(null,false);
                    });
                } else {
                    console.log("twitterStrategy: unknown user - create new user");
                    
                    var user = new User();
                    user.email = email;
                    user.pasword = "";
                    user.twitter.accessToken = token;
                    user.twitter.refreshToken = tokenSecret;
                    user.twitter.id = profile.id;
                    user.twitter.profile = profile;
                    
                    user.save(function(err, user){
                        return done(null,false);
                    });
                }  
            });
        });
    }));
}