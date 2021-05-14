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
      name: "Proven Oil Reserves (bn)",
      legendText: "Proven Oil Reserves",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 266.21 },
        { label: "Venezuela", y: 302.25 },
        { label: "Iran", y: 157.2 },
        { label: "Iraq", y: 148.77 },
        { label: "Kuwait", y: 101.5 },
        { label: "UAE", y: 97.8 },
      ],
    },
    {
      type: "column",
      name: "Oil Production (million/day)",
      legendText: "Oil Production",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 10.46 },
        { label: "Venezuela", y: 2.27 },
        { label: "Iran", y: 3.99 },
        { label: "Iraq", y: 4.45 },
        { label: "Kuwait", y: 2.92 },
        { label: "UAE", y: 3.1 },
      ],
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
        array.push({ label: x.thoigian, y: x.nhietdo });

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
	  console.log(chart.data[0].dataPoints)
      chart.data[0].dataPoints = array;
      chart.data[1].dataPoints = array;
      chart.render();
    })
    .catch(function (error) {
      console.log(error);
    });
});
