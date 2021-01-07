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
  saveDb
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
const { dulieuDb, data1, dulieubieudo } = require("./database/firebase");
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
var arrayDataLux = [];
var arrayDataTemp = [];
var arrayDataHumi = [];
var ketquatblux = 0;
var ketquatbnhietdo = 0;
var ketquatbdoam = 0;
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
dulieubieudo.once("value", function (dataSnapshot) {
  if(dataSnapshot.val())   saveDb(dataSnapshot.val());
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
    timeUp = 0,
    timePushDb = 0;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      timeConnect++;
      timePushDb++;
      if (getAll().mode === 0) {
        timeUp++;
        if (getAll().autoData.setActiveAutoChild.thoigianbom === true) {
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
        }
        //-------------------------------------------------------//
        if (getAll().autoData.setActiveAutoChild.MMLux === true) {
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
        }
        //------------------------------------------------------//
        if (getAll().autoData.setActiveAutoChild.MMTemp === true) {
          if (
            getAll().autoData.setTemp[0] < array.espSensor[0] &&
            array.espControll[4] != 1 &&
            array.espControll[5] != 1 &&
            array.espControll.length > 0
          ) {
            setDevice("Device4", 1);
            setDevice("Device5", 1);
            sendWebApp();
          }
          if (
            getAll().autoData.setTemp[0] >= array.espSensor[0] &&
            array.espControll[4] != 0 &&
            array.espControll[5] != 0 &&
            array.espControll.length > 0
          ) {
            setDevice("Device4", 0);
            setDevice("Device5", 0);
            sendWebApp();
          }
        }
      }
      //------------------------------------------------------------//
      if (timeConnect === 2) {
        espControll.emit("ping", "nam");
        espSensor.emit("ping", "nam");
        timeConnect = 0;
      } else if (timeUp >= getAll().autoData.setTimePump * 120) timeUp = 0;
      //-------------------------------------------------------------//
      if (timePushDb > 30 && array.espSensor.length > 0) {
        dulieuDb.push([
          array.espSensor[0],
          array.espSensor[1],
          array.espSensor[2],
          time.getTime(),
          getAll().statusDevice.Device.Device,
          getAll().statusDevice.Device.Device1,
          getAll().statusDevice.Device.Device2,
          getAll().statusDevice.Device.Device3,
          getAll().statusDevice.Device.Device4,
          getAll().statusDevice.Device.Device5,
        ]);
        timePushDb = 0;
      }
      //-----------------------------------------//
      if (
        (rd()[0].nhietdo !== array.espSensor[0] ||
          rd()[0].doam !== array.espSensor[1] ||
          rd()[0].light !== array.espSensor[2]) &&
        array.espSensor.length > 0
      ) {
        wd(
          getAll().espSensor[0],
          getAll().espSensor[1],
          getAll().espSensor[2],
          time.getTime(),
          getAll().statusDevice.Device.Device,
          getAll().statusDevice.Device.Device1,
          getAll().statusDevice.Device.Device2,
          getAll().statusDevice.Device.Device3,
          getAll().statusDevice.Device.Device4,
          getAll().statusDevice.Device.Device5
        );
        webapp.emit("sendDataLichsu", rd());
      }
      //---------------------------------------------//
      if (
        getDataChart().dataTemp[getDataChart().dataTemp.length - 1].nhietdo !==
          array.espSensor[0] &&
        array.espSensor.length > 0
      ) {
        webapp.emit(
          "pushTemp",
          pushTemp(array.espSensor[0], time.time())
        );
        dulieubieudo.set(getDataChart());
      }
      if (
        getDataChart().dataHumi[getDataChart().dataHumi.length - 1].doam !==
          array.espSensor[1] &&
        array.espSensor.length > 0
      ) {
        webapp.emit(
          "pushHumi",
          pushHumi(array.espSensor[1], time.time())
        );
        dulieubieudo.set(getDataChart());
      }
      if (
        getDataChart().dataLux[getDataChart().dataLux.length - 1].anhsang !==
          array.espSensor[2] &&
        array.espSensor.length > 0
      ) {
        console.log("om");
        webapp.emit("pushLux", pushLux(array.espSensor[2], time.time()));
        dulieubieudo.set(getDataChart());
      }
      //-----------------------------------------------------------------------//
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
      //------------------------------------------------------------------------//
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
    if (arrayDataLux.length < 10) {
      arrayDataLux.push(Math.ceil(data.light));
      arrayDataTemp.push(Math.ceil(data.temp));
      arrayDataHumi.push(Math.ceil(data.humi));
    } else {
      for (var i = 0; i < arrayDataLux.length; i++) {
        ketquatblux += arrayDataLux[i];
        ketquatbnhietdo += arrayDataTemp[i];
        ketquatbdoam += arrayDataHumi[i];
      }
      array = {
        espControll: [...array.espControll],
        espSensor: [
          Math.ceil(ketquatbnhietdo / 10),
          Math.ceil(ketquatbdoam / 10),
          Math.ceil(ketquatblux / 10),
        ],
      };
      arrayDataLux = [];
      arrayDataTemp = [];
      arrayDataHumi = [];
      ketquatblux = 0;
      ketquatbnhietdo = 0;
      ketquatbdoam = 0;
    }
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
