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
    function fileSave(nhietdo, doam, thoigian){
    var data = JSON.parse(fs.readFileSync('data.json','utf8'))
    function Object(nhietdo, doam, thoigian){
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.thoigian = thoigian;
    }
    if (data.length > 5){
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
       fileSave(data.temp,data.humi,Date());
       socket.emit("hmm","test");
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
