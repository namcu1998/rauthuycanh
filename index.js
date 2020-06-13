const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const router = require('./router/home.router')
const database = require('./database/firebase')
const wd = require('./read.database/write.database')
const rd = require('./read.database/read.database')
const chartData = require('./createDataCharts/create.charts')
const app = express();
const server = http.Server(app);
const io = socketio(server);
const { AwakeHeroku } = require('awake-heroku');
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
app.use('/scripts', express.static(__dirname + '/node_modules/d3/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use(router)
server.listen(process.env.PORT || 3484);

// database.on('child_added', function(snapshot) {
//   var message=snapshot.val();
//   number = message.id
//   console.log(message)
//   wd(message.temp,message.humi,message.time,message.id)
// });

AwakeHeroku.add({
	url: "https://namcu.herokuapp.com"
})

AwakeHeroku.add({
	url: "https://nam2351998.herokuapp.com"
})

io.on('connection', function(socket) {
	console.log("Connected");
	socket.on("getData", () => {
		socket.emit("hmm", rd());
	})
	socket.on("getDataCharts", () => {
		socket.emit("onCharts", chartData);
	})
	socket.on("onden",function(data){
		socket.broadcast.emit("LED",data);
		console.log('ok')
	});
	socket.on("getled", function(){
		socket.broadcast.emit("GETLED","nam");
	})
	socket.on("REQUESTLED", function(data){
		socket.broadcast.emit("led", data);
	})
	socket.on("data",function(){
		console.log("đã nhận");
	})
	socket.on("JSON",function(data){
			socket.broadcast.emit("dulieu",data);
	});
	socket.on("JSON1",function(data){
		socket.broadcast.emit("dulieu1",data);
		wd(data.temp, data.humi, data.light, data.second, data.minute, data.hour, data.thing, data.day, data.month, data.year);
		socket.broadcast.emit("hmm", rd());
		socket.broadcast.emit("onCharts", chartData);
	});
	socket.on('disconnect', function() {
		console.log("disconnect");
	});
});
