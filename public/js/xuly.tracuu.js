var long = 0;
var scope = 0;
var newArray = [];
var nam = [];
function chunkArray(myArray, chunk_size){
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}
function convert(data){
	if(data == 1) return "Bật";
	else return "Tắt";
}
function MM(item){
	if(scope < 0){
		scope = 0;
	}
	if(scope > item){
		scope = item;
	}
}
$(document).ready(function(){
	function page(item) {
		newArray = [];
		long = $("#start").val().split("-").reverse().join("-");
		$.getJSON("https://rauthuycanh-d1aca-default-rtdb.firebaseio.com/data.json", function(result){
			$.each(result, function(i, field){
			var newData = field[3].split(" ")
			if(newData[2] == long){
				newArray.push(field);
			}
			});
			if(newArray.length == 0){
				document.getElementById("thongbao").innerHTML = "không tìm thấy kết quả"
			}
			else {
				document.getElementById("thongbao").innerHTML = "đã tìm thấy " + newArray.length + " kết quả"
				nam = chunkArray(newArray, 1000)
				var nam1 = nam[item];
				var html = nam1.map(function(x){
					return '<tr>' + '<th>'+ x[2] + "lx" + '</th>' + '<th>'+ x[0] + '</th>' + '<th>'+ x[1] + '</th>' + '<th>'+ x[3] + '</th>' + '<th>'+ convert(x[4]) + '</th>' + '<th>'+ convert(x[5]) + '</th>' + '<th>'+ convert(x[6]) + '</th>' + '<th>'+ convert(x[7]) + '</th>' + '</tr>';
				});
				var htmljoin = html.join('');
				$("#lich").html(htmljoin);
				console.log("true")
			}
		})
	}
	document.getElementById("butonNext").addEventListener('click',function(){
		scope++;
		MM(nam.length - 1);
		page(scope);
		window.scrollTo(0, 0);
	})
	document.getElementById("butonPrevious").addEventListener('click',function(){
		scope--;
		MM(nam.length);
		page(scope);
		window.scrollTo(0, 0);
	})
	document.getElementById("start").addEventListener('input',function(){
		page(0);
	});
});