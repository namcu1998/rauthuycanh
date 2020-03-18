var socket = io("https://namcu.herokuapp.com");
socket.on("dulieu", function(data){
  document.getElementById("temp").innerHTML = data["time"];
});
