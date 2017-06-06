/**
 * Created by zwl on 2017/4/11.
 */
var express= require('express');
var router=express.Router();
var Sequlize =require('../models/blog');

const PUBLISH_SUCCESS = {
    state:200,
    msg:'发布成功'
};

function checkLogin(req,res,next) {
    if (req.session.isLogin){
        next();
    }
    else{
        res.json({status:401,msg:'您尚未登录'});
    }

    // req.session.isLogin = true;
    // req.session.user_id = 4;
    // next();

    /*
    isLogin = true,
    userid = 4
     */
}

router.post('/publish', function (req,res,next) {

    var author_id = req.body.user_id,
        title = req.body.title,
        label = req.body.label,
        author = req.body.author,
        content = req.body.content;

    Sequlize.pub(author_id,title,label,author,content,function (err,result) {

            if(result)
            {
                // res.send(JSON.stringify({ status:PUBLISH_SUCCESS }));
                res.json(PUBLISH_SUCCESS);
            }
            else
            {
                res.locals.error = err;
            }
        });


});

module.exports = router;