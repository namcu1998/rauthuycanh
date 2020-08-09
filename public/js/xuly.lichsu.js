const socket = io("https://bonghoaxinh.herokuapp.com/nam2351998"); //https://bonghoaxinh.herokuapp.com/nam2351998
const table = $("#lich");
function xulyData(getid, array){
	var html = array.map(function(x){
		return '<tr>' + '<td>' + x.light + "lx" + '</td>' + '<td>' + x.nhietdo + '*C' + '</td>' +'<td>' + x.doam + '%' +  '</td>' + '<td>' + x.thoigian + '</td>' + '<td>' + x.fanHumi + '</td>' + '<td>' + x.speaker + '</td>' + '</tr>';
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
