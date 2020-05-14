window.onload = function() {
    var $Img = $('.wrapper .box img');
    var len = $Img.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        $Img.eq(i).css({
            transform: 'rotateY(' + deg * i + 'deg) translateZ(400PX)',
            transition: 'all .5s linear ' + (len - 1 - i) * 0.2 + 's'
        });

    }
}

//水平拖拽 rotateY
//垂直拖拽 rotateX
function bindEvent() {
    var lastX, lastY, nowX, nowY, disX, disY,
        roX = 0,
        roY = 0,
        timer = [];
    var num = 0.2; //旋转系数
    //鼠标位于指定元素上方并按下左键
    $('body').on('mousedown', function(e) {
        //清除所有残留的定时器
        timer.forEach(function(value, index) {
            clearInterval(value);
        });
        lastX = e.clientX; //获取点击位置距离body可视区域的x坐标
        lastY = e.clientY;
        $('body').on({
            //鼠标位于指定元素上方并进行移动
            mousemove: function(e) {
                nowX = e.clientX;
                nowY = e.clientY;

                //坐标差值
                disX = nowX - lastX;
                disY = nowY - lastY;

                //旋转角度
                roX -= disY * num;
                roY += disX * num;

                $('.wrapper .box').css({
                    transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
                lastX = nowX;
                lastY = nowY;
            },
            //鼠标位于指定元素上方并松开左键
            mouseup: function() {
                $('body').off('mousemove');
                //运动缓慢停止效果：旋转角度逐渐减小 -> 坐标差值逐渐减小
                timer.push(setInterval(function() {
                    disX *= 0.98;
                    disY *= 0.98;

                    roX -= disY * num;
                    roY += disX * num;

                    $('.wrapper .box').css({
                        transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                    });
                    //Math.abs()：返回绝对值
                    if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                        clearInterval(timer);
                    }
                }, 20));
            }
        });
        //阻止默认事件
        return false;
    });
}

bindEvent();