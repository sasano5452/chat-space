json.content @message.content
json.image @message.image.url
json.time @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id