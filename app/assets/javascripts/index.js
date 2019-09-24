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
  

  function addHTML (user_id,user_name) {
    var add = $("#add-list");
    var html = `
                  <div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div> `
    add.append(html)
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
      $("#user-search-result").empty();
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

  $('#user-search-result').on('click','.chat-group-user__btn--add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name')
    $(this).parent().remove();
    addHTML(user_id,user_name)
    
    })
    $(".chat-group-form__field--right").on('click','.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function() {
      $(this).parent().remove();
    })    
  });
  
  

  
