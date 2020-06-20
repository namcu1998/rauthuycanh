const socket = io("http://localhost:3484/nam2351998");
window.onload = function() {
    var ctx = document.getElementById('chart').getContext('2d');
    window.myGauge = new Chart(ctx, config);
    var ctx1 = document.getElementById('chart1').getContext('2d');
    window.myGauge1 = new Chart(ctx1, config1);
  };
function addData(data, data1) {
    config.data.datasets.forEach(function(item) {
        item.value = data;
      });
    config1.data.datasets.forEach(function(item) {
      item.value = data1 - 10;
    });
    window.myGauge.update();
    window.myGauge1.update();
}
function removeData(chart) {

}
$(document).ready(function(){
    socket.emit("getData");
    socket.on("hmm",function(data){
        document.getElementById("temp1").innerHTML = data[0].nhietdo;
        document.getElementById("humi1").innerHTML = data[0].doam;
        addData(data[0].nhietdo, data[0].doam)
	});
}); //document 
var config = {
    type: 'gauge',
    data: {
      labels: ['0°C', '10°C', '20°C', '30°C', '40°C', '50°C', '60°C', '70°C', '80°C', '90°C', '100°C'],
      datasets: [{
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        value: [],
        backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(0, 0, 255, 0.8)', 'rgba(0, 0, 255, 0.6)', 'rgba(0, 0, 255, 0.4)', 'rgba(0, 0, 255, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.4)', 'rgba(255, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.8)', 'rgba(255, 0, 0, 1)'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      layout: {
        padding: {
          bottom: 15
        }
      },
      needle: {
        // Needle circle radius as the percentage of the chart area width
        radiusPercentage: 2,
        // Needle width as the percentage of the chart area width
        widthPercentage: 3.2,
        // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
        lengthPercentage: 80,
        // The color of the needle
        color: 'rgba(0, 0, 0, 1)'
      },
      valueLabel: {
        display: false
      },
      plugins: {
        datalabels: {
          display: true,
          formatter:  function (value, context) {
            return context.chart.data.labels[context.dataIndex];
          },
          //color: function (context) {
          //  return context.dataset.backgroundColor;
          //},
          color: 'rgba(0, 0, 0, 1.0)',
          //color: 'rgba(255, 255, 255, 1.0)',
          backgroundColor: null,
          font: {
            size: 15,
            weight: 'bold'
          }
        }
      }
    }
  };
  var config1 = {
    type: 'gauge',
    data: {
      labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
      datasets: [{
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        value: [],
        backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(0, 0, 255, 0.8)', 'rgba(0, 0, 255, 0.6)', 'rgba(0, 0, 255, 0.4)', 'rgba(0, 0, 255, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.4)', 'rgba(255, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.8)', 'rgba(255, 0, 0, 1)'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      layout: {
        padding: {
          bottom: 15
        }
      },
      needle: {
        // Needle circle radius as the percentage of the chart area width
        radiusPercentage: 2,
        // Needle width as the percentage of the chart area width
        widthPercentage: 3.2,
        // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
        lengthPercentage: 80,
        // The color of the needle
        color: 'rgba(0, 0, 0, 1)'
      },
      valueLabel: {
        display: false
      },
      plugins: {
        datalabels: {
          display: true,
          formatter:  function (value, context) {
            return context.chart.data.labels[context.dataIndex];
          },
          //color: function (context) {
          //  return context.dataset.backgroundColor;
          //},
          color: 'rgba(0, 0, 0, 1.0)',
          //color: 'rgba(255, 255, 255, 1.0)',
          backgroundColor: null,
          font: {
            size: 15,
            weight: 'bold'
          }
        }
      }
    }
  };