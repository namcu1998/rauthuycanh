const socket = io("https://rauthuycanh.herokuapp.com/webapp");
const history = $("#history");
const search = $("#search");
socket.emit("getDataCharts");
const inputSearch = document.getElementById("input-search");
const input = document.querySelectorAll("input");
const btnToggle = document.getElementsByClassName("btn-toggle");
const propressTemp = document.getElementById("propressTemp");
const propressTemp1 = document.getElementById("propressTemp1");
const propressHumi = document.getElementById("propressHumi");
const propressHumi1 = document.getElementById("propressHumi1");
const propressLux = document.getElementById("propressLux");
const propressBarTempValue = document.getElementById("propress-bar-temp-value");
const propressBarTempValue1 = document.getElementById(
  "propress-bar-temp1-value"
);
const propressBarHumiValue = document.getElementById("propress-bar-humi-value");
const propressBarHumiValue1 = document.getElementById(
  "propress-bar-humi1-value"
);
const propressBarLuxValue = document.getElementById("propress-bar-lux-value");
const informationContent = document.getElementById("information-content");
socket.emit("getMa");
socket.emit("getData");

socket.on("sendDataSensor", (item) => {
  propressTemp.style.strokeDashoffset = 440 - (item.dataTemp * 440) / 100;
  propressBarTempValue.innerHTML = item.dataTemp + "ºC";
  propressTemp1.style.strokeDashoffset = 440 - (item.dataTemp1 * 440) / 100;
  propressBarTempValue1.innerHTML = item.dataTemp1 + "ºC";
  propressHumi.style.strokeDashoffset = 440 - (item.dataHumi * 440) / 100;
  propressBarHumiValue.innerHTML = item.dataHumi + "%";
  propressHumi1.style.strokeDashoffset = 440 - (item.dataHumi1 * 440) / 100;
  propressBarHumiValue1.innerHTML = item.dataHumi1 + "%";
  propressLux.style.strokeDashoffset =
    440 - (((item.dataLight * 100) / 65535) * 440) / 100;
  propressBarLuxValue.innerHTML = item.dataLight + "Lux ";
});

function xulyDataLichsu(table, array) {
  var html = array.map(function (x) {
    return (
      "<tr>" +
      "<td>" +
      x.anhsang +
      "lx" +
      "</td>" +
      "<td>" +
      x.nhietdo +
      "ºC" +
      "</td>" +
      "<td>" +
      x.doam +
      "%" +
      "</td>" +
      "<td>" +
      x.nhietdo1 +
      "ºC" +
      "</td>" +
      "<td>" +
      x.doam1 +
      "%" +
      "</td>" +
      "<td>" +
      x.thoigian +
      "</td>" +
      "<td>" +
      convert(x.device) +
      "</td>" +
      "<td>" +
      convert(x.device1) +
      "</td>" +
      "<td>" +
      convert(x.device2) +
      "</td>" +
      "<td>" +
      convert(x.device3) +
      "</td>" +
      "<td>" +
      convert(x.device4) +
      "</td>" +
      "<td>" +
      convert(x.device5) +
      "</td>" +
      "</tr>"
    );
  });
  document.getElementById(
    "thongbao"
  ).innerHTML = `Đã thấy ${array.length} kết quả`;
  var htmljoin = html.join("");
  table.html(htmljoin);
}

function xulyden(item1, item2) {
  if (item1 == 1) {
    item2.bootstrapToggle("on");
  } else item2.bootstrapToggle("off");
}

function xulyData(item1, item2) {
  if (item2 == 1) {
    document.getElementById(item1).innerHTML = "ON";
  } else document.getElementById(item1).innerHTML = "OFF";
}

function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
}

socket.on("sendDataLichsu", function (data) {
  xulyDataLichsu(history, data);
});

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
            suggestedMin: 1,
            suggestedMax: 65535,
            stepSize: 5000,
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
            // suggestedMin: 20,
            // suggestedMax: 50,
            stepSize: 5,
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
        borderColor: ["blue"],
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 2,
        pointBorderColor: "blue",
      },
      {
        label: "độ ẩm bên trong",
        data: [],
        backgroundColor: "rgba(139, 97, 255, 0)",
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
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "%";
            },
            suggestedMin: 0,
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

inputSearch.addEventListener("input", (item) => {
  console.log(item.target.value);
  axios
    .get("/home/getData", {
      params: {
        Time: item.target.value,
      },
    })
    .then(function (response) {
      let data = response.data;
      xulyDataLichsu(search, data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function activeDevice(item) {
  if (item.checked === true) {
    socket.emit("activeDevice", [item.name, 1]);
  } else socket.emit("activeDevice", [item.name, 0]);
}

socket.on("sendArraySensorError", (item) => {
  let array = ["esspcontroll", "esspsenssor"];
  let string = "";
  // if (item.length === 1) {
  //   string = item[0].toUpperCase() + " " + "OFFLINE";
  // } else {
  //   string = item[0].toUpperCase() + " " + "OFFLINE";
  //   for (let i = 1; i < item.length; i++) {
  //     string = string + "<br>" + item[i].toUpperCase() + " " + "OFFLINE";
  //   }
  // }

  item.map((data) => {
    string =
      string +
      "<div class='informationContent'>" +
      data +
      " OFFLINE" +
      "</div>";
  });

  document.getElementsByClassName("information-sensor")[0].style.display =
    "block";
  informationContent.innerHTML = string;
});

window.addEventListener("offline", (event) => {
  alert("OFFLINE");
});

window.addEventListener("online", (event) => {
  location.reload();
});

function onChangeAuto(item) {
  if (item.checked == true) {
    socket.emit("mode", 0);
  } else socket.emit("mode", 1);
}

function run() {
  let data = {};
  if (
    parseInt($("#setTimePump")[0].value) == 0 ||
    parseInt($("#setLuxMax")[0].value) == 0 ||
    parseInt($("#setLuxMin")[0].value) == 0 ||
    parseInt($("#setTempMax")[0].value) == 0 ||
    parseInt($("#setTempMin")[0].value) == 0
  ) {
    alert("chưa nhập đủ dữ liệu");
  } else if ($("#setTempMax")[0].value > 60 || $("#setTempMin")[0].value < 0)
    alert("nhiệt độ quá lớn hoặc quá nhỏ");
  else if ($("#setTempMax")[0].value < $("#setTempMin")[0].value)
    alert("độ ẩm và nhiệt độ không được min lớn hơn max");
  else {
    data.setTimePump = {
      active: document.querySelectorAll(".changeOO")[0].checked,
      time: parseInt($("#setTimePump")[0].value),
      device: ["Device"],
    };
    data.setLux = {
      active: document.querySelectorAll(".changeOO")[2].checked,
      max: $("#setLuxMax")[0].value,
      min: $("#setLuxMin")[0].value,
      deviceOnMax: ["Device2"],
      deviceOnMin: ["Device3"],
    };
    data.setTemp = {
      active: document.querySelectorAll(".changeOO")[1].checked,
      max: $("#setTempMax")[0].value,
      min: $("#setTempMin")[0].value,
      deviceOnMax: ["Device4"],
      deviceOnMin: ["Device5"],
    };
    socket.emit("ok", data);
  }
}

socket.on("feedbackDevice", (item) => {
  for (let i in item) {
    for (let i1 of btnToggle) {
      if (i === i1.name && item[i] === 1) {
        i1.checked = true;
      }
      if (i === i1.name && item[i] === 0) {
        i1.checked = false;
      }
    }
  }
});

$("#submit").click(() => {
  run();
});

var interval = setInterval(() => {

},30000)
