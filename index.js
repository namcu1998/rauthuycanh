var http = require('http');
var express = require('express');							//#include thư viện express - dùng để tạo server http nhanh hơn thư viện http cũ
var socketio = require('socket.io')				//#include thư viện socketio

var ip = require('ip');
var app = express();									//#Khởi tạo một chương trình mạng (app)
var server = http.Server(app)

var io = socketio(server);
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");			// Có thể truy cập các file trong node_modules/angular-socket-io từ xa
app.use(express.static("webapp"))
server.listen(process.env.PORT || 3000); //process.env.PORT ||
var webapp_nsp = io.of('/webapp')				//namespace của webapp
var esp8266_nsp = io.of('/esp8266')				//namespace của esp8266
var middleware = require('socketio-wildcard')();		//Để có thể bắt toàn bộ lệnh!
esp8266_nsp.use(middleware);									//Khi esp8266 emit bất kỳ lệnh gì lên thì sẽ bị bắt
webapp_nsp.use(middleware);
    io.on('connection', function(socket) {
    console.log("Connected");
   var data = 1;
   var data1 = 1;
    var led = [data,data1]
    var mang = {
      "led":led,
    }
    socket.on("JSON", function(packet){
     socket.broadcast.emit("user",packet);
    if(packet["den1"] == 1){
      led.splice(0,1,'1');
    }
    else led.splice(0,1,'0');
    if(packet["den2"] == 1){
      led.splice(1,1,'1');
    }
    else led.splice(1,1,'0');
   });
    socket.on("offden", function(){
      led.splice(0,1,'1');
      socket.broadcast.emit("LED",mang);
    });
    socket.on("den1on", function(){
     led.splice(0,1,'0');
      socket.broadcast.emit("LED",mang);
    });
    socket.on("onden1", function(){
     led.splice(1,1,'0');
      socket.broadcast.emit("LED",mang);
    });
    socket.on("offden1", function(){
     led.splice(1,1,'1');
      socket.broadcast.emit("LED",mang);
    });


	socket.on('disconnect', function() {
		console.log("disconnect")
	});
});
app.get("/", function(req , res){
  res.render("trangtru");
}) //home
