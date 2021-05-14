const input = document.querySelectorAll("input");
function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
}

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title: {
    fontFamily: "Times New Roman",
  },
  axisY: {
    title: "Nhiệt độ",
    titleFontColor: "#4F81BC",
    lineColor: "#4F81BC",
    labelFontColor: "#4F81BC",
    tickColor: "#4F81BC",
  },
  axisY2: {
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
      legendText: "nhiệt độ bên trong",
      showInLegend: true,
      dataPoints: [],
    },
    {
      type: "column",
      name: "nhiệt độ bên ngoài",
      legendText: "nhiệt độ bên ngoài",
      showInLegend: true,
      dataPoints: [],
    },
  ],
});
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
      let day =
        data[0].thoigian.split(" ")[0] +
        " " +
        data[0].thoigian.split(" ")[1] +
        " " +
        data[0].thoigian.split(" ")[2];
      chart.render();

      var html = data.map(function (x) {
		  let time = x.thoigian.split(" ").
        chart.data[0].dataPoints.push({ label: x.thoigian, y: x.nhietdo });
        chart.data[1].dataPoints.push({ label: x.thoigian, y: x.nhietdo1 });
        chart.options.title.text = `nhiệt độ ngày ${day}`;
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
