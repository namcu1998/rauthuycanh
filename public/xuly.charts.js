const socket = io("http://nam2351998.herokuapp.com/");
const ctx = document.getElementById('myChart').getContext('2d');
function addData(chart, label, data, data1, data2) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.data.datasets[1].data.push(data1);
    chart.data.datasets[2].data.push(data2);
    chart.update();
}
function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
    chart.data.datasets[2].data.shift();
    chart.update();
}
$(document).ready(function(){
    socket.emit("getDataCharts");
    socket.on("onCharts",function(data){
        data.map((item) => {
            addData(myChart, item.dataTime, item.dataLight, item.dataTemp, item.dataHumi);
        })
    });
    socket.on("hmm",function(data){
        addData(myChart, data[0].thoigian, data[0].light, data[0].nhietdo, data[0].doam);
        removeData(myChart);
    });
}); //document
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'light',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(141, 78, 78, 0.2)',
                    'rgba(105, 58, 58, 0.2)',
                    'rgba(71, 26, 26, 0.2)',
                    'rgba(26, 38, 71, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(141, 78, 78, 1)',
                    'rgba(105, 58, 58, 1)',
                    'rgba(71, 26, 26, 1)',
                    'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Nhiệt độ',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(141, 78, 78, 0.2)',
                    'rgba(105, 58, 58, 0.2)',
                    'rgba(71, 26, 26, 0.2)',
                    'rgba(26, 38, 71, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(141, 78, 78, 1)',
                    'rgba(105, 58, 58, 1)',
                    'rgba(71, 26, 26, 1)',
                    'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'độ ẩm',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(141, 78, 78, 0.2)',
                    'rgba(105, 58, 58, 0.2)',
                    'rgba(71, 26, 26, 0.2)',
                    'rgba(26, 38, 71, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(141, 78, 78, 1)',
                    'rgba(105, 58, 58, 1)',
                    'rgba(71, 26, 26, 1)',
                    'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 1
            }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    