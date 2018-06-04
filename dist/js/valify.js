"use strict";

/*
 * 	实现表单校验
 */
function valify(form) {
    var flag = true;
    //邮箱格式
    var emailRegex = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]*)*)$");
    //手机格式
    var phoneRegex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    //验证非空
    if (form.name.value.length == 0 || form.major.value.length == 0 || form.num.value.length == 0 || form.email.value.length == 0 || form.phone.value.length == 0) {
        alert("信息不能留空！");
        flag = false;
    } else if (!phoneRegex.test(form.phone.value)) {
        alert('请输入有效的手机号码！');
        return false;
    } else if (!form.email.value.match(emailRegex)) {
        alert("您的电子邮件格式错误！");
        flag = false;
    }
    return flag;
}