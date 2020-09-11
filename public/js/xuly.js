const socket = io("https://nhayen.herokuapp.com/nam2351998"); 
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
		var hourStart = parseInt($("#timeStart")[0].value.split(":")[0]);
		var hourStop = parseInt($("#timeStop")[0].value.split(":")[0]);
		if(parseInt($("#setHumiMax")[0].value) == 0 || parseInt($("#setHumiMin")[0].value) == 0 || parseInt($("#setTempMax")[0].value) == 0 || parseInt($("#setTempMin")[0].value) == 0 || $("#timeStart")[0].value == null || $("#timeStop")[0].value == null || array.length == 0){
			alert("chưa nhập đủ dữ liệu")
		}
		else if($("#setHumiMax")[0].value > 95 || $("#setHumiMin")[0].value < 40) alert("độ ẩm quá lớn hoặc quá nhỏ");
		else if($("#setTempMax")[0].value > 60 || $("#setTempMin")[0].value < 0) alert("nhiệt độ quá lớn hoặc quá nhỏ");
		else if(hourStart > hourStop) alert("thời gian bắt đầu phải bé hơn thời gian kết thúc");
		else if($("#setHumiMax")[0].value < $("#setHumiMin")[0].value || $("#setTempMax")[0].value < $("#setTempMin")[0].value) alert ("độ ẩm và nhiệt độ không được min lớn hơn max")
		else if($("#setUpload")[0].value > 60 || $("#setUpload")[0].value < 0) alert("Thời gian phải trong khoảng từ 0 đến 60");
		else{
			data.speakerDay = array;
			data.speakerTimeStart = $("#timeStart")[0].value;
			data.speakerTimeStop = $("#timeStop")[0].value;
			data.setHumi = [$("#setHumiMax")[0].value, $("#setHumiMin")[0].value];
			data.setTemp  = [$("#setTempMax")[0].value, $("#setTempMin")[0].value];
			data.setUpload = $("#setUpload")[0].value;
			socket.emit("ok", data)
		}
	}
	$("#submit").click(() => {
		run();
	})
	socket.on("onMa", (data) => {
		test = 1;
		//document.getElementById("statusEsp").innerHTML = data[3];
		$("#setHumiMax")[0].value = data[1].setHumi[0];
		$("#setHumiMin")[0].value = data[1].setHumi[1];
		$("#setTempMax")[0].value = data[1].setTemp[0];
		$("#setTempMin")[0].value = data[1].setTemp[1];
		$("#timeStop")[0].value = data[1].speakerTimeStop;
		$("#timeStart")[0].value = data[1].speakerTimeStart;
		$("#setUpload")[0].value = data[1].setUpload;
		xulyData("speaker", data[2].speaker);
		xulyData("fanHumi", data[2].fanHumi);
		xulyData("fanTemp", data[2].fanTemp);
		xulyData("fan", data[2].fan);
		data[1].speakerDay.map((item) => {
			let input = document.querySelectorAll("#auto input");
			for(let x = 0 ; x < input.length ; x++){
				if(input[x].value === item){
					input[x].checked = true;
				}
			}
		})
		test = 0;
	})
	socket.on("onMa1", (data) => {
		test = 1;
		xulyData("speaker", data.speaker);
		xulyData("fanHumi", data.fanHumi);
		xulyData("fanTemp", data.fanTemp);
		xulyData("fan", data.fan);
		xulyden(data.speaker, $('#button'));
		xulyden(data.fanHumi, $('#button1'));
		xulyden(data.fanTemp, $('#button2'));
		xulyden(data.fan, $('#button3'));
		test = 0;
	})
	socket.on("statusEsp", (data) => {
		document.getElementById("statusEsp").innerHTML = data;
	})
	if($('#toggle-event-mode').prop('checked') == true){
		$("#controll").show();
		$("#auto").hide();
	}
	else {
		$("#controll").hide();
		$("#auto").show();
	}
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
	$('#button3').change(function() {
		if(test == 0){
			if($(this).prop('checked') == true){
				socket.emit("onden4");
			}
			else {
				socket.emit("offden4");
			}
		}
	});
}); //document
