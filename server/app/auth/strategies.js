var passport = require('passport');
// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../../api/users/user.model");

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


            console.log('---', 'in verification callback', profile, '---');
            done();
        })
);

module.exports = passport;
//
//{ id: '102374752099935339438',
//    displayName: 'Ani Aj',
//    name: { familyName: 'Aj', givenName: 'Ani' },
//    emails: [ { value: 'aganita21@gmail.com', type: 'account' } ],
//        photos: [ { value: 'https://lh4.googleusercontent.com/-9HFE4CFf0xQ/AAAAAAAAAAI/AAAAAAAAANM/WTeVWEaa87c/photo.jpg?sz=50' } ],
//    gender: 'female',
//    provider: 'google',
//    _raw: '{\n "kind": "plus#person",\n "etag": "\\"9RfJHQrviqM_fwiLNk11QGzyCj0/_MY3p82wt8VEmKcVg8bXrBbj5L8\\"",\n "gender": "female",\n "emails": [\n  {\n   "value": "aganita21@gmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "102374752099935339438",\n "displayName": "Ani Aj",\n "name": {\n  "familyName": "Aj",\n  "givenName": "Ani"\n },\n "url": "https://plus.google.com/102374752099935339438",\n "image": {\n  "url": "https://lh4.googleusercontent.com/-9HFE4CFf0xQ/AAAAAAAAAAI/AAAAAAAAANM/WTeVWEaa87c/photo.jpg?sz=50",\n  "isDefault": false\n },\n "isPlusUser": true,\n "circledByCount": 14,\n "verified": false\n}\n',
//    _json:
//    { kind: 'plus#person',
//        etag: '"9RfJHQrviqM_fwiLNk11QGzyCj0/_MY3p82wt8VEmKcVg8bXrBbj5L8"',
//        gender: 'female',
//        emails: [ [Object] ],
//        objectType: 'person',
//        id: '102374752099935339438',
//        displayName: 'Ani Aj',
//        name: { familyName: 'Aj', givenName: 'Ani' },
//        url: 'https://plus.google.com/102374752099935339438',
//            image:
//        { url: 'https://lh4.googleusercontent.com/-9HFE4CFf0xQ/AAAAAAAAAAI/AAAAAAAAANM/WTeVWEaa87c/photo.jpg?sz=50',
//            isDefault: false },
//        isPlusUser: true,
//            circledByCount: 14,
//        verified: false } } ---
