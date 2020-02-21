var socket = io("https://namcu1998.herokuapp.com")   //("https://namcu1998.herokuapp.com");
$(document).ready(function(){
  $scope.changeLED = function() {
		console.log("send LED ", $scope.leds_status)
		var json = {
			"led": $scope.leds_status
		}
		socket.emit("LED", json)
	} //end
  ////////////////////////////////////////////
  $("#onden").click(function(){
    socket.emit("den1", 'den1on');
  }) //end
  /////////////////////////////////////////////
  $("#offden").click(function(){
    socket.emit("den1", "den1off");
  }) //end
  /////////////////////////////////////////////
}) //document
