var socket = io("https://namcu1998.herokuapp.com")   //("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  $scope.changeLED = function() {
		console.log("send LED ", $scope.leds_status)

		var json = {
			"led": $scope.leds_status
		}
		mySocket.emit("LED", json)
	}
  $("#onden").click(function(){
    socket.emit("den1", 'den1on');
  })
  $("#offden").click(function(){
    socket.emit("den1", "den1off");
  })
   socket.emit("name","1");
  $("#button").click(function(){
    socket.emit("mess", $("#nhap").val());
  })
  socket.on("messe",function(data){
    $("#messe").html(data);
    console.log(data);
  })
  socket.on("user",function(data){
    $("#user").append("<div class ='text'>" + data + "</div>");
  })

  })
