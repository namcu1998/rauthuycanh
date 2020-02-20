var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server)
server.listen(process.env.PORT || 3000); //process.env.PORT ||
io.on("connection", function(socket){
  socket.on("name", function(data){
    if(data = '1'){
      io.sockets.emit("user",socket.id);
    }
  })
   console.log(socket.id + "co nguoi ket noi");
   socket.on("mess", function(data){
     console.log(data);
     io.sockets.emit("messe",data);
   })
 })
app.get("/", function(req , res){
  res.render("trangtru");
})
