var session = require('express-session');
var router = require('express').Router();

router.use(session({
    secret: 'aniandazizareawesome'
}));

router.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

module.exports = router;
