'use strict';

$(function () {
    // vue实例
    var stuVue = new Vue({
        el: '#student',
        data: {
            key: 1,
            // 我的项目数据
            myProject: []
        },
        methods: {}
    });

    // 遮罩层+loading动画
    function waitingShow() {
        // 文字显示隐藏
        $(".ctrl-overlay .loading").html(' ');
        // 遮罩层出现
        $(".ctrl-overlay").css({
            //给遮盖层的div的高宽度赋值
            height: $(document).height()
        }).fadeIn(100);
        // 出现等待动画
        $('.circle-box2 .sk-circle').fadeIn();
    }

    //遮罩层+成功信息
    function successStu() {
        $(".ctrl-overlay").fadeOut(function () {
            $('.load-success').fadeIn(100);
            // 上传成功延迟一会消失
            setTimeout(function () {
                $('.load-success').fadeOut(100);
            }, 1000);
        });
        // 隐藏等待动画
        $('.circle-box2 .sk-circle').fadeOut();
    }

    // 遮罩层+失败信息
    function errorStu() {
        $(".ctrl-overlay").fadeOut(function () {
            $('.load-false').fadeIn(100);
            // 上传信息延迟一会消失
            setTimeout(function () {
                $('.load-false').fadeOut(100);
            }, 1000);
        });
        $('.circle-box2 .sk-circle').fadeOut();
    }

    // 项目申请确定
    $('.project-sure').click(function () {
        var formData = new FormData($("#projectIssue")[0]);
        $.ajax({
            // url: 'http://localhost:8080/System/StudentServlet?method=declaredProject',
            url: '../assets/student.json',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: waitingShow,
            success: successStu(),
            error: errorStu()
        });
    });

    // 我的项目加载
    $('#btn-project').click(function () {
        $.ajax({
            // url: 'http://localhost:8080/System/StudentServlet?method=myProject',
            url: '../assets/student.json',
            type: 'GET',
            dataType: 'json',
            // data: {param1: 'value1'},
            // beforeSend: waitingShow,
            success: function success(data) {
                // console.log(data);
                // 对vue数据赋值
                stuVue.$data.myProject = data;
            },
            error: function error() {
                console.log('error');
            }
        });
    });

    // 个人信息按钮
    /* $('#btn-person').click(function() {
      $.ajax({
         url: 'http://localhost:8080/System/StudentServlet?method=getStudentInformation',
         type: 'POST',
         dataType: 'json',
         // data: {param1: 'value1'},
         beforeSend: waitingShow,
         success: function(data) {
             $.each(data, function(magIndex, mag) {
                 $("input[name=name]").val(mag['name']);
                 $("input[name=num]").val(mag['num']);
                 $("input[name=department]").val(mag['department']);
                 $("input[name=major]").val(mag['major']);
                 $("input[name=phone]").val(mag['phone']);
                 $("input[name=email]").val(mag['email']);
             });
             $(".ctrl-overlay").fadeOut(100);
         }
     })
    });
    */

    // 项目申报按钮
    $('#btn-declare').click(function () {
        $.ajax({
            url: 'http://localhost:8080/System/StudentServlet?method=getMyProject',
            type: 'POST',
            dataType: 'json',
            // beforeSend:waitingShow,
            success: function success(data) {
                $.each(data, function (magIndex, mag) {
                    $("input[name=projectName]").val(mag['projectName']);
                    $("input[name=tutor]").val(mag['tutor']);
                    $("input[name=projectMember]").val(mag['projectMember']);
                    $("input[name=department]").val(mag['department']);
                    $("input[name=startDate]").val(mag['startDate']);
                    $("input[name=endDate]").val(mag['endDate']);
                    $("input[name=projectType]").val(mag['projectType']);
                    if (mag['projectType'] == '理工') {
                        $('input[name=projectType]').eq(0).prop("checked", true);
                    }
                    if (mag['projectType'] == '经管') {
                        $('input[name=projectType]').eq(1).prop("checked", true);
                    }
                });
                $(".ctrl-overlay").fadeOut(100);
            }
        });
    });

    // 加载个人信息
    /*   function loadPersonMag() {
       $.ajax({
           url: 'mymag.json',
           type: 'POST',
           dataType: 'json',
           // data: {param1: 'value1'},
           beforeSend: waitingShow,
           success: function(data) {
               $.each(data, function(magIndex, mag) {
                   $("input[name=name]").val(mag['name']);
                   $("input[name=num]").val(mag['num']);
                   $("input[name=department]").val(mag['department']);
                   $("input[name=major]").val(mag['major']);
                   $("input[name=phone]").val(mag['phone']);
                   $("input[name=email]").val(mag['email']);
               });
               $(".ctrl-overlay").fadeOut(100);
           },
        })
    }
    */

    // 12.8出现欢迎语
    $('.welcome').animate({ top: '0' });

    function welcomeMag() {
        $.ajax({
            // url:'localhost:8080/StudentServlet?method=getInf',
            url: 'http://localhost:8080/System/StudentServlet?method=getInf',
            dataType: 'json',
            type: 'post',
            success: function success(data) {
                $.each(data, function (ide, mag) {
                    magHtml = "<span>欢迎你:&nbsp&nbsp" + mag['num'] + "</span><span>" + mag['name'] + "</span>";
                    $('#welcomMag').html(magHtml);
                });
            }
        });
    }

    // 进入页面请求
    welcomeMag();
    // 文件上传
    function uploadFiles(Id, Url) {
        var formData = new FormData();
        $.each($('#' + Id)[0].files, function (i, file) {
            formData.append('upload_file' + i, file);
        });
        // ajax提交文件到后台
        $.ajax({
            // url: 'http://localhost:8080/System/ManagerServlet?method='+checkboxNum,
            // url: 'submit_form_process.php',
            url: Url,
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false
            // beforeSend:waiting,
            // success:uploadSuccess,
            // error:uploadError,
        });
    }
    $(".middle-btn").click(function () {
        uploadFiles('fileUpload1', 'submit_form_process.php');
    });

    // 上传中期文件功能
    $('#fileUpload1').change(function () {
        // uploadFilePath=$('#fileUpload1').val();
        $('.middle-btn').css({ backgroundColor: '#65c294', cursor: 'pointer' });
        // if(uploadFilePath.length==0){return false}
        $('.middle-btn').click(function () {
            var formData = new FormData();
            $.each($('#fileUpload1')[0].files, function (i, file) {
                formData.append('upload_img' + i, file);
            });
            // ajax提交文件到后台
            $.ajax({
                // url: 'http://localhost:8080/System/ManagerServlet?method='+checkboxNum,
                url: 'http://localhost:8080/System/StudentServlet?method=interimReport',
                type: 'POST',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: waitingShow,
                success: function success() {
                    successStu();
                    uploadFilePath = 0;
                    $('.middle-btn').css({ backgroundColor: '#464547', cursor: 'not-allowed' });
                },
                error: function error() {
                    alert('error');
                }
            });
        });
    });

    // 个人信息拉取
    // $('#btn-person').click();
    // 12-10
    //    $('#projectTable').change(function(){
    //      // alert('ok');
    //      $('.up-project span').css('backgroundColor',"#45b97c").text('待上传');
    //    });
});