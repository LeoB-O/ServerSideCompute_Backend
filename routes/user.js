var express = require('express');
var router = express.Router();

var login = require('../controllers/login');


router.get('/user/info', login.info);

module.exports = router;
