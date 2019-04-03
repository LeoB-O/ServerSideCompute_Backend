const assert = require('chai').assert;
const User = require('../models/User');
const credentials = require('../credentials');
const mongoose = require('mongoose');

suite('User Database test', function () {
    mongoose.connect(credentials.mongo.development.connectionString);

    test('should be able to create user', function (done) {
        User.deleteMany({}, function (err) {
            assert(err === null);
        });
        User.create({
            username: 'admin',
            password: 'admin',
            permission: ['admin']
        }, function (err, user) {
            assert(!err);
            assert(user.username === 'admin');
            User.create({
                username: 'ordinaryUser',
                password: 'sessionkey',
                permission: ['user']
            }, function (err, user) {
                assert(!err);
                done();
            })
        })
    })
})
