var socket = io("https://namcu.herokuapp.com");
socket.on("dulieu", function(data){
  document.getElementById("#mychart1").innerHTML = data["time"];
});
