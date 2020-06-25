var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
router.get("/",controller.trangtru);

router.get("/gioithieu",controller.gioithieu);

router.get("/cambien",controller.cambien);

router.get("/lichsu",controller.lichsu);

router.get("/charts",controller.charts);

router.get("/login",controller.login);

router.post("/login",controller.postLogin);

module.exports = router