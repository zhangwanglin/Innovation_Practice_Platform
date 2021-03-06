/**
 * Created by ywj15 on 2016/10/20 0020.
 */
var express= require('express');
var router=express.Router();
var crypto = require('crypto');//数据加密
var Sequlize =require('../models/user');
var session = require('express-session');

const LOGIN_SUCCESS = {
  state:200,
  msg:'登录成功'
};
const LOGIN_FAIL = {
  state:400,
  msg:'登录失败'
};

const REG_SUCCESS = {
    state:200,
    msg:'注册成功'
};
const REG_FAIL = {
    state:400,
    msg:'注册失败'
};
const RE_SUCCESS = {
    state:200,
    msg:'完善成功'
};


function checkLogin(req,res,next) {
  if (req.session.isLogin){
    next();
  }
  else{
    res.json({status:401,msg:'您尚未登录'});
  }
}

router.get('/',function (req,res,next) {

    console.log(req.session);
    console.log(req.cookies);

  // if(req.session.islogin){
  //   res.locals.islogin=req.session.islogin;
  // }
  //
  // if(req.cookies.islogin){
  //   req.session.islogin=req.cookies.islogin;
  // }
res.send('user')
  //res.render('login', { title: '用户登录' ,test:res.locals.islogin});
});

router.post('/login',function (req,res,next) {

  var username = req.body.username,
      password = req.body.password,
      md5 = crypto.createHash('md5');


  Sequlize.getUser(username,function (err, result) {
    if(err) return next(err);
    password = md5.update(password).digest('hex');
    console.log(result);
    if(!result)
    {
      // res.locals.error = '用户不存在';
      console.log('用户不存在');
      res.json(LOGIN_FAIL);
      // res.render('login',{title:"登陆",error:'用户不存在'});
      return;
    }
    else if(result.Username!= username || result.Password != password)
    {
      // res.locals.error = '用户名或密码有误';
      console.log('用户名或密码有误');
      res.send(JSON.stringify(LOGIN_FAIL));
      //res.render('login',{title:"登陆"});
      return;
    }
    else{
      console.log(result.Password);
      console.log(password);
      if(result.Password == password){
        console.log('5');
        console.log(req.session);
        req.session.isLogin = result.Id;
        // console.log(req.session.isLogin);
        res.locals.isLogin=req.session.isLogin;
        res.cookie('isLogin',res.locals.isLogin,{maxAge:60000});
        var login_success_data = {
              state:200,
              msg:'登录成功',
              username: result.Username,
              user_id: result.Id,
              name: result.Name,
              sex: result.Sex,
              school_num: result.School_Num
        };
        res.json(login_success_data);
        // res.send(JSON.stringify(LOGIN_SUCCESS));
      }else {
        console.log('6');
        res.json(LOGIN_FAIL);
        // res.send(JSON.stringify(LOGIN_FAIL));
      }
    }

  });
});

router.post('/reg',function (req,res,next) {

  var username=req.body.username,
      password=req.body.password,
      md5=crypto.createHash('md5');
  password=md5.update(password).digest('hex');
  console.log(username);
  console.log(password);

  Sequlize.getUserCount(username,function (result){
    if (result != null && result > 0) {
      //err = '用户名已存在';
      res.send(JSON.stringify({ status:REG_FAIL }));
      return;
    }

    Sequlize.insert(username,password,function (err,result) {
      if (err) {
        res.locals.error = err;
        res.json(REG_FAIL);
        // res.send(JSON.stringify({ status:REG_FAIL }));
        return;
      }

      if(result)
      {
          var reg_success_data = {
              state:200,
              msg:'注册成功',
              username: result.Username
          };
          res.json(reg_success_data);
        // res.send(JSON.stringify({ status:REG_SUCCESS }));
      }
      else
      {
          res.json(REG_FAIL);
        // res.locals.error = err;
      }
    });
  });

});

router.get('/logout', checkLogin, function (req,res,next) {
    req.session.destroy();
    res.status(200).end();
});

router.post('/save_information',function (req,res,next) {

    var user_id = req.body.id,
        name = req.body.name,
        sex = req.body.sex,
        school_num = req.body.school_num;

    Sequlize.saveUser_information(user_id,name,sex,school_num,function (err,result) {


        if(result)
        {
            res.json(RE_SUCCESS);
        }
        else
        {
            res.locals.error = err;
        }
    });

});

router.post('/get_information',function (req,res,next) {
    var id =req.body.Id;
    Sequlize.getUser_information(id,function (err, result) {
        if(err) return next(err);
        res.json(result);
    });
});

module.exports = router;