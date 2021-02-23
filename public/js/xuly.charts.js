const socket = io("https://rauthuycanh.herokuapp.com/webapp");
const ctx = document.getElementById("myChart").getContext("2d");
const ctx1 = document.getElementById("myChart1").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");
Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
  color: "#361ddb",
  anchor: "center",
  align: "top",
});
function addData(chart, label, data, data1) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  if (chart.data.datasets[1]) {
    chart.data.datasets[1].data.push(data1);
  }
  chart.update();
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
      addData(myChart1, item.thoigian, item.nhietdo, item.nhietdoApi);
      removeData(myChart1);
    });
    data.dataHumi.map((item) => {
      addData(myChart2, item.thoigian, item.doam, item.doamApi);
      removeData(myChart2);
    });
    data.dataLux.map((item) => {
      addData(myChart, item.thoigian, item.anhsang);
      removeData(myChart);
    });
  });
  socket.on("pushTemp", function (data) {
    addData(myChart1, data[1], data[0], data[2]);
    removeData(myChart1);
  });
  socket.on("pushHumi", function (data) {
    addData(myChart2, data[1], data[0], data[2]);
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
        borderColor: ["rgba(196, 245, 0, 2)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },

    hover: {
      mode: "nearest",
      intersect: true,
    },
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
        label: "nhiệt độ bên trong",
        data: [],
        backgroundColor: "rgba(255,0,0, 0)",
        borderColor: ["red"],
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 2,
        pointBorderColor: "red",
      },
      {
        label: "nhiệt độ bên ngoài",
        data: [],
        backgroundColor: "rgba(255,0,0, 0)",
        borderColor: ["yellow"],
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 2,
        pointBorderColor: "yellow",
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },

    hover: {
      mode: "nearest",
      intersect: true,
    },
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
        label: "độ ẩm bên ngoài",
        data: [],
        backgroundColor: "rgba(139, 97, 255,0)",
        borderColor: ["yellow"],
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 2,
        pointBorderColor: "yellow",
      },
      {
        label: "độ ẩm bên trong",
        data: [],
        backgroundColor: "rgba(139, 97, 255, 0)",
        borderColor: ["rgba(139, 97, 255, 1)"],
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 2,
        pointBorderColor: "red",
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },

    hover: {
      mode: "nearest",
      intersect: true,
    },
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
