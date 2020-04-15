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
  $("#home").show();
  $("#login").hide();
  $("#Sensor1").hide();
  $("#button1").hide();
  socket.emit("data");
  /////////////////////////////////////////////
  var led = [1,1,1,1];
  var mang = {
    "led":led,
  };
  var table = $("#lichsu");
  function xulyData(getid, array){
   var html = array.map(function(x){
     return '<tr>' + '<td>' + x.id + '</td>' + '<td>'+ 'nhiệt đô: ' + x.nhietdo + '*C' + '</td>' +'<td>' + 'độ ẩm: ' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '</tr>';
   })
  var htmljoin = html.join('');
  getid.html(html);
  }
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
  socket.on("hmm",function(data){
    xulyData(table,data);
    document.getElementById("hitory").innerHTML = data.length;
  })
  /////////////////////////////////////////////
  socket.on("dulieu", function(data){
    //document.getElementById("temp").innerHTML = data["temp"];
    document.getElementById("humi").innerHTML = data["humi"];
    document.getElementById("P").innerHTML = data["P"];
  });
  socket.on("dulieu1", function(data){
    document.getElementById("temp1").innerHTML = data["temp"];
    document.getElementById("humi1").innerHTML = data["humi"];
    document.getElementById("P1").innerHTML = data["P"];
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
