/**
 * Created by Zihang Zhang on 2017/4/17.
 */
// 阻止输出log
wangEditor.config.printLog = false;
// wangEditor创建
var editor = new wangEditor('editor');
// 关闭菜单栏fixed
editor.config.menuFixed = false;
// 设置自定义上传的开关
editor.config.customUpload = true;
// 配置菜单UIW
editor.config.menus = [
    'source',
    'bold',
    'underline',
    'italic',
    'strikethrough',
    'eraser',
    'forecolor',
    'bgcolor',
    '|',
    'quote',
    'fontfamily',
    'fontsize',
    'head',
    'orderlist',
    'alignleft',
    'aligncenter',
    'alignright',
    'link',
    'table',
    'emotion',
    'img',
    'video',
    'location',
    'insertcode',
    'undo',
    'fullscreen'
];
editor.create();
// 点击label使editor聚焦
$('#editor-wrapper label').click(function() {
    editor.$txt.focus();
});

// Ajax提交数据
$('#submit').click(function(){

    $(this).attr('disabled','disabled');
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/blog/publish",
        data: {
            "user_id": localStorage.user_id,
            "title": $("#title").val(),
            "label": $("#tags").val(),
            "author": $("#author").val(),
            "content": $("#editor").val()
        },
            // $('form').serializeArray(),
        dataType: "json",
        success: function (data) {
            if (data.state === 200 && data.msg === "发布成功") {
                var arg = '发布成功！点击确定返回项目展示页';
                myAlert(arg);
                $('#confirm_btn').on('click', function() {
                    window.location.href = "../project_show.html";
                });
            } else {
                arg = "没有发布成功哦~请重新尝试";
                $('.submit').removeAttr('disabled');
                myAlert(arg);
                pubErrHandle();
            }
        },
        error: function (data) {
            arg = "没有发布成功哦~请重新尝试";
            $('.submit').removeAttr('disabled');
            myAlert(arg);
            pubErrHandle();
        }
    });
});

function pubErrHandle() {
    var confirm_btn = $('#confirm_btn');
    confirm_btn.on('click', function() {
        $('#myAlert').remove();
        $('#mask').remove();
    })
}

// 定制自己的alert
function myAlert(arg) {
    var conf = {}, $box, $mask;
    $box = $('<div id="myAlert">'+'<div class="title" >' + arg + '</div>'
        + '<div><button class="submit" id="confirm_btn">确定</button></div>'
        + '</div>').css({
        color: '#444',
        position: 'fixed',
        width: 400,
        height: 200,
        background: '#fff',
        'z-index': 10000,
        'border-radius': 7,
        'box-shadow': '0 1px 2px rgba(0,0,0,.5)'
    });
    $title = $box.find('.title').css({
        padding: '45px 10px 10px',
        'font-weight': 900,
        'font-size': 21,
        'text-align': 'center'
    })
    $mask = $('<div id="mask"></div>').css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,.3)',
        'z-index': 9999,
    });
    $box.find('.submit').css({
        'font-size': 22,
    });
    function adjust_box_pos() {
        var $window = $(window),
            window_width = $window.width(),
            window_height = $window.height(),
            box_width = $box.width(),
            box_height = $box.height(),
            move_x = (window_width - box_width) / 2;
        move_y = (window_height - box_height) / 2 - 80;
        $box.css({
            left: move_x,
            top: move_y,
        })
    }
    adjust_box_pos();
    $(window).on('resize',function() {
        adjust_box_pos();
    })
    if (typeof arg === 'string') {
        conf = arg;
    } else {
        conf = $.extend(conf, arg);
    }
    $('body').append($mask).append($box);
}