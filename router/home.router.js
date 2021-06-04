var express = require("express");
var router = express.Router();
var controller = require("../controllers/controller");

const { dulieuDb } = require("../database/firebase");
let arrayData = [];
let webapp;

function getSocket(item) {
  webapp = item;
}

router.get("/", controller.trangtru);

router.get("/cambien", controller.cambien);

router.get("/lichsu", controller.lichsu);

router.get("/charts", controller.charts);

router.get("/tracuu", controller.tracuu);

router.get("/widget", controller.widget);

router.get("/data", controller.data);

router.post("/add", function (req, res, next) {
  addDevice(req.body.name);
  res.redirect("/home/");
});

router.post("/del", function (req, res, next) {
  remoteDevice(parseInt(req.body.id));
  res.redirect("/home/");
});

// dulieuDb.on("value", (item) => {
//   arrayData = [];

//   for (let data in item.val()) {
//     arrayData.push(item.val()[data]);
//   }

//   console.log(arrayData);
// });

router.get("/getData", function (req, res, next) {
  console.log(req.query.Time);
  let array = [];
  arrayData.map((item) => {
    if (
      req.query.Time === item[5].split(" ")[2].split("-").reverse().join("-")
    ) {
      array.push(item);
    }
  });
  res.json(array);
});

router.post("/getDataPost", function (req, res) {
  console.log(req.body);
  webapp.emit("DataTempPhone", req.body);
});

module.exports = {
  router,
  getSocket,
};
