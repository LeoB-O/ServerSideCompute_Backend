const util = require('../utils');
const User = require('../models/User');

module.exports = {
    login: function (req, res, next) {
        if(!util.reqShouldContain(['username', 'password'])(req)) {
            util.handleResponse(res, null, 'login: need username and password');
            return;
        }
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({username: username}, function (err, user) {
            if (err || !user) {
                util.handleResponse(res, {}, err || {
                    code: util.USER_NOT_EXIST,
                    message: 'No such user'
                });
                return;
            }

            if (user.validPassword(password)) {
                let jwt = res.jwt({
                    id: user._id,
                    username: user.username,
                    permission: user.permission,
                    info: user.info
                });
                util.handleResponse(res, {
                    id: user._id,
                    username: user.username,
                    token: jwt.token,
                    permission: user.permission
                })
            } else {
                util.handleResponse(res, null, 'Username or Password error');
            }
        });
    },
    info: function (req, res, next) {
        util.handleResponse(res, {
            roles: req.jwt.payload.permission,
            introduction: '',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: req.jwt.payload.username
        });
    }
}
