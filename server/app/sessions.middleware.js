var session = require('express-session');
var router = require('express').Router();

router.use(session({
    secret: 'aniandazizareawesome'
}))

module.exports = router
