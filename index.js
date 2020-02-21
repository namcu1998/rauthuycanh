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
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.

  //định nghĩa một mảng 1 chiều có 2 phần tử: true, false. Mảng này sẽ được gửi đi nhằm thay đổi sự sáng tắt của 2 con đèn LED đỏ và xanh. Dựa vào cài đặt ở Arduino mà đèn LEd sẽ bị bật hoặc tắt. Hãy thử tăng hoạt giảm số lượng biến của mảng led này xem. Và bạn sẽ hiểu điều kỳ diệu của JSON!
  var json = {
    "led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
  }
   socket.on("mess",function (data) {
           socket.broadcast.emit('LED',data);
   })
   socket.on("den1",function () {
     
           io.sockets.emit('LED',json);
   })
	//Tạo một chu kỳ nhiệm vụ sẽ chạy lại sau mỗi 200ms
	var interval1 = setInterval(function() {
		//đảo trạng thái của mảng led, đảo cho vui để ở Arduino nó nhấp nháy
     //cho vui.
     socket.on("JSON",function(data){
       socket.broadcast.emit("user",data["time"]);
     })



		//Cài đặt chuỗi JSON, tên biến JSON này là json

		//socket.emit('LED', json) //Gửi lệnh LED với các tham số của của chuỗi JSON//Ghi ra console.log là đã gửi lệnh LED
	}, 2000)//200ms

	//Khi socket client bị mất kết nối thì chạy hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra màn hình console cho vui
		//clearInterval(interval1)		//xóa chu kỳ nhiệm vụ đi, chứ không xóa là cái task kia cứ chạy mãi thôi đó!
	})
});
app.get("/", function(req , res){
  res.render("trangtru");
})
