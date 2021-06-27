const router = require('express').Router();
const controller = require('../controllers/tips.controller')

router.get('/tips/all', controller.fetchAllTips)

router.post('/score/update', controller.updateScore)

router.post('/result/update', controller.updateResult);

module.exports = router;