var http = require('http');
var express = require('express');
var socketio = require('socket.io')
const Sequelize = require('sequelize')
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
app.use('/scripts1', express.static(__dirname + '/node_modules/epoch-charting/dist/js/'));
app.use('/scripts2', express.static(__dirname + '/node_modules/epoch-charting/dist/css/'));
server.listen(process.env.PORT || 3000);
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://namcu-1998.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("Nam");
ref.on('child_added', function(snapshot) {
  var message=snapshot.val();
     console.log(message);
});
var ngay = ngay();
function ngay(){
  var date = new Date();
  var day1 = date.getDay()
  switch (day1) {
    case 0:
      return 'thứ hai';
    case 1:
      return 'thứ ba';
    case 2:
      return 'thứ tư';
    case 3:
      return 'thứ năm';
    case 4:
      return 'thứ sáu';
    case 5:
      return 'thứ bảy';
    case 6:
      return 'chủ nhật';
  }
}
function time(){
  var date = new Date();
  var array
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  var hours = date.getHours() + 7
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  array = (ngay + ' ' +  day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds)
  return array;
}
    function fileSave(nhietdo, doam, thoigian){
    var data = JSON.parse(fs.readFileSync('data.json','utf8'))
    function Object(nhietdo, doam, thoigian){
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.thoigian = thoigian;
    }
    if (data.length > 7){
    data.splice(5,1)
    }
    data.unshift(new Object(nhietdo, doam, thoigian))
    var data1 = JSON.stringify(data);
    fs.writeFileSync('data.json',data1);
    }
    function readFile(){
    let data = JSON.parse(fs.readFileSync('data.json','utf8'))
    return data;
    }
    io.on('connection', function(socket) {
    console.log("Connected");
    /////////////////////////////////////////////////////////
    socket.on("onden",function(data){
        socket.broadcast.emit("LED",data);

    });
    socket.on("login",function(data){
      console.log(data);

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
     socket.on("JSON",function(data){
       socket.broadcast.emit("dulieu",data);

     });//onJSON
     socket.on("JSON1",function(data){
       socket.broadcast.emit("dulieu1",data);
       fileSave(data.temp, data.humi, time());
       socket.broadcast.emit("hmm", readFile());
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
