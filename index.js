var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server)
server.listen(process.env.PORT || 3000); //process.env.PORT ||
var webapp_nsp = io.of('/webapp')				//namespace của webapp
var esp8266_nsp = io.of('/esp8266')
var middleware = require('socketio-wildcard')();		//Để có thể bắt toàn bộ lệnh!
esp8266_nsp.use(middleware);									//Khi esp8266 emit bất kỳ lệnh gì lên thì sẽ bị bắt
webapp_nsp.use(middleware);
io.on("connection", function(socket){
  
  socket.on("name", function(data){
    if(data = '1'){
      io.sockets.emit("user",socket.id);
    }
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
