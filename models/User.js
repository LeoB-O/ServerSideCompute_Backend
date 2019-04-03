const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
    username: String,
    password: String,
    permission: [String],
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now},
    userInfo:Object
});

userSchema.methods.validPassword = function(password) {
    return password===this.password;
};

let User = mongoose.model('User', userSchema);

module.exports = User;
