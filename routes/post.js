const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


try{
    fs.readdirSync('uploads'); //uploads 폴더가 있는지 확인
}catch(error){
    console.error('uploads 폴더가 존재하지 않습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); //폴더 생성
}

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

/* 폴더에 이미지 업로드 */
router.post('/img', isLoggedIn, upload.single('img'), async (req, res)=>{
    console.log(req.file);
    res.json({ 
        url: `/img/${req.file.filename}`,
        filename: req.file.filename,
        originalname: req.file.originalname,
        fileExt: req.file.mimetype
    });
});

/* 업로드한 이미지를 db에 저장(실제 이미지 파일 저장이 아닌 이미지 정보만) */
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
    try{
        console.log(req.body);
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            filename: req.body.filename,
            originalname: req.body.originalname,
            fileExt: req.body.fileExt,
            UserId: req.user.id
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
    }
});

/* 게시물 삭제 */
router.get('/:id', async (req, res, next)=>{ //왜 delete가 아니라 get으로 했을 때 삭제가 되는거지...?
    // try{
        const post = await Post.findOne({
            where: {id: req.params.id}
        })
        console.dir(post);
        console.log(req.params.id); //왜 가장 최신 게시물의 id만 뜨는거야
        console.log(fs.existsSync(`../uploads/${req.body.filename}`));
        // if(fs.readdirSync('uploads')){
            // if(fs.existsSync(`/uploads/${req.body.filename}`)){
            //     try{
            //         fs.unlinkSync(`/uploads/${req.body.filename}`);
            //         console.log(`${req.body.filename}을 삭제했습니다.`);
            //     }catch(err){
            //         console.log(err);
            //     }
            // }
        // }
        // const result = await Post.destroy({
        //     where:{id: req.params.id}
        // });
        // res.redirect('/');
    // }catch(err){
    //     console.error(err);
    //     next(err);
    // }
});


module.exports = router;