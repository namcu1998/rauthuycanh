// module.exports.gioithieu = function(req, res, next){
//     res.render('home/gioithieu');
// };
const ma = require('../modeAndDataAuto/create.mode')
module.exports.trangtru = function(req, res, next){
    res.render('home/trangtru', {
        data: ma.getAll()[2],
        data1: ma.getAll()[0],
        user: req.cookies.user,
        statusEsp: ma.getAll()[3],
        signal: ma.getAll()[5].SignalStrength,
        ip: ma.getAll()[5].ip,
    });
};
module.exports.cambien = function(req, res, next){
    res.render('home/cambien');
};
module.exports.lichsu = function(req, res, next){
    res.render('home/lichsu');
};
module.exports.charts = function(req, res, next){
    res.render('home/charts');
};
module.exports.login = function(req, res, next){
    res.render('home/login');
};
module.exports.tracuu = function(req, res, next){
    res.render('home/tracuu');
};