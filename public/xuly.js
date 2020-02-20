var socket = io("https://namcu1998.herokuapp.com")   //("https://namcu1998.herokuapp.com");
$(document).ready(function(){

   socket.emit("name","1");
  $("#button").click(function(){
    socket.emit("mess", $("#nhap").val());
  })
  socket.on("messe",function(data){
    $("#messe").append(data);
    console.log(data);
  })
  socket.on("user",function(data1){
    $("#user").append(data1)
  })

  })
