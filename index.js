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
	url: "https://nhayen.herokuapp.com"
})
function loopSync(){
	var timeConnect = 0;
	return new Promise((resolve, reject) => {
		setInterval(() => {
			timeConnect++;
			if(ma.getMode() == 0){
				if(ma.getAuto().speakerDay.indexOf(time.timeDay()[0]) >= 0){
					if(time.time() >= ma.getAuto().speakerTimeStart && time.time() <= ma.getAuto().speakerTimeStop && array[3] != 1){
						ma.speaker(1);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						webapp.emit("hmm", rd());
					}
					if((time.time() < ma.getAuto().speakerTimeStart || time.time() > ma.getAuto().speakerTimeStop) && array[3] != 0){
						ma.speaker(0);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						webapp.emit("hmm", rd());
					}
				}
			}
			if(timeConnect === 15){
				nsp.emit("ping", "nam");
				timeConnect = 0;
			}
			if((time.timeDay()[1][2] === 0 || time.timeDay()[1][2] % ma.getAuto().setUpload === 0) && ma.getAll()[3] === "ESP Connected"){
				//scope2 = time.timeDay()[1][2];
				if(ma.getMode() === 0){
					if(array[1] < ma.getAuto().setHumi[1] && array[4] != 1){
						ma.fanHumi(1);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						console.log("bat humi")
						webapp.emit("hmm", rd());
					}
					if(array[1] >= ma.getAuto().setHumi[0] && array[4] != 0){
						ma.fanHumi(0);W
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						console.log("bat humi")
						webapp.emit("hmm", rd());
					}
					//--------------------------------------------------------------//
					if((array[1] > ma.getAuto().setHumi[0] || array[0] > ma.getAuto().setTemp[0]) && (array[7]) != 1){
						ma.fan(1);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						console.log("bat fan")
						webapp.emit("hmm", rd());
					}
					if((array[1] < ma.getAuto().setHumi[0] && array[0] < ma.getAuto().setTemp[0]) && (array[7]) != 0){
						ma.fan(0);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						console.log("bat fan")
						webapp.emit("hmm", rd());
					}
					//--------------------------------------------------------------//
					if(array[0] < ma.getAuto().setTemp[1] && array[6] != 1){
						ma.fanTemp(1);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						webapp.emit("hmm", rd());
					}
					if(array[0] >= ma.getAuto().setTemp[0] && array[6] != 0){
						ma.fanTemp(0);
						nsp.emit("LED", ma.getAll()[2]);
						webapp.emit("onMa1", ma.getAll()[2]);
						webapp.emit("hmm", rd());
					}
				}
				chartData();
				wd(array[0], array[1], array[2], time.timeDay()[1][2], time.timeDay()[1][1], time.timeDay()[1][0], time.timeDay()[0], time.timeDay()[2][0], time.timeDay()[2][1], time.timeDay()[2][2], array[3], array[4], array[6], array[7]);
				webapp.emit("emitChart", xulyData(time.getTime(), array[0], array[1], array[2]));
				webapp.emit("hmm", rd());
			}
			if(ma.getAll()[2].speaker == array[3] && ma.getAll()[2].fanHumi == array[4] && ma.getAll()[2].fanTemp == array[6] && ma.getAll()[2].fan == array[7]) {
			}
			else {
				nsp.emit("LED", ma.getAll()[2]);
			}
			if(array[5] === "1") {
				ma.statusEsp("ESP Connected");
			}
		}, 1000)
	})
}
loopSync();
nsp.on('connection', function(socket){
	ma.statusEsp("ESP Connected");
	webapp.emit("statusEsp", ma.getAll()[3]);
	nsp.emit("statusEsp", ma.getAll()[2]);
	socket.on('disconnect', function(){
		ma.statusEsp("ESP Disconnect");
		array[5] = 0;
		webapp.emit("statusEsp", ma.getAll()[3]);
		console.log(time.getTime());
	})
	socket.on("JSON1",function(data){
		array = [data.temp, data.humi, data.light, data.speak, data.fanHumi, data.statusEsp, data.fanTemp, data.fan];
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
	socket.on("onden4", () => {
		ma.fan(1);
		nsp.emit("LED", ma.getAll()[2]);
		console.log("fanOn")		
	})
	socket.on("offden4", () => {
		ma.fan(0);
		nsp.emit("LED", ma.getAll()[2]);
		console.log("fanOff")
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
		ma.setUpload(data.setUpload)
		console.log(data)
		scope = 0;
		scope1 = 0;
		nsp.emit("LED", ma.getAll()[2]);
	})
	socket.on("mode",(data) => {
		ma.saveMode(data);
		scope = 0;
		scope1 = 0;
		if(data == 0) {
		}
		else webapp.emit("onMa1", ma.getAll()[2]);
	})
});
app.use('/home', Auth.SetCookie, router);
app.use('/auth', authRouter);
app.get('/', function(req, res){
	res.render('home/gioithieu')
})