const socket = io("http://localhost:3484/nam2351998");
const table = $("#lich");
function xulyData(getid, array){
	var html = array.map(function(x){
		return '<tr>' + '<td>' + x.id + '</td>' + '<td>' + x.light + "lx" + '</td>' + '<td>'+ 'nhiệt đô: ' + x.nhietdo + '*C' + '</td>' +'<td>' + 'độ ẩm: ' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '</tr>';
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
