var socket = io("https://namcu.herokuapp.com");
var datauser = [];
var login = {
    "datauser":datauser,
};
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
    document.getElementById("temp").innerHTML = data["time"];
    document.getElementById("humi").innerHTML = data["time1"];
    document.getElementById("P").innerHTML = data["P"];
    led.splice(0,1,data["den1"]);
    led.splice(1,1,data["den2"]);
  });
  socket.on("dulieu1", function(data){
    document.getElementById("P1").innerHTML = data["P"];
    //document.getElementById("humi1").innerHTML = data["time1"];
    led.splice(2,1,data["den1"]);
    led.splice(3,1,data["den2"]);
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
