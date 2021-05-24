const time = require("../time/time");
const { getDataAll } = require("../data/espData/saveDataEsp");
const { getAll } = require("../data/clientData/clientData");

let espConnectStatus = [
  getDataAll().espData.espSensorData.espConnectStatus,
  getDataAll().espData.espControllData.espConnectStatus,
];

let espInformation = [
  getDataAll().espData.espSensorData.espInformation,
  getDataAll().espData.espControllData.espInformation,
];

module.exports.trangtru = function (req, res, next) {
  console.log(espConnectStatus);
  res.render("home/trangtru", {
    dataTime: time.getTime(),
    data: getAll().statusDevice,
    dataAuto: getAll().autoData,
    dataApi: getDataAll().api,
    dataStatusActiveChild: getAll().autoData.setActiveAutoChild,
    user: req.cookies.user,
    sensorData: getDataAll().espData.espSensorData.sensorData,
    espSensorConnectStatus: espConnectStatus,
    sensorStatus: getDataAll().espData.espSensorData.sensorStatus,
    espInformation: espInformation,
  });
};

module.exports.widget = function (req, res, next) {
  res.render("home/widget", {
    dataTime: time.getTime(),
    data: getAll().statusDevice,
    dataAuto: getAll().autoData,
    dataApi: getDataAll().api,
    dataStatusActiveChild: getAll().autoData.setActiveAutoChild,
    user: req.cookies.user,
    sensorData: getDataAll().espData.espSensorData.sensorData,
    espSensorConnectStatus: espConnectStatus,
    sensorStatus: getDataAll().espData.espSensorData.sensorStatus,
    espInformation: espInformation,
  });
};

module.exports.cambien = function (req, res, next) {
  res.render("home/cambien");
};

module.exports.lichsu = function (req, res, next) {
  res.render("home/lichsu");
};

module.exports.charts = function (req, res, next) {
  res.render("home/charts");
};

module.exports.login = function (req, res, next) {
  res.render("home/login");
};

module.exports.tracuu = function (req, res, next) {
  res.render("home/tracuu");
};
