const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.GoogleClientID,
        clientSecret: keys.GoogleClientSecret,
        callbackURL: "https://radiant-beyond-44855.herokuapp.com/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({google:profile.id},(err,user) => {
            if (err) {
                throw err;
            }
            if (user) {
                return done(null,user);
            }else{
                

                const newUser = {
                    google: profile.id,
                    fullname: profile.displayName,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    image: profile.photos[0].value
                }
                new User(newUser).save((err) => {
                    if (err) {
                        throw err;
                    }
                    return done(null,newUser);
                })
            }
        })
    }
));
