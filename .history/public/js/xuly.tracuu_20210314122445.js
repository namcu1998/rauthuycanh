const input = document.querySelectorAll("input");
function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
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
        console.log(array);

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
    })
    .catch(function (error) {
      console.log(error);
    });
	chart.data[0].dataPoints
});