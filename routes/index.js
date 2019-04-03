var express = require('express');
var router = express.Router();
var jwt = require('jwt-express');

var login = require('../controllers/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

router.get('/user/info', jwt.active(), login.info);

module.exports = router;
