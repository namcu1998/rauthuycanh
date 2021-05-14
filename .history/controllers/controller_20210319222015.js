// module.exports.gioithieu = function(req, res, next){
//     res.render('home/gioithieu');
// };
const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");
const { getAll } = require("../saveData/modeAndDataAuto/create.mode");
const time = require("../time/time");
const {getDataChart} = require("../saveData/createDataCharts/create.charts");
module.exports.trangtru = function (req, res, next) {
  res.render("home/trangtru", {
    dataTime: time.getTime(),
    data: getAll().statusDevice.Device,
    dataAuto: getAll().autoData,
    dataSensor: getDataEsp().espSensor.statusDevice,
    dataApi: getDataEsp().api,
    data1: getAll().mode,
    dataStatusActiveChild: getAll().autoData.setActiveAutoChild,
    user: req.cookies.user,
    statusEsp1: getAll().statusEsp.espControll,
    statusEsp2: getAll().statusEsp.espSensor,
    statusDHT: getDataEsp().espSensor.statusSensor.statusDHT,
    statusLux: getDataEsp().espSensor.statusSensor.statusLux,
  });
};

// signal: 'ma.getAll()[5].SignalStrength',
// ip: 'ma.getAll()[5].ip',
// statusDHT: 'ma.getAll()[5].statusDHT',
// statusLux: 'ma.getAll()[5].statusLux',
// CPU: 'ma.getAll()[5].CPU',
// RAM: 'ma.getAll()[5].RAM',

module.exports.cambien = function (req, res, next) {
  res.render("home/cambien");
};
module.exports.lichsu = function (req, res, next) {
  res.render("home/lichsu");
};
module.exports.charts = function (req, res, next) {
  res.render("home/charts", {
    data: getAll().statusDevice.Device,
    dataAuto: getAll().autoData,
    data1: getAll().mode,
    dataStatusActiveChild: getAll().autoData.setActiveAutoChild,
    user: req.cookies.user,
    statusEsp1: getAll().statusEsp.espControll,
    statusEsp2: getAll().statusEsp.espSensor,
    statusDHT: getDataEsp().espSensor.statusSensor.statusDHT,
    statusLux: getDataEsp().espSensor.statusSensor.statusLux,
  });
};
module.exports.login = function (req, res, next) {
  res.render("home/login");
};
module.exports.tracuu = function (req, res, next) {
  res.render("home/tracuu", {
    data: getAll().statusDevice.Device,
    dataAuto: getAll().autoData,
    data1: getAll().mode,
    dataStatusActiveChild: getAll().autoData.setActiveAutoChild,
    user: req.cookies.user,
    statusEsp1: getAll().statusEsp.espControll,
    statusEsp2: getAll().statusEsp.espSensor,
    statusDHT: getDataEsp().espSensor.statusSensor.statusDHT,
    statusLux: getDataEsp().espSensor.statusSensor.statusLux,
  });
};
