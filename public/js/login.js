/**
 * Created by Zihang Zhang on 2017/4/4.
 */

$(function () {
    var thisURL = document.URL;

    if(getValue = thisURL.split('?')[1]) {
        var username = getValue.split("=")[1];
        document.getElementById("username").value = username;
        $("#password").focus();
    }
    else {
        $("#username").focus();
    }

    $("#username").keydown(function (e) {
        if(e.which == "13") {
            $("#password").focus();
        }
    });
    $("#password").keydown(function (e) {
        if(e.which == "13") {
            $("#submit").trigger("click");
        }
    });

    function checkInput() {
        if($("#username").val() == null || $("#username").val() == ""){
            $("#error").show().html("请输入用户名");
            $("#username").focus();
            return false;
        }
        if($("#password").val() == null || $("#password").val() == ""){
            $("#error").show().html("请输入密码");
            $("#password").focus();
            return false;
        }
        return true;
    }

    $("#submit").click(function () {
        if(checkInput()) {
            var strUsername = encodeURI($("#username").val());
            var strPassword = encodeURI($("#password").val());

            $.ajax({
                //请求登录处理页
                type: "post",
                url: "http://localhost:3000/users/login", //登录处理页
                dataType: "json",
                //传送请求数据
                data: { username: strUsername, password: strPassword },
                success: function (data) {
                    if(data.state === 200 && data.msg === "登录成功") {
                        alert("登录成功！");
                        window.localStorage.username = data.username;
                        window.localStorage.user_id = data.user_id;
                        console.log(localStorage.username);
                        window.location.href = "../index.html";
                    }
                    else {
                        $("#error").show().html("用户名或密码错误");
                    }
                }

                //     function (strValue) { //登录成功后返回的数据
                //     //根据返回值进行状态显示
                //     if (strValue == "True") {
                //         $(".main-login").html("操作提示，登录成功！" + strValue);
                //     }
                //     else {
                //         $("#error").show().html("用户名或密码错误！" + strValue);
                //     }
                // }
            });
        }else{
            return false;
        }

    });
});







// $(function(){
//     $(".loginform_submit").click(function(){
//         if(checkInput()) {
//             $("form").action("/loginServlet");
//         }else{
//             return false;
//         }
//     });
//     $(".validationCode_img").click(function(){
//         $(".validationCode_img").attr("src","/UserLogin/Sample1/validationCode?"+Math.random());
//     });
//     function checkInput(){
//         //判断用户名
//         if($("input[name=username]").val() == null || $("input[name=username]").val() == ""){
//             alert("用户名不能为空");
//             $("input[name=username]").focus();
//             return false;
//         }
//         //判断密码
//         if($("input[name=password]").val() == null || $("input[name=password]").val() == ""){
//             alert("密码不能为空");
//             $("input[name=password]").focus();
//             return false;
//         }
//         //判断验证码
//         if($("input[name=validationCode]").val() == null || $("input[name=validationCode]").val() == ""){
//             alert("验证码不能为空");
//             $("input[name=validationCode]").focus();
//             return false;
//         }
//         return true;
//     }
// });

