module.exports.gioithieu = function(req, res, next){
    res.render('gioithieu');
};
module.exports.trangtru = function(req, res, next){
    res.render('trangtru', {
        nam: 10,
    });
};
module.exports.cambien = function(req, res, next){
    res.render('cambien');
};
module.exports.lichsu = function(req, res, next){
    res.render('lichsu');
};
module.exports.charts = function(req, res, next){
    res.render('charts');
};