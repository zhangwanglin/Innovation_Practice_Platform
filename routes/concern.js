/**
 * Created by zwl on 2017/6/6.
 */
var express= require('express');
var router=express.Router();
var Sequlize =require('../models/concern');
// var Search =require('../models/user');
var find =require('../models/blog');

const SAVE_SUCCESS = {
    state:200,
    msg:'添加成功'
};
const DEL_SUCCESS = {
    state:200,
    msg:'删除成功'
};


router.post('/save_concern', function (req,res,next) {

    var concerned_id = req.body.author_id,
        concern_id = req.body.concern_id,
        action = req.body.action_type;
    // var concerned_id;
    // let promise = new Promise(function(resolve,rejeact){
    //     Search.getUser(username,function (err,result) {
    //         concerned_id =result.Id;
    //         resolve();
    //     });
    // });
    //promise.then(function(){
    if(action == 1)
        Sequlize.save_concern(concern_id,concerned_id,function (err,result) {
            if(result)
            {
                res.json(SAVE_SUCCESS);
            }
            else
            {
                res.locals.error = err;
            }

        });
    else if(action == 0){
        Sequlize.del_concern(concern_id,concerned_id,function (err,result) {
            if(result)
            {
                res.json(DEL_SUCCESS);
            }
            else
            {
                res.locals.error = err;
            }

        });
    }
    //});
});
router.post('/get_concern',function (req,res,next) {

    var concern_id = req.body.concern_id;
    var author_id=[];
    let promise = new Promise(function(resolve,rejeact){
        Sequlize.get_concern(concern_id,function (err,result) {

            for(var i=0;i<result.length;i++){
                author_id[i]=result[i].Concerned_Id;
                console.log(author_id[i]);
            }
            resolve();
        });
     });


   promise.then(function(){
       // for(var i=0;i<3;i++) {
           find.getContentById(author_id, function (err, result) {
               if (err) return next(err);
               res.send(result)
           })
        // }
    });


});
module.exports = router;