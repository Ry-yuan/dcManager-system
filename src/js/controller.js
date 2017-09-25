$(function(){
  //定义复选框下标
      var checkboxNum='';
  // 获取文件名,一个判断是否有文件上传的参数
      var filesList='';
      // 文件名
      var fileName='';
      var id='s';
      var boxType='news';
   // 上传文件事件，检测到有文件上传执行的函数
		$('.issue').change(function(){
      // 获得上传的文件列表，js操作
      filesList=$('.issue')[0].files;
      for(x=0;x<filesList.length;x++){
        // 获得当个文件的文件名
        var fileAllName=filesList[x].name;
         // 后缀的位置
        var endpos=fileAllName.lastIndexOf('.');
       // var fileName=filePath.substring(starpos+1,endpos);
        // 字符串截取掉后缀
        fileName=fileAllName.substring(0,endpos);
        // 当文件名太长就截取省略，filename省略
        if(fileName.length>=12){
          fileName=fileName.substring(0,10)+"..."
        }
        if(fileName.length==0){
          return false;
      }
      // 拼接html
      var flieHtml="<dl class='newfile'>"+"<dt><dd>"+fileName+"</dd></dt><span class='deleFile'></span></dl>"
      // 添加到html中
      $('.file-box').append(flieHtml);
      }
     
		});
    
    // 多图片上传
     var imgsList='';
     // 文件类型
     var fileType='';
     $(".upload").change(function(e) {
          fileType='uploadImage';
          imgsList=$('.upload')[0].files;
          // alert(filesList.length);
          for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files.item(i);      
            var freader = new FileReader();
            freader.readAsDataURL(file);
            freader.onload = function(e) {
              var src = e.target.result;
              // $("#uploadhead").attr("src",src);
              imgHmtl="<div class='uploadImg'><img  src="+src+"><span class='deleFile'></span></div>";
              $('.downfiles-box').append(imgHmtl);
            }
          }
          // 禁用下载文件上传
          $('.uploadFile').attr("disabled","disabled").css('cursor',"not-allowed");
        });
     // 下载文件上传
     $('.uploadFile').change(function(){
        fileType='uploadFile'
        filesList=$('.uploadFile')[0].files;
        for(x=0;x<filesList.length;x++){
         var fileAllName=filesList[x].name;
         var endpos=fileAllName.lastIndexOf('.');
      // var fileName=filePath.substring(starpos+1,endpos);
      fileName=fileAllName.substring(0,endpos);
      // filename省略
      if(fileName.length>=12){
        fileName=fileName.substring(0,10)+"...";
      }
      if(fileName.length==0){
        return false;
      }
      var flieHtml="<dl class='newfile'>"+"<dt><dd>"+fileName+"</dd></dt><span class='deleFile'></span></dl>"
      $('.downfiles-box').append(flieHtml);
      }
      // 禁用图片上传
     $('.upload').attr("disabled","disabled").css('cursor',"not-allowed");
     });


		// 加载更多点击次数
		var clickNum=0;
    //记录each运行次数
    var runTime=0;
    //一次加载的条数
    var loadNum=4;
		$('.load-more').click(function(){
      loadMgs();
      console.log(id);
    });

    // 新闻列表删除按钮,delegate为动态添加的html元素添加事件
    $('body').delegate('.pull-down','click',function(){
      $(this).nextAll().fadeToggle(100);
    });
    // 删除按钮
    $('.body').delegate('.dele','click',function(){
      //传到后台的数据
      // alert($(this).parent().index());
      $(this).parent().remove();
    });
    //编辑按钮
    $('.body').delegate('.edit','click',function(){
      //传到后台的数据
      // alert($(this).parent().index());
      // $(this).parent().remove();
    });


// 一个判断复选框是否被选中的参数
var isCheck=false;
// 发布单选按钮选中后的操作
$('.checkbox input[type=radio]').change(function(){
      if($(this).is(':checked')&&filesList.length!=0){
      // 复选框的值
      // console.log($(this).val());
      $('.ensure').css({backgroundColor:'#33a3dc',cursor:'pointer'});
      return isCheck=true;
      // console.log(check);
      }
    else{
      $('.ensure').css({backgroundColor:'#464547',cursor:'not-allowed'});
      return isCheck=false;
    }
  });

  // 上传确定按钮
 $('.upload-sure').click(function(){
  if(imgsList.length!=0){
	  $('.loading').text('正在上传');
    var formData = new FormData();
    $.each($('.upload')[0].files, function(i, file) {
      formData.append('upload_img'+i, file);
    });
    // ajax提交文件到后台
    $.ajax({
    	 url: 'http://localhost:8080/System/ManagersServlet?method='+fileType,
    	 type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend:function(){
      // 禁止页面滚动
        // document.documentElement.style.overflow='hidden';
        var bh = window.screen.height;  //获取当前浏览器界面的高度
        var bw = document.body.clientWidth;   //获取当前浏览器界面的宽度
        $(".ctrl-overlay").css({
            height:bh,      //给遮盖层的div的高宽度赋值
            width:bw,
      }).fadeIn(100);
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeIn();
      // alert('w');
      if(imgsList.length==0){
        // alert('ok');
        $(".ctrl-overlay").fadeOut(function(){
        $('.load-false').fadeIn(100);
        // 上传信息延迟一会消失
        setTimeout(function(){
          $('.load-false').fadeOut(100);
        },1000);
      });
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeOut();
        return false;}
    },
        success:uploadSuccess,
        error:uploadError,
    });
  }
  if(filesList.length!=0){
    var formData = new FormData();
    $.each($('.uploadFile')[0].files, function(i, file) {
      formData.append('upload_file'+i, file);
    });
    // ajax提交文件到后台
    $.ajax({
         url: 'http://localhost:8080/System/ManagersServlet?method='+fileType,
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend:waiting,
        success:uploadSuccess,
        error:uploadError,
    });
  }
    
  });

  // 发布确定按钮事件
  $('.ensure').click(function(){
    //当复选框没有选中，则不能点击
    if(isCheck==false||filesList==''){return false}
    $('.loading').text('正在上传');
    $('.checkbox input[type=radio]').each(function(){
      if($(this).is(':checked')){
         checkboxNum +=$(this).val();
      // console.log(checkboxNum);
      }
     ;
    });
    var formData = new FormData();
    $.each($('#file')[0].files, function(i, file) {
      formData.append('upload_file'+i, file);
    });
    // ajax提交文件到后台
    $.ajax({
         url: 'http://localhost:8080/System/ManagersServlet?method='+checkboxNum,
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend:waiting,
        success:uploadSuccess,
        error:uploadError,
    });
  });

  // ajax提交前执行的函数
    function waiting(){
      // 禁止页面滚动
        // document.documentElement.style.overflow='hidden';
        var bh = window.screen.height;  //获取当前浏览器界面的高度
        var bw = document.body.clientWidth;   //获取当前浏览器界面的宽度
        $(".ctrl-overlay").css({
            height:bh,      //给遮盖层的div的高宽度赋值
            width:bw,
      }).fadeIn(100);
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeIn();
      // alert('w');
      if(filesList.length==0){
        // alert('ok');
        $(".ctrl-overlay").fadeOut(function(){
        $('.load-false').fadeIn(100);
        // 上传信息延迟一会消失
        setTimeout(function(){
          $('.load-false').fadeOut(100);
        },1000);
      });
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeOut();
        return false;}
    }

    // 请求成功后执行的函数
    function uploadSuccess(data){
      // alert("ok");
      $(".ctrl-overlay").fadeOut(function(){
        $('.load-success').fadeIn(100);
        // 上传成功延迟一会消失
        setTimeout(function(){
          $('.load-success').fadeOut(100);
        },1000);
      });
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeOut();
      // 清空filelist,imgslist
      filesList='';
      imgsList='';
      //提交一次后禁止确认按钮
      $('.ensure').css({backgroundColor:'#464547',cursor:'not-allowed'});
      isCheck=false;
      // 清除复选框状态
      $('.checkbox input[type=radio]').each(function(){
        $(this).prop('checked',false);
      });
      $('.file-box').html('');
      // 清除参数checkboxNum复选框下标
      checkboxNum='';
    // 刷新一次所有新闻
    reload();
    // 清空上传显示列表
    $('.downfiles-box').html('');
    //清空上传页面的上传按钮禁用状态
    $('.upload').removeAttr('disabled').css('cursor',"pointer");
    $('.uploadFile').removeAttr('disabled').css('cursor','pointer');
    }
    // 请求失败后的执行函数
    function uploadError(XMLHttpRequest, textStatus, errorThrown){
      // alert('ro');
      alert(XMLHttpRequest.status);
      alert(XMLHttpRequest.readyState);
      alert(textStatus);
      $(".ctrl-overlay").fadeOut(function(){
        $('.load-false').fadeIn(100);
        // 上传信息延迟一会消失
        setTimeout(function(){
          $('.load-false').fadeOut(100);
        },1000);
      });
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeOut();
    }

  // 进入页面加载一次所有新闻/通知
  loadMgs();
  //刷新页面后清除单选按钮选中状态
  $('.checkbox input[type=radio]').each(function(){
        $(this).prop('checked',false);
      });

  // 删除信息函数
  function deleMgs(){
    $('.all').html('');
  }

  // 所有新闻和通知间切换，重新拉去相应数据
  $('.news-btn').click(function(){
    boxType='news';
    // 清除原来新闻
    reload(boxType);
  });
  $('.info-btn').click(function(){
    boxType='notice';
    reload();
  });

  // 重新载入所有通知信息函数
  function reload(){
    // 重置id
    id='s';
    //删除所有信息
    deleMgs();
    //重置值
    clickNum=0;
    //记录each运行次数
    runTime=0;
    //一次加载的条数
    loadNum=4;
    // 加载新闻
    loadMgs();
    // console.log(id);
  }

// 加载更多新闻信息函数
function loadMgs(){
      // 一次加载的条数
      // var newNum=loadNum;
      // clickNum++;
      //each运行时跳过的条数，即已加载的数目
      // var needRuntime=runTime;
      $.ajax({
    	  		url: 'http://localhost:8080/System/ManagersServlet?method=getFileList&type='+boxType+"&id="+id,  
              type: 'GET',
              dataType: 'json',
              // data: {param1: 'value1'},
              beforeSend:beforeSent,
              success:function(data) {
                var html ='';
                $('.sk-circle').fadeOut(function(){
                $('.load-more p').show();
                });
                $.each( data,function(commentIndex,comment){
                  //跳过以加载的内容，并获取没加载的内容
                // if(commentIndex+1>needRuntime){
                //    html += "<div class='allnews-list'><span class='point'></span><span class='date'>"+comment['date']+"</span><li><a href="+comment['path']+">"+comment['title']+"</a></li><span class='pull-down'></span><div class='dele'>删除</div></div>";
                //       runTime++;
                //       // 最后一个
                //       id=comment['id'];
                // }
                if(commentIndex+1==clickNum*loadNum){
                  return false;
                }
                if(commentIndex==data.length-1){
                  $('.load-more p').text('加载完成');
                }
                var upDate=comment['date'].substring(0,10); 
                html += "<div class='allnews-list'><span class='point'></span><span class='date'>"+upDate+"</span><li><a href="+comment['path']+">"+comment['title']+"</a></li><span class='pull-down'></span><div class='dele'>删除</div><div class='edit'>编辑</div></div>";
//                    html += "<div class='allnews-list'><span class='point'></span><span class='date'>"+comment['date']+"</span><li><a href=http://localhost:8080/System/PopularUserServlet?method=showFile&path=."+comment['filePath']+">"+comment['title']+"</a></li><span class='pull-down'></span><div class='dele'>删除</div><div class='edit'>编辑</div></div>";
                    id=comment['id'];

               })
              // alert(html);
              // alert(runTime);
                $('.allnews').append(html);
                // console.log(id);
            },
            error:function(){
              console.log('loading-error');
            }
            });
    function beforeSent(){
          $('.sk-circle').css({display:"block"});
          $('.load-more p').css({display:'none'});
      }
    }

  function UpperFirstLetter(str)   
  {   
   return str.replace(/\b\w+\b/g, function(word) {   
   return word.substring(0,1).toUpperCase( ) +  word.substring(1);   
   });   
  }

// 管理面板切换
function ctrlChange(btn,show){
    $(btn).click(function(){
    $('.allWrapper').css({display:'none'});
    $(show).fadeIn(100);
  });
  }
ctrlChange('#upload-icon','.upload-wrapper');
ctrlChange('#issue-icon','.issue-wrapper');
ctrlChange('#project','.projects');
// 项目一览后台拉取信息
$('#project').click(function(){
  $.ajax({
             url: 'http://localhost:8080/System/ManagersServlet?method=getProjectList&time='+filterTime+'&filterDep='+filterDep,
              type: 'POST',
              dataType: 'json',
              // data: {param1: 'value1'},
              // beforeSend:beforeSent,
              success:function(data) {
            	  $('.projects table tbody').empty();
                var tableHtml='';
                $.each(data,function(magIndex,mag){
                	tableHtml +="<tr ><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj' data-num="+mag['projectNum']+" data-status="+mag['status']+">通过</span></td></tr>";
//                	tableHtml +="<tr><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj'>通过</span></td></tr>";
//                  tableHtml +="<tr><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td><span class='check-pj'>查看</span><span class='reset-pj'>撤回</span></td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td></tr>"
                });
                $('.projects table tbody').append(tableHtml);
              }
});
});

// 项目一览全选
$('.select-all').click(function(){
      $('input[name=projects]').each(function(){
          $(this).prop("checked",true);
      });
});
$('.dele-all').click(function(){
      $('input[name=projects]').each(function(){
          $(this).prop("checked",false);
      });
});
// 撤项按钮
var undoNum='';
$('.projects-undo').click(function(){
  $('input[name=projects]').each(function(){
    if($(this).prop('checked')){
      // alert($(this).val());
      undoNum += $(this).val()+',';
    }
  });
  $.ajax({
      url: 'http://localhost:8080/System/ManagersServlet?method=deleteProject&projectNum='+undoNum,
    type: 'POST',
    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {projectNum: undoNum},
    success:function(){
//    	console.log('undo-ok');
    	undoNum='';
    	$('#project').click();
    },
    error:function(){
    	undoNum='';
      alert('error');
    }
  });
});
//下载按钮
/*$('.projects-down').click(function(){
	  $('input[name=projects]').each(function(){
	    if($(this).prop('checked')){
	      // alert($(this).val());
	      undoNum += $(this).val()+',';
	    }
	  });
	  $.ajax({
	      url: 'http://localhost:8080/System/ManagersServlet?method=downloadFile',
	    type: 'POST',
	    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	    data: {projectNum: undoNum},
	    success:function(){
//	    	console.log('down-ok');
	    	undoNum='';
//	    	$('#project').click();
	    },
	    error:function(){
//	      alert('error');
	    	undoNum='';
	    }
	  });
	});*/
$('.projects-down').click(function(){
	$('input[name=projects]').each(function(){
    if($(this).prop('checked')){
      // alert($(this).val());
      undoNum += $(this).val()+',';
    }
  });
	$('.projects-down a').attr('href','http://localhost:8080/System/ManagersServlet?method=downloadFile&projectNum='+undoNum);
	undoNum='';
})
//$('.projects-down a').attr('href','http://localhost:8080/System/ManagersServlet?method=downloadFile');

// 筛选项目列表
var filterTime='2016';
var filterDep='互联网金融与信息工程系';
$('.filter-btn').click(function(){
	 $('.loading').text('正在查询');
  filterTime=$('#select-time option:selected').val();
  filterDep=$('#select-dep option:selected').val();
  $.ajax({
      url: 'http://localhost:8080/System/ManagersServlet?method=getProjectList&time='+filterTime+'&filterDep='+filterDep,
    type: 'POST',
    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    // data: {param1: 'value1'},
    beforeSend:function(){
      var bh = window.screen.height;  //获取当前浏览器界面的高度
        var bw = document.body.clientWidth;   //获取当前浏览器界面的宽度
        $(".ctrl-overlay").css({
            height:bh,      //给遮盖层的div的高宽度赋值
            width:bw,
      }).fadeIn(100);
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeIn();
    },
    success:function(){
      $(".ctrl-overlay").fadeOut();
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeOut(function(){
    	  $('.loading').text('正在上传');
      });
      $('#project').click();
    },
    error:function(){
      alert('error');
    }
  });
  
  // alert(filterTime);
  // alert(filterDep);
});

$('.load-more-project').click(function(){
  $.ajax({
            // url: 'http://localhost:8080/System/ManagerServlet?method=getFileList&type='+boxType,
              url: 'project.json',
              type: 'POST',
              dataType: 'json',
              // data: {param1: 'value1'},
              // beforeSend:beforeSent,
              success:function(data) {
            	  $('.projects table tbody').empty();
                var tableHtml='';
                $('.sk-circle').fadeOut(function(){
                $('.load-more p').show();
                });
                $.each(data,function(magIndex,mag){
                	tableHtml +="<tr ><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj' data-num="+mag['projectNum']+" data-status="+mag['status']+">通过</span></td></tr>";
//                	tableHtml +="<tr><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj'>通过</span></td></tr>";
//                	tableHtml +="<tr><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td><span class='check-pj'>查看</span><span class='reset-pj'>撤回</span></td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td></tr>"
                  alert(mag['dateTime']);
                });
                $('.projects table tbody').append(tableHtml);
              }
  });
});
// 上传文件删除按钮
$('body').delegate('.deleFile','click',function(){
      $(this).parent().remove();
    });
//12.8 项目一览的查看按钮
$('.body').delegate('.check-pj','click',function(){
  $('.checkMag').animate({opacity: '1',top: '25%'}).css('display','block');
});
// 项目一览产查看关闭
$('.checkClose').click(function(){
  $('.checkMag').animate({opacity: '0',top: '30%'},function(){
    $(this).css('display','none');});
});
//12-8-20:分数
// $('.score-pj').click(function(){
//   // alert('ok');
// })
// 12-9:13
// 通过按钮点击通过，拉取表格信息
var pjNum='';
var pjStatus='';
$('.body').delegate('.verify-pj','click',function(){
  // alert('ok');
	$('.loading').text('审核提交');
  pjNum=$(this).attr("data-num");
  pjStatus=$(this).attr("data-status");
  // alert(pjStatus);
$.ajax({
 url: 'http://localhost:8080/System/ManagersServlet?method=changeStatus',
  type: 'POST',
  dataType: 'json',
  data: {projectNum: pjNum,status:pjStatus},
  beforeSend:function(){
      var bh = window.screen.height;  //获取当前浏览器界面的高度
        var bw = document.body.clientWidth;   //获取当前浏览器界面的宽度
        $(".ctrl-overlay").css({
            height:bh,      //给遮盖层的div的高宽度赋值
            width:bw,
      }).fadeIn(100);
        // 出现等待动画
      $('.circle-box2 .sk-circle').fadeIn();
    },
  success:function(data){
        $('.projects table tbody').empty();
        var tableHtml='';
        $.each(data,function(magIndex,mag){
        	tableHtml +="<tr ><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj' data-num="+mag['projectNum']+" data-status="+mag['status']+">通过</span></td></tr>";
            // tableHtml +="<tr ><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['date']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj' data-num="+mag['projectNum']+">通过</span></td></tr>";
        	//        tableHtml +="<tr><td><input type='checkbox' name='projects' value="+mag['projectNum']+"></input></td><td>"+mag['projectName']+"</td><td>"+mag['projectNum']+"</td><td>"+mag['projectType']+"</td><td>"+mag['tutor']+"</td><td>"+mag['captain']+"</td><td>"+mag['dateTime']+"</td><td>"+mag['status']+"</td><td>0</td><td><span class='check-pj'>查看</span><span class='score-pj'>评分</span><span class='verify-pj'>通过</span></td></tr>";
              });
        $('.projects table tbody').append(tableHtml);
        $(".ctrl-overlay").fadeOut();
        // 出现等待动画
        $('.circle-box2 .sk-circle').fadeOut();
        // alert('ok');
  },
  error:function(){
    alert('审核error');
  }
});
});
});





