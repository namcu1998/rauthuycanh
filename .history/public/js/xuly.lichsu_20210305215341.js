const socket = io("https://rauthuycanh.herokuapp.com/webapp"); //https://bonghoaxinh.herokuapp.com/nam2351998
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
      x.anhsang +
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
}
$(document).ready(function () {
  socket.emit("getData");
  socket.on("sendDataLichsu", function (data) {
    xulyData(table, data);
  });
}); //document
