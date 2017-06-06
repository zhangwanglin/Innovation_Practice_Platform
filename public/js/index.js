/**
 * Created by Zihang Zhang on 2017/4/4.
 */
$(document).ready(function () {

    var curIndex = 0;
    var imgLen = $(".img-list li").length;

    var autoChange = setInterval(function(){
        if(curIndex < imgLen-1){
            curIndex ++;
        }else{
            curIndex = 0;
        }
        changeTo(curIndex);
    },5000);

    $("#index-prev").hover(function(){
        //滑入清除定时器
        clearInterval(autoChange);
    },function(){
        //滑出则重置定时器
        autoChangeAgain();
    });
    //左箭头点击处理
    $("#index-prev").click(function(){
        //根据curIndex进行上一个图片处理
        curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
        changeTo(curIndex);
    });

    $("#index-next").hover(function(){
        //滑入清除定时器
        clearInterval(autoChange);
    },function(){
        //滑出则重置定时器
        autoChangeAgain();
    });
    //右箭头点击处理
    $("#index-next").click(function(){
        curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
        changeTo(curIndex);
    });

    function autoChangeAgain(){
        autoChange = setInterval(function(){
            if(curIndex < imgLen-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            changeTo(curIndex);
        },5000);
    }

    function changeTo(num){
        var goLeft = num * 1150;
        $(".img-list").animate({left: "-" + goLeft + "px"},500);
    }

});
