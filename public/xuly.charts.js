const socket = io("http://nam2351998.herokuapp.com/");
const ctx = document.getElementById('myChart').getContext('2d');
let time
let temp = [];
let light = [];
function addData(chart, label, data, data1) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.data.datasets[1].data.push(data1);
    chart.update();
}
$(document).ready(function(){
    socket.emit("getDataCharts");
    socket.on("onCharts",function(data){
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[1].dataTime,
                datasets: [
                    {
                        label: 'light',
                        data: data[0].dataLight,
                        backgroundColor: [
                            'rgba(255,0,0,0.2)'
                        ],
                        borderColor: [
                            'rgba(47, 101, 63, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Nhiệt độ',
                        data: data[2].dataTemp,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
    });
    socket.on("hmm",function(data){
        addData(myChart, data[0].thoigian, data[0].light, data[0].nhietdo)
    });
}); //document

    