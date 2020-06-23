const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const router = require('./router/home.router')
const database = require('./database/firebase')
const wd = require('./read.database/write.database')
const rd = require('./read.database/read.database')
const chartData = require('./createDataCharts/create.charts')
const time = require('./time/time')
const ma = require("./modeAndDataAuto/create.mode")
const app = express();
const server = http.Server(app);
const io = socketio(server);
const { AwakeHeroku } = require('awake-heroku');
const nsp = io.of('/namcu1998');
const webapp = io.of('/nam2351998');
const middleware = require('socketio-wildcard')();
const mang = {
	led: [0, 0, 1, 1],
};
let scope = 0, scope1 = 0;
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
app.use('/scripts', express.static(__dirname + '/node_modules/d3/'));
app.use('/cssToggle', express.static(__dirname + '/bootstrapToggle/css/'));
app.use('/jsToggle', express.static(__dirname + '/bootstrapToggle/js/'));
app.use(router);
nsp.use(middleware);
webapp.use(middleware);
server.listen(process.env.PORT || 3484);
// database.on('child_added', function(snapshot) {
//   var message=snapshot.val();
//   number = message.id
//   console.log(message)
//   wd(message.temp,message.humi,message.time,message.id)
// });
//http://arduino.esp8266.com/stable/package_esp8266com_index.json
chartData();
function xulyData(data){
	let x = {
		thoigian: data.second,
		nhietdo: data.temp,
		doam: data.humi,
		light: data.light
	}
	return x;
}

AwakeHeroku.add({
	url: "https://bonghoaxinh.herokuapp.com"
})
function loopSync(){
	return new Promise((resolve, reject) => {
		setInterval(() => {
			if(ma.getMode() == 0){
				if(ma.getAuto().speakerDay.indexOf(time.timeDay()) >= 0){
					if(time.time() >= ma.getAuto().speakerTimeStart && time.time() <= ma.getAuto().speakerTimeStop){
						for(scope ; scope < 1 ; scope ++){
							mang.led.splice(0, 1, 1);
							ma.speaker(1);
							nsp.emit("LED", ma.getAll()[2]);
							console.log("ok1")
						}
					}
					else {
						for(scope1 ; scope1 < 1 ; scope1 ++){
							mang.led.splice(0, 1, 0);
							ma.speaker(0);
							nsp.emit("LED", ma.getAll()[2]);
							console.log("ok1")
						}
					}
				}
				else {
					scope = 0;
					scope1 = 0;
				}
			}
		}, 1000)
	})
}
loopSync();
nsp.on('connection', function(socket){
	console.log("esp đã connected");
	socket.on('disconnect', function(){
		console.log("esp đã disconnect");
	})
	socket.on("JSON1",function(data){
		webapp.emit("dulieu1",data);
		wd(data.temp, data.humi, data.light, data.second, data.minute, data.hour, data.thing, data.day, data.month, data.year, data.speak, data.fanHumi);
		webapp.emit("emitChart", xulyData(data));
		webapp.emit("hmm", rd());
		if(ma.getMode() === 0){
			if(data.humi < ma.getAuto().setHumi){
				ma.fanHumi(1);
				nsp.emit("LED", ma.getAll()[2]);
				console.log("ok2")
			}
			else {
				ma.fanHumi(0);
				nsp.emit("LED", ma.getAll()[2]);
			}
		}
	});
})
webapp.on('connection', function(socket){
	console.log("webapp đã connected");
	socket.on('disconnect', function(){
		console.log("webapp đã disconnect");
	})
	socket.on("onden1", () => {
		ma.speaker(1);
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("offden1", () => {
		ma.speaker(0);
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("onden2", () => {
		ma.fanHumi(1);
	 	nsp.emit("LED", ma.getAll()[2]);		
	})
	socket.on("offden2", () => {
		ma.fanHumi(0);
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("onden1", () => {
		ma.speaker(1);
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("getData", () => {
		webapp.emit("hmm", rd());
	})
	socket.on("getDataCharts", () => {
		webapp.emit("onCharts", chartData());
	})
	socket.on("getMa", () => {
		console.log("ok")
		webapp.emit("onMa", ma.getAll());
	})
	// dữ liệu cảm biến
	socket.on("ok", (data) => {
		ma.saveAuto(data);
		scope = 0;
		scope1 = 0;
		console.log("ok3")
	})
	socket.on("mode",(data) => {
		ma.saveMode(data);
		scope = 0;
		scope1 = 0;
		if(data == 0) {
			ma.fanHumi(0);
			ma.speaker(0);
		}
		else webapp.emit("onMa1", ma.getAll()[2]);
		console.log("mode");
	})
	socket.on("onden", (data) => {
		ma.fanHumi(data.led[0]);
		ma.speaker(data.led[1]);
		console.log("btnOk")
		console.log(data)
	})
});
