const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user'); //user 테이블 연동

const router = express.Router();

/* 회원가입 */
/*
  1. 같은 이메일이 존재한다면 에럴르 출력하고 회원가입 페이지로 되돌린다.\
  2. 같은 이메일이 존재하지 않는다면 비밀번호를 bcrypt의 hash 메서드를 이용하여 암호화한다.
  3. 비밀번호를 12줄의 숫자로 암호화한다. (12자를 추천함. 31자까지 사용 가능. 숫자가 클수록 해킹이 어려워진다.)
     - promise를 지원하는 함수이므로 await를 사용했음
*/
router.post('/join', isNotLoggedIn, async (req,res,next)=>{
    const { email, nick, password } = req.body; //req.body로 받아온 것들을 email, nick, password에 각각 넣기
    try{
        const exUser = await User.findOne({ where: { email }}); //테이블에서 email 검색
        if(exUser){
            return res.redirect('/join?error=exist'); //같은 email이 있는 경우
        }
        const hash = await bcrypt.hash(password, 12); //비밀번호를 12개 숫자로 암호화
        await User.create({
            email,
            nick,
            password: hash
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});

/* 로그인 */ //비밀번호를 입력하면 그걸 암호화해서 db의 내용과 비교하도록
/*
  passport.authenticate('local') 미들웨어이므로 local 전략(localStrategy)을 수행한다.
  구조는 라우터 미들웨어 안에 들어있는 미들웨어
*/
router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

/* 로그아웃 */
router.get('/logout', isLoggedIn, (req, res)=>{
    // req.logout();
    req.session.destroy(); //session 삭제
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;