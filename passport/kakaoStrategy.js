const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('kakao profile', profile);
        try{
            //카카오로그인을 했을 때, 기존 회원인지 아닌지 조사
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao'}
            });
            if(exUser){
                done(null, exUser); //값을 받아서 넘겨주면 됨
            }else{
                const newUser = await User.create({ //회원가입(정보 등록)
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider:'kakao'
                });
                done(null, newUser);
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    }));
}