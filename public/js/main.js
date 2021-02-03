const socket = io("https://rauthuycanh.herokuapp.com/webapp");
const history = $("#history");
const search = $("#search");
socket.emit("getDataCharts");
const inputSearch = document.getElementById("input-search");
const input = document.querySelectorAll("input");
const btnToggle = document.getElementsByClassName("btn-toggle");
socket.emit("getMa");
socket.emit("getData");

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
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: ["rgba(255,0,0, 2)"],
        borderWidth: 3,
      },
      {
        label: "nhiệt độ bên ngoài",
        data: [],
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: ["rgba(255,0,0, 2)"],
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
            suggestedMin: 0,
            suggestedMax: 100,
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
        backgroundColor: "rgba(139, 97, 255, 0.8)",
        borderColor: ["rgba(139, 97, 255, 2)"],
        borderWidth: 3,
      },
      {
        label: "độ ẩm bên trong",
        data: [],
        backgroundColor: "rgba(139, 97, 255, 0.8)",
        borderColor: ["rgba(139, 97, 255, 2)"],
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
      console.log(data);
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
  let string = "";
  if (item.length === 1) {
    string = item[0] + " " + "error";
  } else {
    string = item[0] + " " + "error";
    for (let i = 1; i < item.length; i++) {
      string = string + "\n" + item[i] + " " + "error";
    }
  }
  Swal.fire({
    title: 'Error!',
    text: string,
    icon: 'error',
    confirmButtonText: 'OK'
  })
});

function onChangeAuto(item) {
  console.log(item.checked);
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

socket.on("feedbackDevice", item => {
  console.log("da nhan")
  for(let i in item) {
    for(let i1 of btnToggle) {
      if(i === i1.name && item[i] === 1) {
        i1.checked = true;
        console.log(item[i], i1)
      }
      if(i === i1.name && item[i] === 0) {
        i1.checked = false;
        console.log(item[i], i1)
      }
    }
  }
})

$("#submit").click(() => {
  run();
  console.log("da nhan");
});
