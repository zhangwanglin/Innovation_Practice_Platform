/**
 * Created by Zihang Zhang on 2017/4/13.
 */

$(document).ready(function () {

    if(!localStorage.username) {
        $("#userCenter").hide();
    }
    else {
        $("#btnLogin").hide();
        $("#userCenter button a").text(localStorage.username);
        $("#userCenter").show();
    }

    $("#userCenter").click(function () {
        if(window.confirm('你确定要退出登录吗？')){
            delete localStorage.username;
            $.get("http://localhost:3000/users/logout");
            $("#userCenter").hide();
            $("#btnLogin").show();
            alert("已注销！");
            window.location.href = "../project_show.html"
            return true;
        }else{
            return false;
        }
    });
});