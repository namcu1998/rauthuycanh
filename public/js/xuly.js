const socket = io("http://nam2351998.herokuapp.com/nam2351998"); //http://nam2351998.herokuapp.com/nam2351998
let test = 0;
function xulyden(item1, item2){
	if(item1 == 1){
		item2.bootstrapToggle('on');
	}
	else item2.bootstrapToggle('off');
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
	})
	socket.on("onMa", (data) => {
		test = 1;
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
		xulyden(data.fanHumi, $('#button1'));
		xulyden(data.speaker, $('#button'));
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
				led.splice(1, 1, 0);
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
}); //document
