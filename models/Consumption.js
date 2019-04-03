const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let consumptionSchema = Schema({
    userId: mongoose.ObjectId,
    consumptions: [{
        name: String,
        detail: String,
        amount: Number,
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now},
    }]
});

let Consumption = mongoose.model('Consumption', consumptionSchema);

module.exports = Consumption;
