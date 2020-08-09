const socket = io("https://bonghoaxinh.herokuapp.com/nam2351998");  //http://localhost:3484/nam2351998
const ctx = document.getElementById('myChart').getContext('2d');
const ctx1 = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
function addData(chart, chart1, chart2, label, data, data1, data2) {
    chart.data.labels.push(label);
    chart1.data.labels.push(label);
    chart2.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart1.data.datasets[0].data.push(data1);
    chart2.data.datasets[0].data.push(data2);
    chart.update();
    chart1.update();
    chart2.update();
}
function removeData(chart, chart1, chart2) {
    chart.data.labels.shift();
    chart1.data.labels.shift();
    chart2.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart1.data.datasets[0].data.shift();
    chart2.data.datasets[0].data.shift();
    chart.update();
    chart1.update();
    chart2.update();
}
$(document).ready(function(){
    socket.emit("getDataCharts");
    socket.on("onCharts",function(data){
        data.map((item) => {
            addData(myChart, myChart1,myChart2, item.dataTime, item.dataLight, item.dataTemp, item.dataHumi);
        })
    });
    socket.on("emitChart",function(data){
        removeData(myChart, myChart1, myChart2);
        addData(myChart, myChart1, myChart2, data.thoigian, data.light, data.nhietdo, data.doam);
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
                backgroundColor: 'rgba(196, 245, 0, 0.8)',
                borderColor: [
                    'rgba(196, 245, 0, 2)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                    // 'rgba(141, 78, 78, 1)',
                    // 'rgba(105, 58, 58, 1)',
                    // 'rgba(71, 26, 26, 1)',
                    // 'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + "LUX";
                    },
                }
            }]
        }
    }
});
var myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'nhiệt độ',
                data: [],
                backgroundColor: 'rgba(255,0,0, 0.5)',
                borderColor: [
                    'rgba(255,0,0, 2)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                    // 'rgba(141, 78, 78, 1)',
                    // 'rgba(105, 58, 58, 1)',
                    // 'rgba(71, 26, 26, 1)',
                    // 'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 3
            }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + "°C";
                    },
                    // suggestedMin: 30,
                    // suggestedMax: 40
                }
            }]
        }
    }
});
var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'độ ẩm',
                data: [],
                backgroundColor: 'rgba(139, 97, 255, 0.8)',
                borderColor: [
                    'rgba(139, 97, 255, 2)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                    // 'rgba(141, 78, 78, 1)',
                    // 'rgba(105, 58, 58, 1)',
                    // 'rgba(71, 26, 26, 1)',
                    // 'rgba(26, 38, 71, 1)',
                ],
                borderWidth: 3
            }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + "%";
                    },
                    // suggestedMin: 0,
                    // suggestedMax: 100
                }
            }]
        }
    }
});
    