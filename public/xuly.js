var socket = io("https://namcu1998.herokuapp.com");  //("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  ////////////////////////////////////////////
  var data,data1,dat2;
  var lEd = [1,1,1];
  var json = {
    led: lEd;
  };
  ////////////////////////////////////////////
  $("#onden").click(function(){
       //data = 1;
       socket.emit("den1on",json);
  }) //end
  /////////////////////////////////////////////
  $("#offden").click(function(){
    //data = 0;
    socket.emit("den1off",json);
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
