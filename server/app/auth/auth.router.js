var router = require('express').Router();
var User = require("../../api/users/user.model");

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
                res.sendStatus(204);
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

module.exports = router;
