var scrollTop = $(window).scrollTop()
var swiper = new Swiper('.swiper-container', {
    onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeStart: function (swiper) {
        swiperAnimate(swiper); //每个slide切换前时也运行当前slide动画
        
    },
    autoplay:4000,
    effect: 'fade',
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    loop: true,
    autoplayDisableOnInteraction : false,

});

