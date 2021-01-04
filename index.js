const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const router = require("./router/home.router");
const authRouter = require("./router/auth.router");
const wd = require("./read.database/write.database");
const rd = require("./read.database/read.database");
const {
  pushTemp,
  pushHumi,
  pushLux,
  getDataChart,
} = require("./createDataCharts/create.charts");
const Auth = require("./controllers/auth.controller");
const time = require("./time/time");
const {
  saveMode,
  saveAuto,
  statusEsp,
  setDevice,
  getAll,
  saveAll,
} = require("./modeAndDataAuto/create.mode");
const { data, data1 } = require("./database/firebase");
const bodyParser = require("body-parser");
const app = express();
const server = http.Server(app);
const io = socketio(server);
const { AwakeHeroku } = require("awake-heroku");
const espControll = io.of("/espControll");
const espSensor = io.of("/espSensor");
const webapp = io.of("/nam2351998");
const middleware = require("socketio-wildcard")();
const cookieParser = require("cookie-parser");
const { use } = require("./router/home.router");
let array = {
  espControll: [],
  espSensor: [],
};
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname + "/node_modules/d3/"));
app.use("/cssToggle", express.static(__dirname + "/bootstrapToggle/css/"));
app.use("/jsToggle", express.static(__dirname + "/bootstrapToggle/js/"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
espControll.use(middleware);
espSensor.use(middleware);
app.use(cookieParser());
webapp.use(middleware);
server.listen(process.env.PORT || 3484);
data1.once("value", function (dataSnapshot) {
  saveAll(dataSnapshot.val());
});
function xulyData(second, temp, humi, light) {
  let x = {
    thoigian: second,
    nhietdo: temp,
    doam: humi,
    light: light,
  };
  return x;
}
const sendWebApp = () => {
  espControll.emit("LED", getAll().statusDevice.Device);
  webapp.emit("onMa1", getAll().statusDevice.Device);
};
AwakeHeroku.add({
  url: "https://rauthuycanh.herokuapp.com",
});
function loopSync() {
  var timeConnect = 0,
    timeUp = 0;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      timeConnect++;
      if (getAll().mode === 0) {
        timeUp++;
        if (
          timeUp <= getAll().autoData.setTimePump * 30 &&
          array.espControll[0] != 1 &&
          array.espControll.length > 0
        ) {
          setDevice("Device", 1);
          sendWebApp();
        } else if (
          timeUp > getAll().autoData.setTimePump * 60 &&
          timeUp <= getAll().autoData.setTimePump * 120 &&
          array.espControll[0] != 0 &&
          array.espControll.length > 0
        ) {
          setDevice("Device", 0);
          sendWebApp();
        }
        //-------------------------------------------------------//
        if (
          getAll().autoData.setLux[0] < array.espSensor[2] &&
          array.espControll[2] != 1 &&
          array.espControll.length > 0
        ) {
          setDevice("Device2", 1);
          setDevice("Device3", 0);
          sendWebApp();
        }
        if (
          getAll().autoData.setLux[1] > array.espSensor[2] &&
          array.espControll[3] != 1 &&
          array.espControll.length > 0
        ) {
          setDevice("Device2", 0);
          setDevice("Device3", 1);
          sendWebApp();
        }
        if (
          getAll().autoData.setLux[0] > array.espSensor[2] &&
          getAll().autoData.setLux[1] < array.espSensor[2] &&
          (array.espControll[2] != 0 || array.espControll[3] != 0) &&
          array.espControll.length > 0
        ) {
          setDevice("Device2", 0);
          setDevice("Device3", 0);
          sendWebApp();
        }
        //------------------------------------------------------//
        if (
          getAll().autoData.setTemp[0] < array.espSensor[0] &&
          array.espControll[1] != 1 &&
          array.espControll[4] != 1 &&
          array.espControll.length > 0
        ) {
          setDevice("Device1", 1);
          setDevice("Device4", 1);
          sendWebApp();
        }
        if (
          getAll().autoData.setTemp[0] >= array.espSensor[0] &&
          array.espControll[1] != 0 &&
          array.espControll[4] != 0 &&
          array.espControll.length > 0
        ) {
          setDevice("Device1", 0);
          setDevice("Device4", 0);
          sendWebApp();
        }
      }

      if (timeConnect === 2) {
        espControll.emit("ping", "nam");
        espSensor.emit("ping", "nam");
        timeConnect = 0;
      } else if (timeUp >= getAll().autoData.setTimePump * 120) timeUp = 0;
      if (
        (rd()[0].nhietdo !== array.espSensor[0] ||
          rd()[0].doam !== array.espSensor[1] ||
          rd()[0].light !== array.espSensor[2]) &&
        array.espSensor.length > 0
      ) {
        wd(
          array.espSensor[0],
          array.espSensor[1],
          array.espSensor[2],
          time.timeDay()[1][2],
          time.timeDay()[1][1],
          time.timeDay()[1][0],
          time.timeDay()[0],
          time.timeDay()[2][0],
          time.timeDay()[2][1],
          time.timeDay()[2][2],
          array.espControll[0],
          array.espControll[1],
          array.espControll[2],
          array.espControll[3],
          array.espControll[4],
          array.espControll[5]
        );
        webapp.emit("hmm", rd());
      }
      if (
        getDataChart().dataTemp[getDataChart().dataTemp.length - 1].nhietdo !==
          array.espSensor[0] &&
        array.espSensor.length > 0
      ) {
        webapp.emit(
          "pushTemp",
          pushTemp(array.espSensor[0], time.timeSecond())
        );
      }
      if (
        getDataChart().dataHumi[getDataChart().dataHumi.length - 1].doam !==
          array.espSensor[1] &&
        array.espSensor.length > 0
      ) {
        webapp.emit(
          "pushHumi",
          pushHumi(array.espSensor[1], time.timeSecond())
        );
      }
      if (
        getDataChart().dataLux[getDataChart().dataLux.length - 1].anhsang !==
          array.espSensor[2] &&
        array.espSensor.length > 0
      ) {
        console.log("om");
        webapp.emit("pushLux", pushLux(array.espSensor[2], time.timeSecond()));
      }
      //Kiểm tra esp kết nối lại
      if (
        (getAll().statusDevice.Device.Device != array.espControll[0] ||
          getAll().statusDevice.Device.Device1 != array.espControll[1] ||
          getAll().statusDevice.Device.Device2 != array.espControll[2] ||
          getAll().statusDevice.Device.Device3 != array.espControll[3] ||
          getAll().statusDevice.Device.Device4 != array.espControll[4] ||
          getAll().statusDevice.Device.Device5 != array.espControll[5]) &&
        array.espControll.length > 0
      ) {
      } else {
        espControll.emit("LED", getAll().statusDevice.Device);
        console.log("kiểm tra device");
      }
    }, 1000);
  });
}

