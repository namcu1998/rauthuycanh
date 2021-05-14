var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
const { checkData } = require("../saveDataBase/save");
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

dulieuDb.on("value", item => {
  let number = [];
  for(let data in item.val()) {
    number.push(item.val()[data])
  }
  saveData(number);
  number = [];
})

router.get("/getData", function(req, res, next) {
    console.log(req.query.Time)
    let array = [];
    checkData().map(item => {
        if(req.query.Time === item.thoigian.split(" ")[2].split("-").reverse().join("-")) {
            array.push(item);
        }
    })
    res.json(array);
})



module.exports = router