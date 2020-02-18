var socket = io("http://localhost:3000");
$(document).ready(function(){
  $("#Btn").click(function(){
    socket.emit("mess", $("#onhap").val());
  })
  socket.on("messe",function(data){
    $("#messe").append(data);
    console.log(data);
  })
  })
