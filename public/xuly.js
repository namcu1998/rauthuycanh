const socket = io("https://nam2351998.herokuapp.com");
const table = $("#lich");
function neu(data){
	var a;
	if(data == 0) a = "bật";
	else a ="tắt";
	return  a;
}
function xulyData(getid, array){
	var html = array.map(function(x){
		return '<tr>' + '<td>' + x.id + '</td>' + '<td>'+ 'nhiệt đô: ' + x.nhietdo + '*C' + '</td>' +'<td>' + 'độ ẩm: ' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '</tr>';
	});
	var htmljoin = html.join('');
	$("#lich").html(htmljoin);
}
$(document).ready(function(){
	socket.emit("data");
	socket.emit("getled");
	socket.emit("getData");
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

	socket.on("hmm",function(data){
		xulyData(table,data);
		document.getElementById("hitory").innerHTML = data.length;
	});

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

	socket.on("dulieu", function(data){
		document.getElementById("temp").innerHTML = data["temp"];
		document.getElementById("humi").innerHTML = data["humi"];
	});

	socket.on("dulieu1", function(data){
		document.getElementById("temp1").innerHTML = data["temp"];
		document.getElementById("humi1").innerHTML = data["humi"];
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
