// module.exports.gioithieu = function(req, res, next){
//     res.render('home/gioithieu');
// };
module.exports.trangtru = function(req, res, next){
    res.render('home/trangtru', {
        nam: 10,
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