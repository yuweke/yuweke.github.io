$(function(){
  var Top=null;//给top变量一个初始值
  $("#menu-btn").on('click', function () {
    $(".mask").fadeIn();
    $(".menu-nav-box").animate({"right":"0"});
    $('body').addClass('body-hide'); //给body增加一个类，position:fixed;
  });
  $(".menu-hide").on('click', function () {
    $(".mask").fadeOut();
    $(".menu-nav-box").animate({"right":"-100%"});
    $('body').removeClass('body-hide'); //去掉给body的类
  });

  $(".menu-nav li .menu-tab").on('click', function () {
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).siblings('.menu-level-nav').slideUp();
    } else {
      $(this).parent('li').siblings().children('.menu-level-nav').hide();
      $(this).parent('li').siblings().children('.menu-tab').removeClass('on');
      $(this).addClass('on');
      $(this).next('.menu-level-nav').slideDown();
    }
  });

  $(".side-foot-hide").on('click', function () {
    $(".side-foot").fadeOut();
  });
  $(".index3-top li").on('click', function () {
    var liindex = $('.index3-top li').index(this);
    $(this).addClass('on').siblings().removeClass('on');
    $('.index3-list ul').eq(liindex).fadeIn(150).siblings('ul').hide();
  });

  $(".index-case-top li").on('click', function () {
    var liindex = $('.index-case-top li').index(this);
    $(this).addClass('on').siblings().removeClass('on');
    $('.index-case-tab .index-case-box').eq(liindex).fadeIn(150).siblings('.index-case-box').hide();
    $('.slider')[liindex].slick.refresh()
  });

  $(".product13-tab li").on('click', function () {
    var liindex = $('.product13-tab li').index(this);
    $(this).addClass('on').siblings().removeClass('on');
    $('.product13-tab-con .product13-con').eq(liindex).fadeIn(150).siblings('.product13-con').hide();
  });
});


