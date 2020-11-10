const socket = io("https://nhayen.herokuapp.com/nam2351998"); //https://bonghoaxinh.herokuapp.com/nam2351998
const table = $("#lich");
function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
}
function xulyData(getid, array) {
  var html = array.map(function (x) {
    return (
      "<tr>" +
      "<td>" +
      x.light +
      "lx" +
      "</td>" +
      "<td>" +
      x.nhietdo +
      "*C" +
      "</td>" +
      "<td>" +
      x.doam +
      "%" +
      "</td>" +
      "<td>" +
      x.thoigian +
      "</td>" +
      "<td>" +
      convert(x.fanHumi) +
      "</td>" +
      "<td>" +
      convert(x.speaker) +
      "</td>" +
      "<td>" +
      convert(x.fanTemp) +
      "</td>" +
      "<td>" +
      convert(x.fan) +
      "</td>" +
      "</tr>"
    );
  });
  var htmljoin = html.join("");
  $("#lich").html(htmljoin);
}
$(document).ready(function () {
  socket.emit("getData");
  socket.on("hmm", function (data) {
    xulyData(table, data);
  });
}); //document