loopSync();

espControll.on("connection", function (socket) {
  socket.on("disconnect", function () {
    statusEsp("espSensor", 0, "none", "none", "none", "none");
  });
  socket.on("JSON1", function (data) {
    array = {
      espControll: [
        data.device,
        data.device1,
        data.device2,
        data.device3,
        data.device4,
        data.device5,
      ],
      espSensor: [...array.espSensor],
    };
    statusEsp(
      "espControll",
      data.statusEsp,
      data.ip,
      data.signal,
      data.clockCPU,
      data.ramLeft
    );
  });
});
espSensor.on("connection", function (socket) {
  console.log("espSensor Connection");
  socket.on("JSON1", (data) => {
    array = {
      espControll: [...array.espControll],
      espSensor: [
        Math.round(data.temp),
        Math.round(data.humi),
        Math.round(data.light),
      ],
    };
    statusEsp(
      "espSensor",
      data.statusEsp,
      data.ip,
      data.signal,
      data.clockCPU,
      data.ramLeft
    );
  });
  socket.on("disconnect", function () {
    statusEsp("espControll", 0, "none", "none", "none", "none");
  });
});
webapp.on("connection", function (socket) {
  //("webapp đã connected");
  socket.on("disconnect", function () {});
  socket.on("activeDevice", (item) => {
    console.log(item);
    if (item[0] === "Device2" && item[1] === 1) {
      setDevice("Device2", 1);
      setDevice("Device3", 0);
      espControll.emit("LED", getAll().statusDevice.Device);
    } else if (item[0] === "Device3" && item[1] === 1) {
      setDevice("Device3", 1);
      setDevice("Device2", 0);
      espControll.emit("LED", getAll().statusDevice.Device);
    } else {
      setDevice(item[0], item[1]);
      espControll.emit("LED", getAll().statusDevice.Device);
      console.log(item[0], item[1]);
    }
  });
  socket.on("getData", () => {
    webapp.emit("hmm", rd());
  });
  socket.on("getDataCharts", () => {
    webapp.emit("onCharts", getDataChart());
  });
  socket.on("getMa", () => {
    webapp.emit("onMa", getAll().autoData);
  });
  // dữ liệu cảm biến
  socket.on("ok", (data) => {
    saveAuto(data);
  });
  socket.on("mode", (data) => {
    saveMode(data);
  });
});

app.use("/home", Auth.SetCookie, router);
app.use("/auth", authRouter);
app.get("/", function (req, res) {
  res.render("home/gioithieu");
});
