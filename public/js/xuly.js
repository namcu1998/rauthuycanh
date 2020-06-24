const socket = io("https://bonghoaxinh.herokuapp.com/nam2351998"); //http://nam2351998.herokuapp.com/nam2351998
let test = 0;
function xulyden(item1, item2){
	if(item1 == 1){
		item2.bootstrapToggle('on');
	}
	else item2.bootstrapToggle('off');
}
function xulyData(item1, item2){
	if(item2 == 1){
		document.getElementById(item1).innerHTML = "ON";
	}
	else document.getElementById(item1).innerHTML = "OFF";
}

$(document).ready(function(){
	socket.emit("getMa");
	function run(){
		let data = {}
		let array = [];
		let input = document.querySelectorAll("#auto input");
		for(let x = 0 ; x < input.length ; x++){
			if(input[x].checked === true){
				array.push(input[x].value);
			}
		}
		var hourStart = $("#timeStart")[0].value.split(":")[0];
		var hourStop = $("#timeStop")[0].value.split(":")[0];
		if(parseInt($("#setHumi")[0].value) == 0 || $("#timeStart")[0].value == null || $("#timeStop")[0].value == null || array.length == 0){
			alert("chưa nhập đủ dữ liệu")
		}
		else if($("#setHumi")[0].value > 95 || $("#setHumi")[0].value < 40) alert("độ ẩm quá lớn hoặc quá nhỏ");
		else if($("#setTemp")[0].value > 60 || $("#setTemp")[0].value < 0) alert("nhiệt độ quá lớn hoặc quá nhỏ");
		else if(parseInt(hourStart[]) < parseInt(hourStop[])) alert("thời gian bắt đầu phải bé hơn thời gian kết thúc")
		else{
			data.speakerDay = array;
			data.speakerTimeStart = $("#timeStart")[0].value;
			data.speakerTimeStop = $("#timeStop")[0].value;
			data.setHumi = $("#setHumi")[0].value;
			data.setTemp  = $("#setTemp")[0].value;
			socket.emit("ok", data)
		}
	}
	$("#submit").click(() => {
		run();
	})
	socket.on("onMa", (data) => {
		test = 1;
		document.getElementById("statusEsp").innerHTML = data[3];
		xulyData("speaker", data[2].speaker);
		xulyData("fanHumi", data[2].fanHumi);
		xulyData("fanTemp", data[2].fanTemp);
		$("#setHumi")[0].value = data[1].setHumi;
		$("#setTemp")[0].value = data[1].setTemp;
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
		if(data[0] == 1){
			xulyden(data[2].speaker, $('#button'));
			xulyden(data[2].fanHumi, $('#button1'));
			$('#toggle-event-mode').prop('checked', true).change();
		}
		else {
			$('#toggle-event-mode').prop('checked', false).change();
		}	
		test = 0;
	})
	socket.on("onMa1", (data) => {
		test = 1;
		xulyData("speaker", data.speaker);
		xulyData("fanHumi", data.fanHumi);
		xulyData("fanTemp", data.fanTemp);
		xulyden(data.fanHumi, $('#button1'));
		xulyden(data.speaker, $('#button'));
		test = 0;
	})
	socket.on("statusEsp", (data) => {
		document.getElementById("statusEsp").innerHTML = data;
	})
	$('#toggle-event-mode').change(function() {
			if($(this).prop('checked') == true){
				$("#controll").show();
				$("#auto").hide();
				socket.emit("mode", 1);
			}
			else {
				$("#controll").hide();
				$("#auto").show();
				socket.emit("mode", 0);
			}
	});
	$('#button').change(function() {
		if(test == 0){
			if($(this).prop('checked') == true){
				socket.emit("onden1");
			}
			else {
				socket.emit("offden1");
			}
		}
	});
	$('#button1').change(function() {
		if(test == 0){
			if($(this).prop('checked') == true){
				socket.emit("onden2");
			}
			else {
				socket.emit("offden2");
			}
		}
	});
	$('#button2').change(function() {
		if(test == 0){
			if($(this).prop('checked') == true){
				socket.emit("onden3");
			}
			else {
				socket.emit("offden3");
			}
		}
	});
}); //document
