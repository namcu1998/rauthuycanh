var http = require('http');
var express = require('express');
var socketio = require('socket.io')
const Sequelize = require('sequelize')
var moment = require('moment-timezone')
var fs  = require('fs')
var ip = require('ip');
var app = express();
var server = http.Server(app);
var io = socketio(server);
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("webapp"));
app.use('/scripts', express.static(__dirname + '/node_modules/d3/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/js', express.static(__dirname + '/js/'));
server.listen(process.env.PORT || 3000);
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://namcu-1998.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("Nam");
var number = 0;
    function fileSave(nhietdo, doam, thoigian){
    var data = JSON.parse(fs.readFileSync('data.json','utf8'))
    function Object(nhietdo, doam, thoigian, id){
    this.id = id;
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.thoigian = thoigian;
    }
    number = number + 1;
    if(data.length > 49){
      data.splice(49,1);
    }
    console.log(data.length)
    data.unshift(new Object(nhietdo, doam, thoigian, number))
    var data1 = JSON.stringify(data);
    fs.writeFileSync('data.json',data1);
    }
    function readFile(){
    let data = JSON.parse(fs.readFileSync('data.json','utf8'))
    return data;
    }
    function time(){
  var ngay
  var day = moment().tz("Asia/Ho_Chi_Minh").format('dddd');
  switch(day){
    case 'Monday':
      ngay = 'thứ hai'
      break;
    case 'Tuesday':
      ngay = 'thứ ba'
      break;
    case 'Wednesday':
      ngay = 'thứ tư'
      break;
    case 'Thursday':
      ngay = 'thứ năm'
      break;
    case 'Friday':
      ngay = 'thứ sáu'
      break;
    case 'Saturday':
      ngay = 'thứ bảy'
      break;
    case 'Sunday':
      ngay = 'chủ nhật'
      break;
  }
  var date = moment().tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY');
  var time = moment().tz("Asia/Ho_Chi_Minh").format('LTS');
  return ngay + ' ' + date + ' ' + time;
}
ref.on('child_added', function(snapshot) {
  var message=snapshot.val();
  console.log(message)
  fileSave(message.temp,message.humi,message.time)
});
    io.on('connection', function(socket) {
    console.log("Connected");
    /////////////////////////////////////////////////////////
    socket.on("onden",function(data){
        socket.broadcast.emit("LED",data);
    });
    socket.on("login",function(data){

      if(data["datauser"][0] == 'bonghoaxinh'&& data["datauser"][1] == 'nam2351998')
      {
        console.log("user true");
        socket.emit("logintrue");
      }
      else {
        socket.emit("loginfail");
      }
    });
    ///////////////////////////////////////////////////////////
    socket.on("data",function(){
      socket.emit("hmm", readFile());
      console.log("đã nhận");
    })
     socket.on("JSON",function(data){
       socket.broadcast.emit("dulieu",data);
     });//onJSON
     socket.on("JSON1",function(data){
       data.time = time();
       socket.broadcast.emit("dulieu1",data);
       socket.broadcast.emit("hmm", readFile());
       console.log(data)
     });//onJSON
     //nhận dữ liệu từ esp
    //////////////////////////////////////////////////////////
  	socket.on('disconnect', function() {
		console.log("disconnect");
    });//disconnect
    }); //connected
    app.get("/", function(req , res){
    res.render("trangtru");
  }); //home
   app.get("/charts", function(req , res){
   res.render("charts");
 });
 app.get("/lichsu", function(req , res){
 res.render("lichsu");
 });
