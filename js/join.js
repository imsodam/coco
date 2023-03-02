(function($){ 

    $('.joinBox form').on('submit', function(){
       let idbox = $('#idbox').val()
       if (!idbox) {
            alert('아이디를 입력하세요.')
            $('#idbox').focus()
            return false
       }

       let pwbox = $('#pwbox').val()
       if (!pwbox) {
            alert('비밀번호를 입력하세요.')
            $('#pwbox').focus()
            return false
       }
       let pwboxok = $('#pwboxok').val()
       if ( pwbox!==pwboxok) {
            alert('비밀번호가 틀립니다.')
            $('#pwboxok').focus()
            return false
       }

       let irum = $('#irum').val()
       if (!irum) {
            alert('이름을 입력하세요.')
            $('#irum').focus()
            return false
       }

       let hp1 = $("#hp1").val()
       let hp2 = $("#hp2").val()
       let check3 = /[0-9]{3,4}/    //    /\d{3,4}/
       let check4 = /[0-9]{4}/      //    /\d{4}/
       if ( !check3.test(hp1) ) {
            alert('번호 형식이 맞지 않습니다.')
            $('#hp1').focus()
            return false
       }
       if ( !check4.test(hp2) ) {
            alert('번호 형식이 맞지 않습니다.')
            $('#hp2').focus()
            return false
        }

        // 이메일 유효성 체크
        let emailid = $('#emailid').val()
        let check5 = /^[a-zA-Z0-9]+$/   // 첫글자는 영문소문자, 대문자, 숫자로만 시작
                                        // ^ : 첫문자 일치
                                        // $ : 끝문자 일치
                                        // + : 한번 이상 포함
                                        // * : 0번 이상 포함
        if ( !check5.test(emailid) ) {
            alert('이메일 아이디 형식이 맞지 않습니다.')
            $('#emailid').focus()
            return false
        }  

        let emaildomain = $('#emaildomain').val()
        let check6 = /^[a-zA-Z0-9]+[\.][a-z]+([\.][a-z]+)*$/
        if ( !check6.test(emaildomain)) {
            alert("이메일을 정확하게 입력하세요.")
            $('#emaildomain').focus()
        }

        let gender = $("input[name='gender']:checked").length; 
        if ( !gender ) {
            alert("성별을 선택해 주세요.")
            return false;
        }

       return false  // 백엔드 프로그램 연결후에는 삭제함
    })


    // 이메일 계정 선택하기
    $('#domainlist').on('change', function(){
        $('#domainlist option:selected').each(function(){
            if ( $(this).val()!=='noselect' && $(this).val()!=='self' ) {
                   $('#emaildomain').val( $(this).val() )
                   .attr({disabled:true})
            } else if ( $(this).val()==='noselect' ) {
                  $('#emaildomain').val('').attr({disabled:true})
            } else {
                  $('#emaildomain').val('').attr({disabled:false})
            }
        })
    })

    // 관심분야 전체선택 체크 유무 
    $('#all').on('click', function(){
        let bool = $(this).prop("checked");
        $('input[name^="co"]').prop('checked', bool)
    })

    // 남은글자 체크하기
    $('#memo').on('keyup', function(){
        let maxlen = 10
        let count = $(this).val().length
        let remain = maxlen - count
        $(this).next().text(remain)
    })

})(jQuery)