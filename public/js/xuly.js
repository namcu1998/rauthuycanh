const socket = io("http://localhost:3484/nam2351998"); //http://nam2351998.herokuapp.com/nam2351998
$(document).ready(function(){
	socket.emit("getMa");
	var led = [1,1,1,1];
	var mode
	var mang = {
		"led":led,
	};
	function run(){
		let data = {}
		let array = [];
		let input = document.querySelectorAll("#auto input");
		for(let x = 0 ; x < input.length ; x++){
			if(input[x].checked === true){
				array.push(input[x].value);
			}
		}
		if(parseInt($("#setHumi")[0].value) == 0 || $("#timeStart")[0].value == null || $("#timeStop")[0].value == null || array.length == 0){
			alert("chưa nhập đủ dữ liệu")
		}
		else{
			data.speakerDay = array;
			data.speakerTimeStart = $("#timeStart")[0].value;
			data.speakerTimeStop = $("#timeStop")[0].value;
			data.setHumi = $("#setHumi")[0].value;
			socket.emit("ok", data)
		}
	}
	$("#submit").click(() => {
		run();
	});
	socket.on("onMa", (data) => {
		if(data[0] == 1){
			$('#toggle-event-mode').bootstrapToggle('on');
		}
		else $('#toggle-event-mode').bootstrapToggle('off');
		$("#setHumi")[0].value = data[1].setHumi;
		$("#timeStop")[0].value = data[1].speakerTimeStop;
		$("#timeStart")[0].value = data[1].speakerTimeStart;
		data[1].speakerDay.map((item) => {
			let input = document.querySelectorAll("#auto input");
			for(let x = 0 ; x < input.length ; x++){
			if(input[x].value === item){
				input[x].checked = true;
			}
		}
		})
	})
	$('#toggle-event-mode').change(function() {
		if($(this).prop('checked') == true){
			$("#controll").show();
			$("#auto").hide();
			socket.emit("mode", 1)
		}
		else {
			$("#controll").hide();
			$("#auto").show();
			socket.emit("mode", 0)
		}
	});

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
