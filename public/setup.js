var socket = io("https://namcu.herokuapp.com");
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
var ctx = document.getElementById('myChart').getContext('2d');
$("#testbtn").click(function(){
  $("#mychart1").append("nam");
});

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
