$(document).ready(function() {
    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });

    // 平滑滚动
    $('a.nav-link, a.btn').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // 打字效果
    if($('.typed-element').length) {
        new Typed('.typed-element', {
            strings: ['智能科技', '创新未来', '数字化转型'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }

    // 初始化粒子效果
    if(typeof particlesJS !== 'undefined' && $('#particles-js').length) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3a7bd5"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3a7bd5",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
});

    // 数字大脑动画效果
    $('.brain-image').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
            $('.neural-network').css('opacity', '0.5');
        },
        function() {
            $(this).css('transform', 'scale(1)');
            $('.neural-network').css('opacity', '0.3');
        }
    );

    // 服务卡片悬停效果增强
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon').css('transform', 'rotateY(180deg)');
        },
        function() {
            $(this).find('.service-icon').css('transform', 'rotateY(0)');
        }
    );

    // 添加服务图标旋转动画
    $('.service-icon').css('transition', 'transform 0.6s');

    // 表单提交事件
    $('.contact-form form').submit(function(event) {
        event.preventDefault();
        
        // 这里可以添加表单验证和AJAX提交
        const name = $(this).find('input[type="text"]').val();
        
        // 模拟表单提交成功
        alert('感谢您的留言，' + name + '！我们会尽快与您联系。');
        $(this)[0].reset();
    });

    // 页面加载动画
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // 添加页面加载动画CSS
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            body {
                opacity: 0;
                transition: opacity 1s ease;
            }
            body.loaded {
                opacity: 1;
            }
        `)
        .appendTo('head');

    // 初始化AOS动画库(如果需要)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }