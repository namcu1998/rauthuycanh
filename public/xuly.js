var socket = io("http://localhosthttps://namcu1998.herokuapp.com");
$(document).ready(function(){
  $("#Btn").click(function(){
    socket.emit("mess", $("#onhap").val());
  })
  socket.on("messe",function(data){
    $("#messe").append(data);
    console.log(data);
  })
  })
