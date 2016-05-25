var passport = require('passport');
// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../../api/users/user.model");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(function(user) {
        done(null, user)
    })
    .catch(done);
})

passport.use(
    new GoogleStrategy({
            clientID: '65214004209-98flsvdhj0aoegqvlgsafle111l5qbg2.apps.googleusercontent.com',
            clientSecret: 'RpQ7EOGZJuAmQAiugcqKvAkn',
            callbackURL: 'http://localhost:8080/auth/google/callback'
        },
        // Google will send back the token and profile
        function (token, refreshToken, profile, done) {
            // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
            /*
             --- fill this part in ---
             */
            var info = {
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos ? profile.photos[0].value : undefined
            };
            User.findOrCreate({
                    where: {googleId: profile.id},
                    defaults: info
                })
                .spread(function (user) {
                    done(null, user);
                })
                .catch(done);
        })
);

module.exports = passport;
