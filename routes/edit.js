const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

/* edit.html로 이동 */
router.get('/:id', isLoggedIn, async (req,res)=>{
    let postId = req.params.id;
    console.log('postId: ' + postId);
    try{
        Post.findOne({
            where: {id: postId}
        })
        .then(rs => {
            res.render('edit', {post: rs});
            console.dir(rs);
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

/* 게시물 수정 데이터를 DB에 업데이트 */
//uploads 폴더가 존재하는지 확인
try{
    fs.readdirSync('uploads'); //uploads 폴더가 있는지 확인
}catch(error){
    console.error('uploads 폴더가 존재하지 않습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); //폴더 생성
}

//파일 업로드
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { //파일이 업로드 될 경로 설정
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname); //파일 확장자 추출
            cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext) //확장자를 뗀 basename에 오늘 날짜를 덧붙이고 확장자 표시
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 } //파일 크기 제한 10mb
});

//폴더에 이미지 업로드
router.post('/update/:id/img', isLoggedIn, upload.single('img'), async (req, res)=>{
    console.log(req.file);
    let postId = req.params.id;
    console.log('postId: '+ postId + ' body 내용은');
    console.dir(req.body);
    try{
        const post = await Post.update({
            content: req.body.content,
            img: `/img${req.file.filename}`,
            filename: req.body.filename,
            originalname: req.body.originalname,
            fileExt: req.body.fileExt,
            UserId: req.user.id
        }, {
            where: {id: postId}
        }).then(rs => {
            console.log('DB 수정 완료');
        });
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase()}
                    })
                })
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    };
});

//DB 내용 수정(실제 이미지 파일 저장이 아닌 이미지 정보를 포함해서)
const upload2 = multer();
router.post('/update/:id', isLoggedIn, upload2.none(), async (req, res, next)=>{
    let postId = req.params.id;
    console.log('postId: '+ postId + ' body 내용은');
    console.dir(req.body);
    try{
        if(req.body.filename){
            const post = await Post.update({
                content: req.body.content,
                img: req.body.url,
                filename: req.body.filename,
                originalname: req.body.originalname,
                fileExt: req.body.fileExt,
                UserId: req.user.id
            }, {
                where: {id: postId}
            }).then(rs => {
                console.log('DB 수정 완료');
            });
        }else{
            const post = await Post.update({
                content: req.body.content,
                UserId: req.user.id
            }, {
                where: {id: postId}
            }).then(rs => {
                console.log('DB 수정 완료');
            });
        }
        
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase()}
                    })
                })
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    };
});

module.exports = router;