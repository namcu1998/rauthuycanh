var socket = io("https://namcu1998.herokuapp.com");
var mang = ["Học", "lập", "trình", "tại", "freetuts.net"];
mang.splice(1, 2, 'PHP', 'căn bản ');
document.write(mang.valueOf());
$(document).ready(function(){
  /////////////////////////////////////////////
  $("#onden").click(function(){
       socket.emit("den1on","nam");
  }); //end
  /////////////////////////////////////////////
  $("#offden").click(function(){
    socket.emit("den1off","data");
  }); //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){
    socket.emit("den2on", 'den1on');
  }); //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){
    socket.emit("den2off", 'den1on');
  }); //end
  /////////////////////////////////////////////
  socket.on("user", function(data){
    $("#mess").append("<div class='ms'>" + data + "</div>")
});
  /////////////////////////////////////////////
}); //document
