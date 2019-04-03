const util = require('../utils');
const Consumption = require('../models/Consumption');
const axios = require('axios');

module.exports = {
    getWeather: function(req, res, next) {
        axios.get('http://v.juhe.cn/weather/index', {
            params: {
                cityname: req.query.city,
                key: '3313f0f41b92d0fc19310f0204b77469'
            }
        }).then(response => {
            util.handleResponse(res, response.data);
        });
    },
    addConsumption: function (req, res, next) {
        if (!util.reqShouldContain(['name', 'amount'])(req)) {
            util.handleResponse(res, null, 'add consumption: need name and amount');
            return;
        }
        let userId = req.jwt.payload.id;
        let name = req.body.name;
        let detail = req.body.detail || '';
        let amount = req.body.amount;
        let createdAt = req.body.createdAt || Date.now();

        Consumption.findOne({userId: userId}, function (err, consumption) {
            if (err) {
                util.handleResponse(res, null, err);
                return
            }
            if (!consumption) {
                Consumption.create({
                    userId: userId,
                    consumptions: [{
                        name: name,
                        amount: amount,
                        detail: detail,
                        createdAt: createdAt
                    }]
                }, function (err, consumption) {
                    util.handleResponse(res, {consumption: consumption}, err);
                });
                return;
            }
            consumption.consumptions.push({
                name: name,
                amount: amount,
                detail: detail,
                createdAt: createdAt
            });
            consumption.save(function (err, consumption) {
                util.handleResponse(res, {consumption: consumption}, err);
            });
        });


    },
    getConsumptions: function (req, res, next) {
        let userId = req.jwt.payload.id;
        Consumption.findOne({userId: userId}, function (err, consumption) {
            util.handleResponse(res, {consumption: consumption}, err);
        });
    },
    deleteConsumption: function (req, res, next) {
        if (!util.reqShouldContain(['id'])(req)) {
            util.handleResponse(res, null, 'delete consumption: need id');
            return;
        }
        Consumption.findOne({userId: req.jwt.payload.id}, function (err, consumption) {
            consumption.consumptions.forEach((value, index) => {
                if (value._id == req.query.id) {
                    consumption.consumptions.splice(index, 1);
                    consumption.save(function (err, data) {
                        util.handleResponse(res, data, err);
                    })
                }
            })
        })
    },
    editConsumption: function (req, res, next) {
        if (!util.reqShouldContain(['id'])(req)) {
            util.handleResponse(res, null, 'edit consumption: need id');
            return;
        }
        Consumption.findOne({userId: req.jwt.payload.id}, function (err, consumption) {
            consumption.consumptions.forEach((value, index) => {
                if (value._id == req.body.id) {
                    consumption.consumptions.splice(index, 1, req.body.consumption);
                    consumption.save(function (err, data) {
                        util.handleResponse(res, data, err);
                    })
                }
            })
        })
    }
};
