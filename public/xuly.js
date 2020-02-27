var socket = io("https://tomchiengion1998.herokuapp.com");
$(document).ready(function(){
  /////////////////////////////////////////////
  socket.on("dulieu", function(data){
    document.getElementById("temp").innerHTML = data["time"];
    document.getElementById("humi").innerHTML = data["time"];
    document.getElementById("mess1").innerHTML = data["den1"];
    document.getElementById("mess2").innerHTML = data["den2"];
    socket.emit("lang",data["den1"]);
    socket.emit("lang1",data["den2"]);
  });
/////////////////////////////////////////////
  $("#onden").click(function(){
       socket.emit("onden","led");
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
