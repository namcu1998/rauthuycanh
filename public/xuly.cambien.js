const socket = io("http://nam2351998.herokuapp.com/");
$(document).ready(function(){
    socket.on("hmm",function(data){
        document.getElementById("temp1").innerHTML = data[0].nhietdo;
        document.getElementById("humi1").innerHTML = data[0].doam;
	});
}); //document
