$(function(){

  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";

    var html = `<div class="main__message" data-message-id="${message.id}">
                  <div class="main__message-upper-info">
                    <p class="main__message-upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="main__message-upper-info__date">
                     ${message.time}
                    </p>
                  </div>
                  <p class="main__message__text">
                    ${content}
                    ${image}
                  </p>
                </div> `
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('#new_message')[0].reset();
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('エラーが発生しましたので、メッセージは送信できません')
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.main__messages').append(insertHTML);
        $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast'); 
      })
      
    })
    .fail(function() {
      alert('自動更新に失敗しました')
    });
   }
  }
  setInterval(reloadMessages, 5000);
});