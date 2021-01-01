const socket = io("http://localhost:3484/nam2351998");
let test = 0;
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
function activeDevice(item) {
  if(item.checked === true){
    socket.emit("activeDevice", [item.name, 1])
  }
  else socket.emit("activeDevice", [item.name, 0])
}
$(document).ready(function () {
  socket.emit("getMa");
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
    } else if ($("#setLuxMax")[0].value > 95 || $("#setLuxMin")[0].value < 40)
      alert("độ ẩm quá lớn hoặc quá nhỏ");
    else if ($("#setTempMax")[0].value > 60 || $("#setTempMin")[0].value < 0)
      alert("nhiệt độ quá lớn hoặc quá nhỏ");
    else if (
      $("#setLuxMax")[0].value < $("#setLuxMin")[0].value ||
      $("#setTempMax")[0].value < $("#setTempMin")[0].value
    )
      alert("độ ẩm và nhiệt độ không được min lớn hơn max");
    else if ($("#setUpload")[0].value > 60 || $("#setUpload")[0].value < 0)
      alert("Thời gian phải trong khoảng từ 0 đến 60");
    else {
      data.setTimePump = parseInt($("#setTimePump")[0].value);
      data.setLux = [$("#setLuxMax")[0].value, $("#setLuxMin")[0].value];
      data.setTemp = [$("#setTempMax")[0].value, $("#setTempMin")[0].value];
      data.setUpload = $("#setUpload")[0].value;
      socket.emit("ok", data);
    }
  }
  $("#submit").click(() => {
    run();
  });
  socket.on("onMa1", (data) => {
    xulyData("maybom", data.Device);
    xulyData("phunsuong", data.Device1);
    xulyData("dongrem", data.Device2);
    xulyData("morem", data.Device3);
    xulyData("quat", data.Device4);
    xulyData("thietbi", data.Device5);
    xulyden(data.Device, $("#button"));
    xulyden(data.Device1, $("#button1"));
    xulyden(data.Device2, $("#button2"));
    xulyden(data.Device3, $("#button3"));
    xulyden(data.Device4, $("#button4"));
    xulyden(data.Device5, $("#button5"));
  });
  socket.on("statusEsp", (data) => {
    document.getElementById("statusEsp").innerHTML = data;
  });
  if ($("#toggle-event-mode").prop("checked") == true) {
    $("#controll").show();
    $("#auto").hide();
  } else {
    $("#controll").hide();
    $("#auto").show();
  }
  $("#toggle-event-mode").change(function () {
    if ($(this).prop("checked") == true) {
      $("#controll").show();
      $("#auto").hide();
      socket.emit("mode", 1);
    } else {
      $("#controll").hide();
      $("#auto").show();
      socket.emit("mode", 0);
    }
  });
}); //document
