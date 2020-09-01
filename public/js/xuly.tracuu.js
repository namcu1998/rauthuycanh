$(document).ready(function(){
  var long = 0;
  function convert(data){
    if(data == 1) return "Bật";
    else return "Tắt";
  }
  document.getElementById("start").addEventListener('input',function(){
    var newArray = []
    long = $("#start").val().split("-").reverse().join("-");
    $.getJSON("https://nhayen-4b731.firebaseio.com/data.json", function(result){
      $.each(result, function(i, field){
        var newData = field[3].split(" ")
        if(newData[2] == long){
          newArray.push(field);
        }
      });
      if(newArray.length == 0){
        document.getElementById("thongbao").innerHTML = "Không tìm thấy kết quả"
      }
      else document.getElementById("thongbao").innerHTML = "Đã tìm thấy " + newArray.length + " kết quả"
      var html = newArray.map(function(x){
        return '<tr>' + '<th>'+ x[2] + "lx" + '</th>' + '<th>'+ x[0] + '</th>' + '<th>'+ x[1] + '</th>' + '<th>'+ x[3] + '</th>' + '<th>'+ convert(x[4]) + '</th>' + '<th>'+ convert(x[5]) + '</th>' + '<th>'+ convert(x[6]) + '</th>' + '<th>'+ convert(x[7]) + '</th>' + '</tr>';
      });
      var htmljoin = html.join('');
      $("#lich").html(htmljoin);
})
  });
});