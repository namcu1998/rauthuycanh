const socket = io("http://nam2351998.herokuapp.com/");
const table = $("#lich");
function xulyData(getid, array){
	var html = array.map(function(x){
		return '<tr>' + '<td>' + x.id + '</td>' + '<td>' + x.light+ '</td>' + '<td>'+ 'nhiệt đô: ' + x.nhietdo + '*C' + '</td>' +'<td>' + 'độ ẩm: ' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '</tr>';
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
