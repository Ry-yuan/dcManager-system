"use strict";

$(function () {
    // 网页禁止托拽
    document.ondragstart = function () {
        return false;
    };

    $(".nav-list").click(function () {
        $('.min-nav').fadeToggle(100);
    });
});