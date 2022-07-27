exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()) {
        next();
    }else{
        res.status(403).render('main');
    }
}

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인 한 상태입니다.'); //인코딩 작업
        res.redirect(`/?error=${message}`);
    }
}