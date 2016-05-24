var session = require('express-session');
var router = require('express').Router();
var User = require("../api/users/user.model");

router.use(session({
    secret: 'aniandazizareawesome'
}))

router.post("/login", function(req, res, next ){
    User.findOne({
        where: req.body
    })
        .then(function(user){
        if(!user) res.sendStatus(401);
        else {
            req.session.userId = user.id;
            res.sendStatus(204);
        }
    })
        .catch(next);
})

module.exports = router;
