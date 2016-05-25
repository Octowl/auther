var router = require('express').Router();
var User = require("../../api/users/user.model");
var passport = require("./strategies");

router.post('/login', function (req, res, next) {
    User.findOne({
            where: req.body
        })
        .then(function (user) {
            if (!user) res.sendStatus(401);
            else {
                var hour = 3600000;
                req.session.cookie.maxAge = hour;
                req.session.userId = user.id;
                res.status(201).send(user);
            }
        })
        .catch(next);
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function(err){
        if (err) next(err);
        else res.sendStatus(204);
    });
});

// Google authentication and login
router.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect : '/', // or wherever
        failureRedirect : '/' // or wherever
    })
);

module.exports = router;
