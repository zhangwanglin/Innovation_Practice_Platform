/**
 * Created by zwl on 2017/4/17.
 */
var express= require('express');
var router=express.Router();
var Sequlize =require('../models/blog');

router.post('/show',function (req,res,next) {
    var kind =req.body.label;
    Sequlize.getContent(kind,function (err, result) {
        if(err) return next(err);
        res.json(result);
    });
});

module.exports = router;