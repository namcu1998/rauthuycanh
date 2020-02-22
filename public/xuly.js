var socket = io("https://namcu1998.herokuapp.com");
var mang = [1,1];
var led = {
  "led":mang
}
mang.splice()
document.write(mang.valueOf());
$(document).ready(function(){
  /////////////////////////////////////////////
  $("#onden").click(function(){
       mang.splice(0 , 0 , '0');
       socket.emit("den1on",led);
  }); //end
  /////////////////////////////////////////////
  $("#offden").click(function(){
    mang.splice(0 , 0 , '1');
    socket.emit("den1on",led);
  }); //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){

  }); //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){

  }); //end
  /////////////////////////////////////////////
  socket.on("user", function(data){
    $("#mess").append("<div class='ms'>" + data + "</div>")
});
  /////////////////////////////////////////////
}); //document
