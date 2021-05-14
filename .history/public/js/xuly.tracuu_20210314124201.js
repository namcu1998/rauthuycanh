const input = document.querySelectorAll("input");
function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
}

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title: {
    text: "Crude Oil Reserves vs Production, 2016",
  },
  axisY: {
    title: "Billions of Barrels",
    titleFontColor: "#4F81BC",
    lineColor: "#4F81BC",
    labelFontColor: "#4F81BC",
    tickColor: "#4F81BC",
  },
  axisY2: {
    title: "Millions of Barrels/day",
    titleFontColor: "#C0504E",
    lineColor: "#C0504E",
    labelFontColor: "#C0504E",
    tickColor: "#C0504E",
  },
  toolTip: {
    shared: true,
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries,
  },
  data: [
    {
      type: "column",
      name: "nhiệt độ bên trong",
      legendText: "Proven Oil Reserves",
      showInLegend: true,
      dataPoints: [],
    },
    {
      type: "column",
      name: "nhiệt độ bên ngoài",
      legendText: "Oil Production",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: [],
    },
  ],
});
chart.render();
function toggleDataSeries(e) {
  if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  chart.render();
}

input[0].addEventListener("input", (item) => {
  console.log(item.target.value);
  axios
    .get("/home/getData", {
      params: {
        Time: item.target.value,
      },
    })
    .then(function (response) {
      let data = response.data;
      let array = [];

      var html = data.map(function (x) {
        chart.data[0].dataPoints.push({ label: x.thoigian, y: x.nhietdo });
        chart.data[1].dataPoints.push({ label: x.thoigian, y: x.nhietdo1 });
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
      $("#lich").html(htmljoin);
      chart.render();
    })
    .catch(function (error) {
      console.log(error);
    });
});
