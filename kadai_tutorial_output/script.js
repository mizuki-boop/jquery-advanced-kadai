$(function(){
$('.button-more').on('mouseover',function(){
$(this).animate({
    opacity:0.5,
    marginLeft:20,
    },100);
});

$('.button-more').on('mouseout',function(){
$(this).animate({
    opacity:1.0,
    marginLeft:0,
},100);
});

$('.carousel').slick({
    autoplay:true,
    dots:true,
    infinite:true,
    autoplaySpeed:5000,
    arrows:false,
});
// AjaxでSTATIC FORMSにデータを送信
$('#submit').on('click', function (event) {
    // formタグによる送信を拒否
    event.preventDefault();
  
    // 入力チェックをした結果、エラーがあるかないか判定
    let result = inputCheck();

// エラー判定とメッセージを取得
let error = result.error;
let message = result.message;

// エラーが無かったらフォームを送信する
if (error == false) {
  // Ajaxでformを送信する
   $.ajax({
     url: 'https://api.staticforms.xyz/submit',
     type: 'POST',
     dataType: 'json',
     data: $('#form').serialize(),
     success: function (result) {
       alert('お問い合わせを送信しました。')
     },
     error: function (xhr, resp, text) {
       alert('お問い合わせを送信できませんでした。')
     }
})
}else{
    alert(message);
}
});

   // フォーカスが外れたとき（blur）にフォームの入力チェックをする
   $('#name').blur(function () {
     inputCheck();
   });
   $('#furigana').blur(function () {
     inputCheck();
   });
   $('#email').blur(function () {
     inputCheck();
   });
   $('#tel').blur(function () {
     inputCheck();
   });
   $('#message').blur(function () {
     inputCheck();
   });
   $('#agree').click(function () {
     inputCheck();
   });

  //お問い合わせフォームの入力チェック
  function inputCheck() {
    let result;

    let message='';

    let error=false;

    if ($('#name').val() == '') {
        //エラーあり
         $('#name').css('background-color', '#f79999');
         error = true;
         message += 'お名前を入力してください。\n';
      } else {
        $('#name').css('background-color','#fafafa');
        //エラーなし
      }

      if ($('#furigana').val() == '') {
        //エラーあり
         $('#furigana').css('background-color', '#f79999');
         error = true;
         message += 'フリガナを入力してください。\n';
      } else {
        $('#furigana').css('background-color','#fafafa');
        //エラーなし
      }

      if ($('#message').val() == '') {
        //エラーあり
         $('#message').css('background-color', '#f79999');
         error = true;
         message += 'お問合せ内容を入力してください。\n';
      } else {
        $('#message').css('background-color','#fafafa');
        //エラーなし
      }

      if($('#email').val()==''|| $('#email').val().indexOf('@')==-1||$('#email').val().indexOf('.')==-1){
        // エラーあり
        $('#email').css('background-color','#f79999');
        error=true;
        message+='メールアドレスが未記入、または「@」「.」が含まれていません。\n';
      }else{
        // エラーなし
        $('#email').css('background-color','#fafafa');
      }

      if($('#tel').val()!=''&&$('#tel').val().indexOf('-')==-1){

        // エラーあり
        $('#tel').css('background-color','#f79999');
        error=true;
        message=+'電話番号に「-」が含まれていません。\n';
      }else{
        $('#tel').css('background-color','#fafafa');
      }

      if ($('#agree').prop('checked') == false) {
        error = true;
        message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
      }

      if(error==true){
        $('#submit').attr('src','images/button-submit.png');
      }else{
        $('#submit').attr('src','images/button-submit-blue.png');
      }

      result={
        error:error,
        message:message
      }
      return result;
    }
   
  });