/**
 * Created by Zihang Zhang on 2017/4/17.
 */

$(document).ready(function () {
    $("#submit").click(function () {
        if(!localStorage.username) {
            if(window.confirm('您尚未登录，是否跳转到登录页面？')){
                window.location.href = "../login.html";
                return true;
            }else{
                return false;
            }
        }
        else {
            window.location.href = "../project_submit.html";
        }
    });

    function selectFromArticles(label) {

        $.ajax({
            type: "post",
            url: "http://localhost:3000/show/show",
            dataType: "json",
            //传送请求数据
            data: {"label": label},
            success: function (data) {

                if(data.length === 0) {
                    $("#empty").show();
                }
                else {
                    $("#empty").hide();
                    $.each(data, function (i, val) {
                        $(".detailed-list-wrapper").prepend(addArticleElement(i, val.Title));
                        $("#articleIndex" + i).click(function () {
                            window.location.href = "../project_detailed.html?index=" + i;
                        });
                    });
                    window.localStorage.articleData = JSON.stringify(data);
                }
            }
        });

        function addArticleElement(i, title) {
            var html1 = '<div class="detailed-unit" id="articleIndex' + i +
                    '">' +
                    '<div class="detailed-unit-splash">' +
                    '</div>' +
                    '<p class="detailed-unit-title t1">' + title +
                    '</p></div>';

            return html1;
        }
    }

    function clearCurrentList() {
        $(".detailed-list-wrapper").html("");
    }

    selectFromArticles("all");

    $("#case0").click(function () {
        clearCurrentList();
        selectFromArticles("all");
    });
    $("#case1").click(function () {
        clearCurrentList();
        selectFromArticles("综合");
    });
    $("#case2").click(function () {
        clearCurrentList();
        selectFromArticles("Linux");
    });
    $("#case3").click(function () {
        clearCurrentList();
        selectFromArticles("前端");
    });
    $("#case4").click(function () {
        clearCurrentList();
        selectFromArticles("后端");
    });
    $("#case5").click(function () {
        clearCurrentList();
        selectFromArticles("iOS");
    });
    $("#case6").click(function () {
        clearCurrentList();
        selectFromArticles("算法");
    });
    $("#case7").click(function () {
        clearCurrentList();
        selectFromArticles("杂谈");
    });

});
