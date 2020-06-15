const socket = io("http:localhost:3484/nam2351998");
$(document).ready(function(){
    socket.emit("getData");
    socket.on("hmm",function(data){
        document.getElementById("temp1").innerHTML = data[0].nhietdo;
        document.getElementById("humi1").innerHTML = data[0].doam;
	});
}); //document
