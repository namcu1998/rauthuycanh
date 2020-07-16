// module.exports.gioithieu = function(req, res, next){
//     res.render('home/gioithieu');
// };
const ma = require('../modeAndDataAuto/create.mode')
module.exports.trangtru = function(req, res, next){
    res.render('home/trangtru', {
        data: ma.getAll()[2],
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