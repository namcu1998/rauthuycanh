const PORT = 3000;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server

var http = require('http');
var express = require('express');							//#include thư viện express - dùng để tạo server http nhanh hơn thư viện http cũ
var socketio = require('socket.io')				//#include thư viện socketio

var ip = require('ip');
var app = express();									//#Khởi tạo một chương trình mạng (app)
var server = http.Server(app)

var io = socketio(server);								//#Phải khởi tạo io sau khi tạo app

var webapp_nsp = io.of('/webapp')				//namespace của webapp

var esp8266_nsp = io.of('/esp8266')				//namespace của esp8266

var middleware = require('socketio-wildcard')();		//Để có thể bắt toàn bộ lệnh!
esp8266_nsp.use(middleware);									//Khi esp8266 emit bất kỳ lệnh gì lên thì sẽ bị bắt
webapp_nsp.use(middleware);									//Khi webapp emit bất kỳ lệnh gì lên thì sẽ bị bắt

server.listen(process.env.PORT || PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
io.on("connection", function(socket){

  socket.on("nam", function(data){

      io.sockets.emit("user","nam");

  })
   console.log(socket.id + "co nguoi ket noi");
   socket.on("mess", function(data){
     console.log(data);
     io.sockets.emit("messe",data);
   })
 })
app.get("/", function(req , res){
  res.render("trangtru");
})
