$(function() {

  var  list = $("#user-search-result")

  function appendbildHTML(data) {
    var html = ` <div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${data.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name=${data.name}>追加</div>
                </div> `
    list.append(html)            
  }

  function appendErrMsgToHTML(msg) {
    var html = ` <div class="chat-group-user clearfix">${msg}</div> `
    list.append(html)   
  }
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(data){
      console.log(data)
      $(".chat-group-user").empty();
      if (data.length !== 0) {
        data.forEach(function(data) {
          appendbildHTML(data)
          
        });
      } else {
        appendErrMsgToHTML('該当する名前はありません')
      } 
    })
    .fail(function(data){
      alert('非同期に失敗しました')
    })
  });
});
