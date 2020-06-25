const ma = require("../modeAndDataAuto/create.mode")
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
module.exports.login = function(req, res, next){
    res.render('login');
};
module.exports.postLogin = function(req, res, next){
    if(req.body.email == ma.getAll()[4].email){
    }
    else{
        res.render("login", {
            error: "sai tai khoan",
            value: req.body.email
        })
        return;
    }
    if(req.body.password == ma.getAll()[4].password){
    }
    else{
        res.render("login", {
            error: "sai mat khau",
            value: req.body.password
        })
        return;
    }
    res.cookie("login", req.body.email)
    res.redirect('/');
};