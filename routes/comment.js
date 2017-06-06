/**
 * Created by Zihang Zhang on 2017/4/18.
 */
var express= require('express');
var router=express.Router();
var Sequlize =require('../models/comment');
var select =require('../models/user');

const PUBLISH_SUCCESS = {
    state:200,
    msg:'评论成功'
};

function checkLogin(req,res,next) {
    // if (req.session.isLogin){
    //     next();
    // }
    // else{
    //     res.json({status:401,msg:'你尚未登录'});
    // }
    req.session.isLogin =1 ;
    next();
}

router.post('/save_comment', function (req,res,next) {

    var user_id = req.body.User_Id,
        article_id = req.body.Article_Id,
        content = req.body.Content;

    Sequlize.save_comment(user_id,article_id,content,function (err,result) {


        if(result)
        {
            res.json(PUBLISH_SUCCESS);
        }
        else
        {
            res.locals.error = err;
        }
    });

});

router.post('/get_comment',checkLogin,function (req,res,next) {

    var article_id = req.body.Article_Id;

    Sequlize.get_comment(article_id,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

module.exports = router;