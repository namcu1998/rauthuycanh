const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const router = require('./router/home.router')
const authRouter = require('./router/auth.router')
const wd = require('./read.database/write.database')
const rd = require('./read.database/read.database')
const chartData = require('./createDataCharts/create.charts')
const Auth = require('./controllers/auth.controller')
const time = require('./time/time')
const ma = require("./modeAndDataAuto/create.mode")
const bodyParser = require('body-parser')
const app = express();
const server = http.Server(app);
const io = socketio(server);
const { AwakeHeroku } = require('awake-heroku');
const nsp = io.of('/namcu1998');
const webapp = io.of('/nam2351998');
const middleware = require('socketio-wildcard')();
const cookieParser = require('cookie-parser');
const { use } = require('./router/home.router');
let scope = 0, scope1 = 0, scope2 = 0;
let array = [];
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
app.use('/scripts', express.static(__dirname + '/node_modules/d3/'));
app.use('/cssToggle', express.static(__dirname + '/bootstrapToggle/css/'));
app.use('/jsToggle', express.static(__dirname + '/bootstrapToggle/js/'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
nsp.use(middleware);
app.use(cookieParser())
webapp.use(middleware);
server.listen(process.env.PORT || 3484);
chartData();
function xulyData(second, temp, humi, light){
	let x = {
		thoigian: second,
		nhietdo: temp,
		doam: humi,
		light: light
	}
	return x;
}
AwakeHeroku.add({
	url: "https://bonghoaxinh.herokuapp.com"
})
function loopSync(){
	var timeConnect = 0;
	return new Promise((resolve, reject) => {
		setInterval(() => {
			timeConnect++;
			if(ma.getMode() == 0){
				if(ma.getAuto().speakerDay.indexOf(time.timeDay()[0]) >= 0){
					if(time.time() >= ma.getAuto().speakerTimeStart && time.time() <= ma.getAuto().speakerTimeStop){
						for(scope ; scope < 1 ; scope ++){
							ma.speaker(1);
							nsp.emit("LED", ma.getAll()[2]);
							webapp.emit("onMa1", ma.getAll()[2]);
						}
					}
					else {
						for(scope1 ; scope1 < 1 ; scope1 ++){
							ma.speaker(0);
							nsp.emit("LED", ma.getAll()[2]);
							webapp.emit("onMa1", ma.getAll()[2]);
						}
					}
				}
				else {
					scope = 0;
					scope1 = 0;
				}
			}
			if(timeConnect === 15){
				nsp.emit("ping", "nam");
				timeConnect = 0;
			}
			if((time.timeDay()[1][2] === 0 || time.timeDay()[1][2] % 15 === 0) && ma.getAll()[3] === "esp connected"){
				scope2 = time.timeDay()[1][2];
				//(time.timeDay()[1][2] == 0 || time.timeDay()[1][2] == 15 || time.timeDay()[1][2] == 30 || time.timeDay()[1][2] == 45) && array.length === 5
				chartData();
				wd(array[0], array[1], array[2], time.timeDay()[1][2], time.timeDay()[1][1], time.timeDay()[1][0], time.timeDay()[0], time.timeDay()[2][0], time.timeDay()[2][1], time.timeDay()[2][2], array[3], array[4]);
				webapp.emit("emitChart", xulyData(time.getTime(), array[0], array[1], array[2]));
				webapp.emit("hmm", rd());
			}
			if(ma.getAll()[2].speak == array[3] && ma.getAll()[2].fanHumi == array[3]) {}
			else {
				nsp.emit("LED", ma.getAll()[2]);
			}
		}, 1000)
	})
}
loopSync();
nsp.on('connection', function(socket){
	ma.statusEsp("esp connected");
	webapp.emit("statusEsp", ma.getAll()[3]);
	nsp.emit("statusEsp", ma.getAll()[2]);
	socket.on('disconnect', function(){
		ma.statusEsp("esp disconnect");
		webapp.emit("statusEsp", ma.getAll()[3]);
		console.log(time.getTime());
	})
	socket.on("JSON1",function(data){
		array = [data.temp, data.humi, data.light, data.speak, data.fanHumi];
		if(ma.getMode() === 0){
			if(data.humi < ma.getAuto().setHumi){
				ma.fanHumi(1);
				nsp.emit("LED", ma.getAll()[2]);
				webapp.emit("onMa1", ma.getAll()[2]);
			}
			else {
				ma.fanHumi(0);
				nsp.emit("LED", ma.getAll()[2]);
				webapp.emit("onMa1", ma.getAll()[2]);
			}
			if(data.temp > ma.getAuto().setTemp){
				ma.fanTemp(1);
				nsp.emit("LED", ma.getAll()[2]);
				webapp.emit("onMa1", ma.getAll()[2]);
			}
			else {
				ma.fanTemp(0);
				nsp.emit("LED", ma.getAll()[2]);
				webapp.emit("onMa1", ma.getAll()[2]);
			}
		}
	});
})
webapp.on('connection', function(socket){
	//("webapp đã connected");
	socket.on('disconnect', function(){
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
	socket.on("onden3", () => {
		ma.fanTemp(1);
		nsp.emit("LED", ma.getAll()[2]);		
	})
	socket.on("offden3", () => {
		ma.fanTemp(0);
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("getData", () => {
		webapp.emit("hmm", rd());
	})
	socket.on("getDataCharts", () => {
		webapp.emit("onCharts", chartData());
	})
	socket.on("getMa", () => {
		webapp.emit("onMa", ma.getAll());
	})
	// dữ liệu cảm biến
	socket.on("ok", (data) => {
		ma.saveAuto(data);
		scope = 0;
		scope1 = 0;
	})
	socket.on("mode",(data) => {
		ma.saveMode(data);
		scope = 0;
		scope1 = 0;
		if(data == 0) {
			// ma.fanHumi(0);
			// ma.speaker(0);
		}
		else webapp.emit("onMa1", ma.getAll()[2]);
	})
});
app.use('/home', Auth.SetCookie, router);
app.use('/auth', authRouter);
app.get('/', function(req, res){
	res.render('home/gioithieu')
})