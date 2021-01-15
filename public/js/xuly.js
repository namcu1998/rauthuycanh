const socket = io("http://localhost:3484/webapp");
const table = $("#testLichsu");
const modeTheme = document.getElementById("modeTheme");
const dataMode = document.documentElement;
const statusMode = localStorage.getItem('theme');
let bool = true;

//https://rauthuycanh.herokuapp.com/nam2351998
let test = 0;
function xulyDataLichsu(getid, array) {
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
      x.nhietdo1 +
      "*C" +
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
}

if(statusMode) {
  dataMode.setAttribute("data-theme", statusMode);
  if(statusMode === "light") {
    modeTheme.src = "/image/sun.png";
    bool = true;
  }
  else {
    bool = false;
    modeTheme.src = "/image/moon.png"
  }
}

function changeMode() {
  bool = !bool;
  document.getElementsByClassName("navi")[0].style.left = "-100%"
  if(bool === true) {
    modeTheme.src = "/image/sun.png"
    localStorage.setItem("theme", "light");
    dataMode.setAttribute("data-theme", "light")
  }
  else {
    modeTheme.src = "/image/moon.png"
    dataMode.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark");
  }
}

const menu = document.getElementById("menu")
	  
	  menu.addEventListener("click", function(){
      document.getElementsByClassName("navi")[0].style.left = "0"
      setTimeout(() => {
        document.getElementsByClassName("navi")[0].style.background = "rgba(51,0,255,0.3)"
      }, 1000)
      });
    
    const close = document.getElementsByClassName("navi")
	  close[0].addEventListener("click", function(){
      document.getElementsByClassName("navi")[0].style.left = "-100%"
      document.getElementsByClassName("navi")[0].style.background = "none"
    });
    function gohome() {
      document.getElementById("gohome").click()
    }
function convert(data) {
  if (data == 1) return "Bật";
  else return "Tắt";
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
function activeDevice(item) {
  if (item.checked === true) {
    socket.emit("activeDevice", [item.name, 1]);
  } else socket.emit("activeDevice", [item.name, 0]);
}
// function onlick() {
//   document.getElementsByClassName("form-add")[0].style.display = "block";
// }
// function onlick1() {
//   for(item of document.getElementsByClassName("delete")) {
//     item.style.display = "block";
//   }
// }
// document.getElementsByClassName("close")[0].addEventListener("click", function() {
//   document.getElementsByClassName("form-add")[0].style.display = "none";
// })
$(document).ready(function () {
  socket.emit("getMa");
  socket.emit("getData");
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
    else if ($("#setUpload")[0].value > 60 || $("#setUpload")[0].value < 0)
      alert("Thời gian phải trong khoảng từ 0 đến 60");
    else {
      data.setTimePump = parseInt($("#setTimePump")[0].value);
      data.setLux = [$("#setLuxMax")[0].value, $("#setLuxMin")[0].value];
      data.setTemp = [$("#setTempMax")[0].value, $("#setTempMin")[0].value];
      data.setUpload = $("#setUpload")[0].value;
      data.setActiveAutoChild = {
        MMLux: document.querySelectorAll(".changeOO")[2].checked,
        MMTemp: document.querySelectorAll(".changeOO")[1].checked,
        thoigianbom: document.querySelectorAll(".changeOO")[0].checked,
      };
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
socket.on("sendDataLichsu", function (data){ 
    xulyDataLichsu(table, data);
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
