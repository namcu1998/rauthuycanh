var http = require('http');
var express = require('express');
var socketio = require('socket.io')
const Sequelize = require('sequelize')
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

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://namcu-87298.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("null");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
  var database;
var nhietdo = ref.child("temp");
var doam  = ref.child("humi");
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
       //nhietdo.push(data["time"]);
       //doam.push(data["time1"]);
     });//onJSON
     socket.on("JSON1",function(data){
       socket.broadcast.emit("dulieu1",data);

     });//onJSON
     //nhận dữ liệu từ esp
    //////////////////////////////////////////////////////////
  	socket.on('disconnect', function() {
		console.log("disconnect");
    });//disconnect
    }); //connected
    app.get("/", function(req , res){
    res.render("trangtru");
   }) //home
