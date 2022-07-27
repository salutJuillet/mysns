const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    //serializeUser
    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    //deserializeUser
    passport.deserializeUser((id,done)=>{
        User.findOne({ 
            where : { id },
            include: [{
                model: User,
                attributes: ['id','nick'],
                as: 'Followers'
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings'
            }]
        })
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    local();
    kakao();
}