const socket = io("http://192.168.1.5:3484");
$(document).ready(function(){
    socket.on("hmm",function(data){
        document.getElementById("temp1").innerHTML = data[0].nhietdo;
        document.getElementById("humi1").innerHTML = data[0].doam;
	});
}); //document
