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
const sequelize = new Sequelize('postgres://adgpdflvgblfqw:418d40a84f7b4454ba6dadcb7a5f914c7f4e64920ab97c2d70d87b7adb003cb7@ec2-23-22-156-110.compute-1.amazonaws.com:5432/db0l7ifb9r7gc9');
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
const User = sequelize.define('user', {
// attributes
firstName: {
type: Sequelize.STRING,
allowNull: false
},
lastName: {
type: Sequelize.STRING
// allowNull defaults to true
}
}, {
// options
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
