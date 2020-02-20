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

io.on("connection", function(socket){
console.log(socket.id + "co nguoi ket noi");
  socket.on("name", function(data){
   if(data == '1'){
       io.sockets.emit("user",socket.id);
   }
  })
   socket.on("JSON", function(data){
      io.sockets.emit("user","da ket noi");
   })
   socket.on("mess", function(data){
     console.log(data);
     io.sockets.emit("messe",data);
   })
 })
app.get("/", function(req , res){
  res.render("trangtru");
})
