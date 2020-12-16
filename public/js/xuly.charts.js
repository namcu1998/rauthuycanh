const socket = io("https://nhayen.herokuapp.com/nam2351998"); //http://localhost:3484/nam2351998
const ctx = document.getElementById("myChart").getContext("2d");
const ctx1 = document.getElementById("myChart1").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");
Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
  color: "#361ddb",
  anchor: "center",
  align: "top",
});
function addData(chart, label, data) {
  chart.data.labels.push(label);
  // chart1.data.labels.push(label);
  // chart2.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  // chart1.data.datasets[0].data.push(data1);
  // chart2.data.datasets[0].data.push(data2);
  chart.update();
  // chart1.update();
  // chart2.update();
}
function removeData(chart) {
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}
$(document).ready(function () {
  socket.emit("getDataCharts");
  socket.on("onCharts", function (data) {
    data.dataTemp.map((item) => {
      addData(myChart1, item.thoigian, item.nhietdo);
    });
    data.dataHumi.map((item) => {
      addData(myChart2, item.thoigian, item.doam);
    });
    data.dataLux.map((item) => {
      addData(myChart, item.thoigian, item.anhsang);
    });
    console.log(data);
  });
  socket.on("pushTemp", function (data) {
    addData(myChart1, data[1], data[0]);
    removeData(myChart1);
  });
  socket.on("pushHumi", function (data) {
    addData(myChart2, data[1], data[0]);
    removeData(myChart2);
  });
  socket.on("pushLux", function (data) {
    addData(myChart, data[1], data[0]);
    removeData(myChart);
  });
}); //document
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "light",
        data: [],
        backgroundColor: "rgba(196, 245, 0, 0.8)",
        borderColor: [
          "rgba(196, 245, 0, 2)",
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
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "LUX";
            },
          },
        },
      ],
    },
    animation: {
      duration: 2000,
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        formatter: function (value, context) {
          return value + "Lux";
        },
      },
    },
  },
});
var myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "nhiệt độ",
        data: [],
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: [
          "rgba(255,0,0, 2)",
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
        borderWidth: 3,
      },
    ],
  },
  options: {
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        formatter: function (value, context) {
          return value + "°C";
        },
      },
    },
    legend: {
      display: true,
      labels: {
        fontColor: "rgb(255, 99, 132)",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "°C";
            },
            suggestedMin: 25,
            suggestedMax: 40,
          },
        },
      ],
    },
  },
});
var myChart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "độ ẩm",
        data: [],
        backgroundColor: "rgba(139, 97, 255, 0.8)",
        borderColor: [
          "rgba(139, 97, 255, 2)",
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
        borderWidth: 3,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "%";
            },
            suggestedMin: 20,
            suggestedMax: 100,
          },
        },
      ],
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        formatter: function (value, context) {
          return value + "%";
        },
      },
    },
  },
});
