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
  var interval1 = setInterval(function() {
		//đảo trạng thái của mảng led, đảo cho vui để ở Arduino nó nhấp nháy cho vui.
		for (var i = 0; i < led.length; i++) {
			led[i] = !led[i]
		}

		//Cài đặt chuỗi JSON, tên biến JSON này là json
		var json = {
			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
		}
		socket.emit('LED', json) //Gửi lệnh LED với các tham số của của chuỗi JSON//Ghi ra console.log là đã gửi lệnh LED
	}, 200)//200ms
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
