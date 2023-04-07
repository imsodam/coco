(function ($) {


    // 개발자도구창의 토글디바이스툴바 사용하지 않았을때
    // 테스트 상황(윈도우 넓이 조절)에서 생기는 오류를 해결하기 위한 코드
    var deviceSize = 1024
    function scrollOX(status) {
        $('html').css({
            overflowY: status
        })
        return $('html').width()
    }
    // 토글디바이스툴바가 켜져 있으면 scX와 scO는 같은 값이 되므로
    // 아래 if 문을 들어가지 않아서 deviceSize는 원래 값임
    var scX = scrollOX('hidden')
    var scO = scrollOX('scroll')
    var scD = scX - scO
    // 토글디바이스툴바가 꺼져 있으면 스크롤바가 생성되므로
    // 스크롤바 넓이 17px을 deviceSize에서 빼야 함
    if (scD > 0) {
        deviceSize = deviceSize - scD
    }
    var ww = $(window).width()
    if (ww > deviceSize) {
        $('html').addClass('pc')
    } else {
        $('html').addClass('mobile')
    }

    $(window).on('resize', function () {
        let ww = $(window).width()
        if (ww > deviceSize && !$('html').hasClass('pc')) {
            $('html').addClass('pc').removeClass('mobile')
            location.reload()
        } else if (ww <= deviceSize && !$('html').hasClass('mobile')) {
            $('html').addClass('mobile').removeClass('pc')
            location.reload()
        }
    })
    // 여기까지 토글디바이스툴바 유무에 따른 테스트 오류 코드 끝

    setTimeout(function () {
        let count = 0;
        let timer = setInterval(add, 25)
        function add() {
            count++
            if (count >= 100) {
                clearInterval(timer)
                $('.introAni').animate({
                    left: '-100%'
                }, 500, function () {
                    $(this).remove()
                })
            }
            $('.introAni div').eq(1).text(count + '%')
        }
    }, 10)

    //이 코드는 모든 파일을 읽고 난후에 실행 > load 이벤트
    $(window).on('load', function () {
        $('#containerBox').load('main.html')

        $('html').animate({
            scrollTop: 0
        }, 100)

        // index.js 로 복사
        // let imgh = ($('.slide .img').height() / 2) - 35
        // $('.article1 .slick-arrow').css({
        //     top: '0%',
        //     transform: `translateY(${imgh}px)`,
        // })


        let objString = localStorage.getItem('objkey')
        if (objString) {
            const obj = JSON.parse(objString)
            if (Date.now() > obj.expire) {
                $('.popup').addClass('on')
                localStorage.removeItem('objkey')
            } else {
                $('.popup').removeClass('on')
            }
        } else {
            $('.popup').addClass('on')
        }
    })



    // pc화면용 네비게이션 액션
    // $('#header #nav .depth1 > li').on('mouseover mouseout', function(){
    //     if ( $('html').hasClass('pc') ) {
    //         $(this).find('.depth2').stop().slideToggle()
    //     }
    // })

    $('#header #nav .depth1 > li').on('mouseover', function () {
        if ($('html').hasClass('pc')) {
            $(this).find('.depth2').stop().slideDown()
        }
    })
    $('#header #nav .depth1 > li').on('mouseout', function () {
        if ($('html').hasClass('pc')) {
            $(this).find('.depth2').stop().slideUp()
        }
    })


    // 위의 코드 결과와 같음
    // $('#header #nav .depth1 > li').hover(
    //     function(){
    //         if ( $('html').hasClass('pc')) {
    //             $(this).find('.depth2').stop().slideDown()
    //         }
    //     },
    //     function(){
    //         if ( $('html').hasClass('pc')) {
    //             $(this).find('.depth2').stop().slideUp()
    //         }
    //     }
    // )




    // mobile 햄버거메뉴
    $('#header .open').on('click', function () {
        $(this).parents('#header').addClass('on')
    })

    $('#header .close').on('click', function () {
        $(this).parents('#header').removeClass('on')
        $('.depth1 .depth2').slideUp();
    })


    $('#header #nav .depth1 > li > a').on('click', function () {
        if ($('html').hasClass('mobile') && $(this).next().is('.depth2')) {
            // $(this).parent().toggleClass('on')
            $(this).next().stop().slideToggle()
            return false
        }
    })

    // topmove
    $(window).scroll(function () {
        let sct = $(this).scrollTop()
        if (sct > 100) {
            $('#gotop').fadeIn(300)
        } else {
            $('#gotop').fadeOut(300)
        }
    })

    $('#gotop a').click(function () {
        $('html').animate({
            scrollTop: '0'
        }, 500)
        return false
    })

    // family site
    $('.fam').on('click', function () {
        $(this).find('ul').slideToggle()
    })

    // popup
    $('.close button').on('click', function () {
        if ($(this).prev().prop('checked')) {
            let tts = Date.now() + (10000)   // 하루는 (24*60*60*1000)ms
            const obj = {
                check: 'yes',
                expire: tts
            }
            localStorage.setItem('objkey', JSON.stringify(obj))
        }
        $('.popup').removeClass('on')
    })

    // URL연결 - 회원가입
    $('.top_menu .row > a').on('click', function () {
        let url = $(this).attr('href')
        let title = $(this).attr('title')
        $('title').text(title)
        $('#containerBox #section').remove()
        $('#containerBox').load(url)
        return false
    })


})(jQuery);