$(function () {
    // function changeList(btnId, changId) {
    //     $(btnId).click(function () {
    //         var mypos = $(this).find('dd').text();
    //         $('.ctrl-pos a:eq(2)').text(mypos)
    //         $('.person-mag').css({
    //             display: 'none'
    //         });
    //         $(changId).fadeIn(50);
    //     });
    // }
    // changeList('#btn-teacher', '.personMag');
    // changeList('#btn-stuproject', '.stu-project');


    //vue 实例
    var teacher = new Vue({
        el: "#teacher",
        data: {
            //撤销项目名
            recallProjectName: null,
            //默认隐藏撤项弹框
            hiddenDailog: true,
            studentProject: []
        },
        methods: {
            //撤项函数
            recallProject: function (item) {
                this.recallProjectName = item.project;
                this.hiddenDailog = false;
                // 遮罩层
                showOverlay();
            },
            //取消撤项
            cancleRecallProject:function(){
                this.hiddenDailog = true;
                $(".ctrl-overlay").fadeOut(100);
            }
        }
    })

    // 遮罩层出现函数
    function showOverlay() {
        // 文字显示隐藏
        $(".ctrl-overlay .loading").html(' ');
        // 遮罩层出现
        $(".ctrl-overlay").css({
            //给遮盖层的div的高宽度赋值
            height: $(document).height(),
        }).fadeIn(100);
    }

    // 遮罩层+loading动画出现函数
    function waitingShow() {
        showOverlay();
        // 出现等待动画
        $('.circle-box2 .sk-circle').fadeIn();
    }


    // 遮罩层+loading动画隐藏
    function waitingHide() {
        $(".ctrl-overlay").fadeOut(100);
        // 等待动画
        $('.circle-box2 .sk-circle').fadeOut();
    }


    // 请求学生项目的数据
    function getStudentProject() {
        $.ajax({
            // url: 'http://localhost:8080/System/ManagerServlet?method=getFileList&type='+boxType,
            // url: 'http://localhost:8080/System/TutorServlet?method=getProject&tutorNum=10000',
            url: "../assets/student.json",
            type: 'get',
            dataType: 'json',
            // data: {param1: 'value1'},
            beforeSend: waitingShow,
            success: function (data) {
                teacher.$data.studentProject = data;
                waitingHide();
                // console.log(teacher.$data.studentProject);
                // console.log(data);
                // $('.stu-project table tbody').empty();
                // var tableHtml = '';
                // $.each(data, function (magIndex, mag) {
                //     tableHtml += "<tr ><td>" + mag['projectName'] +
                //         "</td><td>" + mag['projectNum'] + "</td><td>" + mag[
                //             'projectType'] + "</td><td>" + mag['tutor'] +
                //         "</td><td>" + mag['captain'] + "</td><td>" + mag[
                //             'dateTime'] + "</td><td>" + mag['status'] +
                //         "</td><td>0</td><td><span class='check-pj'><a href='http://localhost:8080/System/TutorServlet?method=download&num=" +
                //         mag['projectNum'] +
                //         "'>查看</a></span><span class='verify-pj' data-num=" +
                //         mag['projectNum'] + " data-status=" + mag['status'] +
                //         ">通过</span></td></tr>";
                // });
                // $('.stu-project table tbody').append(tableHtml);
            }
        });
    };

    getStudentProject();

    //学生项目按点击ajax加载
    $('#btn-stuproject').click(getStudentProject);

    //欢迎页面的动画
    $('.welcome').animate({
        top: '0'
    });


    // 审核通过按钮
    var pjNum = '';
    var pjStatus = '';
    $('.body').delegate('.verify-pj', 'click', function () {
        // alert('ok');
        pjNum = $(this).attr("data-num");
        pjStatus = $(this).attr("data-status");
        // 12-10
        $('.loading').text('审核提交');

        // alert(pjStatus);
        $.ajax({
            url: 'http://localhost:8080/System/TutorServlet?method=changeStatus',
            type: 'POST',
            dataType: 'json',
            data: {
                projectNum: pjNum,
                status: pjStatus
            },
            // 12-10
            beforeSend: function () {
                var bh = window.screen.height; //获取当前浏览器界面的高度
                var bw = document.body.clientWidth; //获取当前浏览器界面的宽度
                $(".ctrl-overlay").css({
                    height: bh, //给遮盖层的div的高宽度赋值
                    width: bw,
                }).fadeIn(100);
                // 出现等待动画
                $('.circle-box2 .sk-circle').fadeIn();
            },
            success: function (data) {
                $('.stu-project table tbody').empty();
                var tableHtml = '';
                $.each(data, function (magIndex, mag) {
                    tableHtml += "<tr ><td>" + mag['projectName'] +
                        "</td><td>" + mag['projectNum'] + "</td><td>" + mag[
                            'projectType'] + "</td><td>" + mag['tutor'] +
                        "</td><td>" + mag['captain'] + "</td><td>" + mag[
                            'dateTime'] + "</td><td>" + mag['status'] +
                        "</td><td>0</td><td><span class='check-pj'>查看</span><span class='verify-pj' data-num=" +
                        mag['projectNum'] + " data-status=" + mag['status'] +
                        ">通过</span></td></tr>";
                });
                $('.stu-project table tbody').append(tableHtml);
                // 12-10
                $(".ctrl-overlay").fadeOut();
                // 出现等待动画
                $('.circle-box2 .sk-circle').fadeOut();
                // alert('ok');
            },
            error: function () {
                alert('审核ok');
            }
        });
    });
});