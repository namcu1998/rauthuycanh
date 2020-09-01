$(document).ready(function(){
  var newArray = []
  var long = 0;
  var Array = []
  function convert(data){
    if(data == 1) return "Bật";
    else return "Tắt";
  }
  document.getElementById("start").addEventListener('input',function(){
    long = $("#start").val().split("-").reverse().join("-");
    $.getJSON("https://nhayen-4b731.firebaseio.com/data.json", function(result){
      $.each(result, function(i, field){
        var newData = field[3].split(" ")
        if(newData[2] == long){
          newArray.push(field);
        }
      });
      if(newArray.length == 0){
        alert("khong co du lieu")
      }
      var html = newArray.map(function(x){
        return '<tr>' + '<th>'+ x[2] + "lx" + '</th>' + '<th>'+ x[0] + '</th>' + '<th>'+ x[1] + '</th>' + '<th>'+ x[3] + '</th>' + '<th>'+ convert(x[4]) + '</th>' + '<th>'+ convert(x[5]) + '</th>' + '<th>'+ convert(x[6]) + '</th>' + '<th>'+ convert(x[7]) + '</th>' + '</tr>';
      });
      var htmljoin = html.join('');
      $("#lich").html(htmljoin);
})
  });
});