var socket = io("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  $("#Btn").click(function(){
    socket.emit("mess", $("#onhap").val());
  })
  socket.on("messe",function(data){
    $("#messe").append("<div class ="ms">" data ""</div>"");
    console.log(data);
  })
  })
