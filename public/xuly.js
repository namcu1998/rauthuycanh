var socket = io("https://tomchiengion1998.herokuapp.com");
$(document).ready(function(){
  /////////////////////////////////////////////
  var led = [1,1];
  var mang = {
    "led":led,
  };
  //tạo một mảng led
  /////////////////////////////////////////////
  socket.on("dulieu", function(data){
    document.getElementById("temp").innerHTML = data["time"];
    document.getElementById("humi").innerHTML = data["time"];
    document.getElementById("mess1").innerHTML = data["den1"];
    document.getElementById("mess2").innerHTML = data["den2"];
    
  });
  //nhận dữ liệu từ server
/////////////////////////////////////////////
  $("#onden").click(function(){
    led.splice(0,1,1);
       socket.emit("onden",mang);
  }); //end
  //////////////////////////////////s///////////
  $("#offden").click(function(){
    led.splice(0,1,0);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){

  }); //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){

  }); //end
  //gửi dữ liệu về server
  /////////////////////////////////////////////
  /////////////////////////////////////////////
}); //document
