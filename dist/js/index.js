$(function() {
    // ader的背景图的高度
    // var h =$(".p-background img").height();
    // $("p-header").height(h);
    //轮播图参数，外框宽度初始化
    var bannerwidth = $('#banner').width();
    var liSize = 0.3;
    var liMarginR = 0.05;
    var toLiSize = liSize + liMarginR;
    var winWidth = window.screen.width;
    if (winWidth > 500 && winWidth <= 900) {
        liSize = 0.48;
        liMarginR = 0.04;
    } else if (winWidth <= 500) {
        liSize = 0.99;
        liMarginR = 0.01;
    }
    toLiSize = liSize + liMarginR;
    // console.log(winWidth);
    // 改变窗口尺寸时再获得header背景图的高度
    $(window).resize(function() {
        // 获取窗口宽度
        winWidth = window.screen.width;
        liSize = 0.3;
        liMarginR = 0.05;
        if (winWidth > 500 && winWidth <= 900) {
            liSize = 0.48;
            liMarginR = 0.04;
        } else if (winWidth <= 500) {
            liSize = 0.99;
            liMarginR = 0.01;
        }
        toLiSize = liSize + liMarginR;
        // console.log(toLiSize);
        // 改变bannerwidth的宽度，使其自适应
        bannerwidth = $('#banner').width();
        //设置每个li的宽度设置，自适应 
        $('#banner ul li').css({
            width: bannerwidth * liSize + 'px',
            marginRight: bannerwidth * liMarginR + 'px'
        });
    });


    // 轮播图设置
    ;
    (function() {
        //外边框的宽度
        // var bannerwidth=$('#banner').width();
        //设置每个li的宽度设置，自适应 
        $('#banner ul li').css({
            width: bannerwidth * liSize + 'px',
            marginRight: bannerwidth * liMarginR + 'px'
        });
        // 左右箭头点击
        function goRight() {
            $("#banner ul").animate({ marginLeft: '-' + bannerwidth * toLiSize + "px" }, 1000, function() {
                $("#banner ul>li").eq(0).appendTo($("#banner ul"));
                $("#banner ul").css('marginLeft', '0px');
            });
        }
        $('.arrow-right').click(function() {
            goRight();
        })

        $('.arrow-left').click(function() {
            $("#banner ul").css('marginLeft', '-' + bannerwidth * toLiSize + "px");
            $("#banner ul>li").eq(5).prependTo($("#banner ul"));
            $("#banner ul").animate({ marginLeft: "0px" }, 1000);
        });
        // 左右箭头出现
        $('#banner').hover(function() {
            $('.arrow').fadeIn(300);
        }, function() {
            $('.arrow').fadeOut(300);
        });
        var settime = setInterval(goRight, 3000);
        $('#banner').mouseover(function() {
            clearInterval(settime);
        })
        $('#banner').mouseout(function() {
            settime = setInterval(goRight, 3000);
        });

    })();



    //导航栏跟着滚动显示变化
    var windowHeight = $(window).height();
    $(window).scroll(function() {
        // 滚动条滚动距离
        var ws = $(window).scrollTop()
        if (ws < 50) {
            $('.header .nav').css({
                position: 'static',
                backgroundColor: 'transparent',
                opacity: '1',
            }).find('a').css({ color: '#000' }).hover(function() {
                $(this).css({ color: '#33a3dc' })
            }, function() {
                $(this).css({ color: '#000' });
            });
        }
        if (ws > 50) {
            $('.header .nav').css({
                backgroundColor: '#33a3dc',
                position: 'fixed',
                opacity: '0.9',
            }).find('a').css({ color: '#fff' }).hover(function() {
                $(this).css({ color: '#fdb933' })
            }, function() {
                $(this).css({ color: '#fff' });
            });
        }
    });
    // 网页禁止托拽
    document.ondragstart = function() {
        return false;
    };

    $(".nav-list").click(function() {
        $('.min-nav').fadeToggle(100);
    });


    // 轮播图swiper设置
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical',
        // 循环
        loop: true,
        // 懒加载
        lazyLoading: true,
        // 如果需要分页器
        // pagination: '.swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // 一组的张数
        slidesPerGroup: 1,
        // 一次显示的张数
        slidesPerView: 3,
        // 每一张的间隔
        spaceBetween: 20,
        // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar'
    })

});
