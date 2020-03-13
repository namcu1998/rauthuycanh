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
app.use(express.static("webapp"))
server.listen(process.env.PORT || 3000);
var webapp_nsp = io.of('/webapp')
var esp8266_nsp = io.of('/esp8266')
var middleware = require('socketio-wildcard')();
esp8266_nsp.use(middleware);
webapp_nsp.use(middleware);
const sequelize = new Sequelize('postgres://auwarxalfvloha:0316d7dc9d9e2057e6197f1911a136d9aba1cc414dd08244681a5a3799a990d2@ec2-184-72-236-57.compute-1.amazonaws.com:5432/d9okk5ignv3p1');
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
User.sync({ force: true });
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
