 $(function() {
     document.onkeydown = function(event) {
         var e = event || window.enent || arguments.callee.caller.arguments[0];
         // 回车键
         if (e && e.keyCode == 13) {
             $('#popup-submit').click();
         }
         // esc键
         if (e && e.keyCode == 27) {
             $(".close").click();
             $(".img-close").click();
         }
     }

     // 用户登陆按钮
     $(".login-btn").click(function() {
         // 遮罩弹出
         $(".overlay").css({
             height: $(document).height(), //给遮盖层的div的高宽度赋值
         }).fadeIn(100);
         $(".login").fadeIn(200);
     });

     $(".close").click(function() {
         // 遮罩消失
         $(".login").fadeOut(100);
         $(".overlay").fadeOut(100);
         $('.sp1,.sp2').text("").css({
             right: '0%',
             opacity: '0',
         });
     });


     // 验证格式
     // 用户名验证
     $("input").blur(function() {
         // 用户名验证
         if ($(this).is("#user")) {
             // 验证数字长度
             var n1 = /^\d{9,9}$/;
             var n2 = /^\d{5,5}$/;
             if ($("#user").val() != "") {
                 if (!(n1.test($("#user").val()) || n2.test($("#user").val()))) {
                     $(".sp1").text("用户名错误").css({
                         right: '5%',
                         opacity: '1',
                     });
                     return isVerify = false;
                 } else if (n1 || n2) {
                     $(".sp1").text("").css({
                         right: '0%',
                         opacity: '0',
                     });
                     return isVerify = true;
                 }
             } else {
                 $(".sp1").text("用户名为空").css({
                     right: '5%',
                     opacity: '1',
                 });
                 return isVerify = false;
             }
         }
     });
     $('#user').keydown(function() {
         $(".sp1").text("用户名为空").css({
             right: '0%',
             opacity: '0',
         });
         return isVerify = true;
     });
     // document.getElementById("regform").submit();
     //密码验证
     $('#pwd').blur(function() {
         if ($('#pwd').val() == "") {
             $(".sp2").text("密码为空").css({
                 right: '5%',
                 opacity: '1',
             });
             return isVerify = false;
         }
     });
     $('#pwd').keydown(function() {
         $(".sp2").text("密码为空").css({
             right: '0%',
             opacity: '0',
         });
         return isVerify = true;
     });

     // 登陆按钮
     $('#popup-submit').click(function() {
         if ($("#user").val() == "") {
             $(".sp1").text("用户名为空").css({
                 right: '5%',
                 opacity: '1',
             });
             return isVerify = false;
         } else {
             if ($("#pwd").val() == "") {
                 $(".sp2").text("密码为空").css({
                     right: '5%',
                     opacity: '1',
                 });
                 return isVerify = false;
             }
         }
     });


     // 验证码
     /*var handlerPopup = function (captchaObj) {
        // 成功的回调
        captchaObj.onSuccess(function () {
            var validate = captchaObj.getValidate();
            $.ajax({
                url: "pc-geetest/validate", // 进行二次验证
                type: "post",
                dataType: "json",
                data: {
                    username: $('#user').val(),
                    password: $('#pwd').val(),
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode
                },
                success: function (data) {
                    if (data && (data.status === "success")) {
                        location.href="http://localhost:8080/System/student.html";
                    } else {
                        $(document.body).html('<h1>登录失败</h1>');
                    }
                }
            });
        });
        $("#popup-submit").click(function () {
            if(isVerify){
                captchaObj.show();
            } 
        });
        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo("#popup-captcha");
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
*/ // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
     /* $.ajax({
          url: "pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
          type: "get",
          dataType: "json",
          success: function (data) {
              // 使用initGeetest接口
              // 参数1：配置参数
              // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
              initGeetest({
                  gt: data.gt,
                  challenge: data.challenge,
                  product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                  offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                  // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
              }, handlerPopup);
          }
      });*/
 });
