module.exports = {
    SUCCESS: 20000,
    USER_NOT_EXIST: 50001,
    INVALID_TOKEN: 50008,
    MULTI_LOGIN: 50012,
    OLD_TOKEN: 50014,
    ERROR: 50000,
    handleResponse: function (res, data, error) {
        if (error) {
            res.send({
                code: error.code || this.ERROR,
                message: error.message || error || 'Error!',
                data: data || {}
            });
        } else {
            res.send({
                code: this.SUCCESS,
                data: data || {}
            })
        }
    },
    reqShouldContain: function (params) {
        return function (req) {
            for (let p of params) {
                if (!req.body[p] && !req.query[p]) {
                    return false;
                }
                if (req.body[p] === 'undefined' || req.query[p] === 'undefined') {
                    return false;
                }
            }
            return true;
        }
    },
};
