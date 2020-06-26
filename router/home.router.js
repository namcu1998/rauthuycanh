var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
router.get("/", controller.trangtru);

router.get("/cambien",controller.cambien);

router.get("/lichsu",controller.lichsu);

router.get("/charts",controller.charts);

module.exports = router