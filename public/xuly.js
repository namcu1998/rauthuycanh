var socket = io("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  /////////////////////////////////////////////
  socket.on("user", function(data){
    document.getElementById("mess").innerHTML = data["time"];
    document.getElementById("mess1").innerHTML = data["den1"];
    document.getElementById("mess2").innerHTML = data["den2"];
  });
/////////////////////////////////////////////
  $("#onden").click(function(){
       socket.emit("den1on","led");
  }); //end
  //////////////////////////////////s///////////
  $("#offden").click(function(){
    socket.emit("offden","led");
  }); //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){
    socket.emit("onden1","led");
  }); //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){
    socket.emit("offden1","led");
  }); //end
  /////////////////////////////////////////////
  /////////////////////////////////////////////
}); //document
