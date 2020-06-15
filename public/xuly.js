const socket = io("http://localhost:3484/nam2351998", );
$(document).ready(function(){
	socket.emit("getled");
	var led = [1,1,1,1];
	var mang = {
		"led":led,
	};

	function xulyden(item1, item2){
	if(item1 == 0){
		item2.bootstrapToggle('on');
	}
	else item2.bootstrapToggle('off');
	}

	socket.on("led", function(data){
		led.splice(0,1,data["den1"]);
		led.splice(1,1,data["den2"]);
		led.splice(2,1,data["den3"]);
		led.splice(3,1,data["den4"]);
		xulyden(led[0],$('#toggle-event'))
		xulyden(led[1],$('#toggle-event1'))
		xulyden(led[2],$('#toggle-event2'))
		xulyden(led[3],$('#toggle-event3'))
	});

	$('#toggle-event').change(function() {
		if($(this).prop('checked') == true){
			led.splice(0,1,0);
			socket.emit("onden",mang);
		}
		else {
			led.splice(0,1,1);
			socket.emit("onden",mang);
		}
	});

	$('#toggle-event1').change(function() {
		if($(this).prop('checked') == true){
			led.splice(1,1,0);
			socket.emit("onden",mang);
		}
		else {
			led.splice(1,1,1);
			socket.emit("onden",mang);
		}
	});

	$('#toggle-event2').change(function() {
		if($(this).prop('checked') == true){
			led.splice(2,1,0);
			socket.emit("onden",mang);
		}
		else {
			led.splice(2,1,1);
			socket.emit("onden",mang);
		}
	});

	$('#toggle-event3').change(function() {
		if($(this).prop('checked') == true){
			led.splice(3,1,0);
			socket.emit("onden",mang);
		}
		else {
			led.splice(3,1,1);
			socket.emit("onden",mang);
		}
	});

}); //document
