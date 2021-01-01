// module.exports.gioithieu = function(req, res, next){
//     res.render('home/gioithieu');
// };
const { getAll } = require("../modeAndDataAuto/create.mode");
module.exports.trangtru = function (req, res, next) {
  res.render("home/trangtru", {
    data: getAll().statusDevice.Device,
    dataAuto: getAll().autoData,
    data1: getAll().mode,
    user: req.cookies.user,
    statusEsp1: getAll().statusEsp.espControll,
    statusEsp2: getAll().statusEsp.espSensor,
    signal: "ma.getAll()[5].SignalStrength",
    ip: "ma.getAll()[5].ip",
    statusDHT: "ma.getAll()[5].statusDHT",
    statusLux: "ma.getAll()[5].statusLux",
    CPU: "ma.getAll()[5].CPU",
    RAM: "ma.getAll()[5].RAM",
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
  res.render("home/charts");
};
module.exports.login = function (req, res, next) {
  res.render("home/login");
};
module.exports.tracuu = function (req, res, next) {
  res.render("home/tracuu");
};
