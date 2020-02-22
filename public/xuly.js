var socket = io("https://namcu1998.herokuapp.com")   //("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  ////////////////////////////////////////////
  $("#onden").click(function(){
    socket.emit("den1on", 'den1on');
  }) //end
  /////////////////////////////////////////////
  $("#offden").click(function(){
    socket.emit("den1off", "den1off");
  }) //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){
    socket.emit("den2on", 'den1on');
  }) //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){
    socket.emit("den2off", 'den1on');
  }) //end
  /////////////////////////////////////////////
}) //document
