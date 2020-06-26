const ma = require("../modeAndDataAuto/create.mode")
module.exports.SetCookie = function(req, res, next){
    if(!req.cookies) res.render('auth/login');
    if(req.cookies.login === 'ASDDDASASD'){
    }
    else {
        res.render('auth/login');
        return;
    }
    next();
}

module.exports.login = function(req, res, next){
    res.render('auth/login')
}

module.exports.postLogin = function(req, res, next){
    if(req.body.email == ma.getAll()[4].email){
    }
    else{
        res.render("auth/login", {
            error: "sai tai khoan",
            value: req.body.email
        });
        return;
    }
    if(req.body.password == ma.getAll()[4].password){
    }
    else{
        res.render("auth/login", {
            error: "sai mat khau",
            nam: req.body.password
        });
        return;
    }
    res.cookie('login', "ASDDDASASD")
    res.redirect('/home/');
};