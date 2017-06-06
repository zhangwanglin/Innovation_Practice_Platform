/**
 * Created by Zihang Zhang on 2017/4/18.
 */

$(document).ready(function () {
    var thisURL = document.URL;
    var index = -1;
    var article_ID = -1;

    if(getValue = thisURL.split('?')[1]) {
        index = getValue.split("=")[1];
        var articleData = JSON.parse(localStorage.articleData);
        $("#title").html(articleData[index].Title);
        $("#author").html(articleData[index].Author);
        $("#pubTime").html(articleData[index].createdAt.split('T')[0]);
        $("#article").append(articleData[index].Content);
        article_ID = articleData[index].Id;

        var indexPrev = parseInt(index) + 1;
        var indexNext = parseInt(index) - 1;

        if(articleData[indexPrev]) {
            $("#articlePrev").click(function () {
                window.location.href = "../project_detailed.html?index=" + indexPrev;
            });
        }
        else {
            $("#articlePrev").hide();
        }

        if(articleData[indexNext]) {
            $("#articleNext").click(function () {
                window.location.href = "../project_detailed.html?index=" + indexNext;
            });
        }
        else {
            $("#articleNext").hide();
        }
    }

    selectFromComments(article_ID);

    $("#backToProjectShow").click(function () {
        window.location.href = "../project_show.html";
    });

    $("#commentInput").keydown(function (e) {
        if(e.ctrlKey && e.which == 13 || e.which == 10) {
            $("#commentSubmit").trigger("click");
        }
    });

    $("#commentSubmit").click(function () {
        var strComment = $("#commentInput").val();
        if(strComment !== "") {
            commentSubmit(strComment);
        }
        else {
            $("#commentInput").attr("placeholder", "请输入评论内容");
        }
    });

    function commentSubmit(strComment) {

        if(index === -1) {
            return false;
        }

        if(!localStorage.username) {
            if(window.confirm('您尚未登录，是否跳转到登录页面？')){
                window.location.href = "../login.html";
                return true;
            }else{
                return false;
            }
        }
        else {
            $.ajax({
                //请求登录处理页
                type: "post",
                url: "http://localhost:3000/comment/save_comment",
                dataType: "json",
                //传送请求数据
                data: {
                    "User_Id": localStorage.user_id,
                    "Article_Id": article_ID,
                    "Content": strComment
                },
                success: function (data) {
                    if(data.state === 200 && data.msg === "评论成功") {
                        // alert("评论成功！");
                        $("#commentInput").val("");
                        selectFromComments(article_ID);
                        return true;
                    }
                    else {
                        alert("评论失败！")
                        return false;
                    }
                }
            });
            return true;
            // window.location.href = "../project_submit.html";
        }
    }

    function selectFromComments(id) {

        $("#articleComments").html("");

        $.ajax({
            type: "post",
            url: "http://localhost:3000/comment/get_comment",
            dataType: "json",
            //传送请求数据
            data: {"Article_Id": id},
            success: function (data) {

                if(data.length !== 0) {
                    $.each(data, function (i, val) {
                        $("#articleComments").prepend(addCommentElement(i, getName(val), val.Content));
                        // $("#articleIndex" + i).click(function () {
                        //     window.location.href = "../project_detailed.html?index=" + i;
                        // });
                    });
                    // window.localStorage.articleData = JSON.stringify(data);
                }
            }
        });

        function addCommentElement(i, name, content) {
            var html1 = '<div class="article-comments-unit" id="articleComment' + i +
                '">' +
                '<h3 class="article-comments-unit-username" id="commentUsername">' + name + '&nbsp;:&nbsp;' +
                '</h3><div class="article-comments-unit-content" id="commentContent">' + content +
                '</div></div>';

            return html1;
        }

        function getName(data) {

            if(data.Name) {
                // alert("name: " + data.Name);
                return data.Name;
            }
            else {
                // alert("username: " + data.Username);
                return data.Username;
            }
        }
    }

});





