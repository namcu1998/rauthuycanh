var socket = io("https://namcu.herokuapp.com");
socket.on("dulieu", function(data){
  var newdata = [{time: time(), y: random()}];
   myChart.push(newdata);
  document.getElementById("temp").innerHTML = data["time"];
});
function time(){
  var dt = new Date();
  var miliSec = dt.getTime();
  document.getElementById("demo1").innerHTML = dt.getTime();
  return miliSec;
};

function random(){
  var dem = Math.random() * 100;
  return dem;
};


var areaChartData = [
  {
  label: "Layer 1",
   values: [{time: time(), y: random()}],
},
];
  var myChart = $('#myChart').epoch({
   type: 'time.bar',
   data: areaChartData,
   axes: ['right', 'bottom', 'left']
  });
