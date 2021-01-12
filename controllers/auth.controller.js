// const { getAll } = require("../modeAndDataAuto/create.mode")
module.exports.SetCookie = function(req, res, next){
    // if(!req.cookies) res.render('auth/login');
    // if(req.cookies.login === 'ASDDDASASD'){
    // }
    // else {
    //     res.render('auth/login');
    //     return;
    // }
    next();
}
module.exports.logout = function(req, res, next){
	res.clearCookie('user');
	res.clearCookie('login');
	res.render('auth/login');
}
module.exports.login = function(req, res, next){
    res.render('auth/login')
}

module.exports.postLogin = function(req, res, next){
    // let scopeLogin = 0;
    // getAll().account.map(item => {
    //     if(item.email == req.body.email && item.password == req.body.password) {
    //       scopeLogin = 1;
    //     }
    //   })
    //   if(scopeLogin == 1){
    //   }
    //   else {
    //     res.render("auth/login");
    //             return;
    //   }
    // res.cookie('login', "ASDDDASASD")
    // res.cookie('user', req.body.email)
    // res.redirect('/home/');
    next();
};