const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //오류 기록 모듈
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');


dotenv.config();

/* 모듈 분리 후 연결 */
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const editRouter = require('./routes/edit');

const { sequelize } = require('./models'); //db 연결
const passportConfig = require('./passport'); //로그인 관리

const app = express();
passportConfig(); //passport 설정
app.set('port', process.env.PORT || 4000); //포트 설정

// const methodOverride = require('method-override'); //form에 put과 delete 방식으로 데이터를 전달하기 위한 모듈
// app.use(methodOverride('_method'));

/* 템플릿 엔진 -nunjucks */
app.set('view engine', 'html'); //뷰엔진, 확장자
nunjucks.configure('views', {
    express:app,
    watch:true
});

/* db 연결 */
sequelize.sync({ force:false })
.then(()=>{
    console.log('db 연결 성공');
})
.catch((err)=>{
    console.error(err);
});


/* log 셋팅 */
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); //static 폴더
app.use('/img', express.static(path.join(__dirname, 'uploads')));

/* form post 셋팅 */
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

/* cookie */
app.use(cookieParser(process.env.COOKIE_SECRET));

/* session */
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET, //secret 암호를 env파일에 따로 저장하겠다는 의미(env는 숨김처리되는 파일)
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use(passport.initialize()); //요청객체(req)에 passport를 세팅
app.use(passport.session()); //req.session에 passport 정보를 저장

/* 분리된 라우터 연결 */
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/edit', editRouter);

//404 에러 출력
app.use((req,res,next)=>{
    const error = new Error(`${req.method}[${req.url}] - 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
//500번대 에러(서버 에러) 출력
app.use((err, req, res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '번 포트에서 대기중...');
});