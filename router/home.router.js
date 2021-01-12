var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
const { addDevice, remoteDevice } = require('../saveData/modeAndDataAuto/create.mode');
router.get("/", controller.trangtru);

router.get("/cambien",controller.cambien);

router.get("/lichsu",controller.lichsu);

router.get("/charts",controller.charts);

router.get("/tracuu",controller.tracuu);

router.post("/add", function(req, res, next) {
    addDevice(req.body.name);
    res.redirect("/home/");
})

router.post("/del", function(req, res, next) {
    remoteDevice(parseInt(req.body.id));
    res.redirect("/home/");
})

module.exports = router