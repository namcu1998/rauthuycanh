const socket = io("http://192.168.1.5:3484");
const table = $("#lich");
function xulyData(getid, array){
	var html = array.map(function(x){
		return '<tr>' + '<td>' + x.light + '</td>' + '<td>'+ 'nhiệt đô: ' + x.nhietdo + '*C' + '</td>' +'<td>' + 'độ ẩm: ' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '</tr>';
	});
	var htmljoin = html.join('');
	$("#lich").html(htmljoin);
}
$(document).ready(function(){
	socket.emit("getData");
	socket.on("hmm",function(data){
		xulyData(table,data);
	});
}); //document
