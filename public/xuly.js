var socket = io("https://namcu.herokuapp.com");
var datauser = [];
var login = {
    "datauser":datauser,
};
function neu(data){
  var a;
  if(data == 0) a = "bật";
  else a ="tắt";
  return  a;
}
$(document).ready(function(){
  $("#home").hide();
  $("#login").show();
  $("#Sensor1").hide();
  $("#button1").hide();
  /////////////////////////////////////////////
  var led = [1,1,1,1];
  var mang = {
    "led":led,
  };
  //tạo một mảng led
  /////////////////////////////////////////////
  socket.on("logintrue",function(){
    $("#home").show(2000);
    $("#login").hide(1000);
  });
  socket.on("loginfail",function(){
    alert("tài khoản hoặc mật khẩu chưa đúng");
    datauser.splice(0,10);
  });
  /////////////////////////////////////////////
  $("#btnbutton2").click(function(){
    $("#Sensor").hide();
    $("#button").hide();
    $("#Sensor1").show(100);
    $("#button1").show(100);
  });
  $("#btnbutton1").click(function(){
    $("#Sensor").show(100);
    $("#button").show(100);
    $("#Sensor1").hide();
    $("#button1").hide();
  });
  /////////////////////////////////////////////
  $("#btnlogin").click(function(){
    datauser.push($("#username").val());
    datauser.push($("#password").val());
    socket.emit("login",login);
  });
  /////////////////////////////////////////////

  socket.on("dulieu", function(data){
    document.getElementById("temp").innerHTML = data["temp"];
    document.getElementById("humi").innerHTML = data["humi"];
    document.getElementById("P").innerHTML = data["P"];
  });
  socket.on("dulieu1", function(data){
    document.getElementById("P1").innerHTML = data["P"];
    document.getElementById("trangthaiden1").innerHTML = neu(data["den1"]);
    document.getElementById("trangthaiden2").innerHTML = neu(data["den2"]);
    document.getElementById("trangthaiden3").innerHTML = neu(data["den3"]);
    document.getElementById("trangthaiden4").innerHTML = neu(data["den4"]);
    led.splice(0,1,data["den1"]);
    led.splice(1,1,data["den2"]);
    led.splice(2,1,data["den3"]);
    led.splice(3,1,data["den4"]);
  });
  //nhận dữ liệu từ server
/////////////////////////////////////////////
  $("#onden").click(function(){
    led.splice(0,1,0);
       socket.emit("onden",mang);
  }); //endm6
  //////////////////////////////////s///////////
  $("#offden").click(function(){
    led.splice(0,1,1);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#onden1").click(function(){
    led.splice(1,1,0);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#offden1").click(function(){
    led.splice(1,1,1);
       socket.emit("onden",mang);
  }); //end
  //gửi dữ liệu về server
  /////////////////////////////////////////////
  $("#onden2").click(function(){
    led.splice(2,1,0);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#offden2").click(function(){
    led.splice(2,1,1);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#onden3").click(function(){
    led.splice(3,1,0);
       socket.emit("onden",mang);
  }); //end
  /////////////////////////////////////////////
  $("#offden3").click(function(){
    led.splice(3,1,1);
       socket.emit("onden",mang);
  }); //end
}); //document
