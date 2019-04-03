var express = require('express');
var router = express.Router();
var consumption = require('../controllers/consumption');

router.get('/consumptions', consumption.getConsumptions);
router.post('/consumption', consumption.addConsumption);
router.get('/weather', consumption.getWeather);
router.delete('/consumption', consumption.deleteConsumption);
router.put('/consumption', consumption.editConsumption);

module.exports = router;
