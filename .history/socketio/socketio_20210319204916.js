const {
  saveDataEspSensor,
  saveDataEspControll,
  getDataEsp,
  error,
} = require("../saveData/saveDataEsp/saveDataEsp");
const {
  saveMode,
  saveAuto,
  statusEsp,
  setDevice,
  getAll,
  saveAll,
} = require("../saveData/modeAndDataAuto/create.mode");
const { getDataChart } = require("../saveData/createDataCharts/create.charts");
const { readFile } = require("../saveData/read.database/write.database");
const time = require(".")

module.exports = function deviceIO(
  nameSpaceEspControll,
  nameSpaceEspSensor,
  nameSpaceWebapp
) {
  function espControll(nameSpaceEspControll) {
    nameSpaceEspControll.on("connection", function (socket) {
      nameSpaceEspControll.emit("status", "connected");
      socket.on("disconnect", function () {
        statusEsp("espSensor", 0, "none", "none", "none", "none");
      });
      socket.on("JSON1", function (data) {
        saveDataEspControll(data);
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
  }

  function espSensor(nameSpaceEspSensor) {
    nameSpaceEspSensor.on("connection", function (socket) {
      nameSpaceEspSensor.emit("status", "connected");
      console.log("espSensor Connection");
      socket.on("JSON1", (data) => {
        saveDataEspSensor(data);
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
      socket.on("error", function (data) {
        nameSpaceEspSensor.emit("stopSendError", "stop");
        error(data);
      });
    });
  }

  function webapp(nameSpaceWebapp) {
    nameSpaceWebapp.on("connection", function (socket) {
      socket.on("disconnect", function () {});
      socket.on("activeDevice", (item) => {
        if (item[0] === "Device2" && item[1] === 1) {
          setDevice("Device2", 1);
          setDevice("Device3", 0);
          nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
        } else if (item[0] === "Device3" && item[1] === 1) {
          setDevice("Device3", 1);
          setDevice("Device2", 0);
          nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
        } else {
          setDevice(item[0], item[1]);
          nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
        }
      });
      socket.on("getData", () => {
        nameSpaceWebapp.emit("sendDataLichsu", readFile());
      });
      socket.on("getDataCharts", () => {
        nameSpaceWebapp.emit("onCharts", getDataChart());
      });
      socket.on("getMa", () => {
        let arraySensorError = [];

        for (let i in getDataEsp().espSensor.statusSensor) {
          if (getDataEsp().espSensor.statusSensor[i] === false) {
            arraySensorError.push(i);
          }
        }

        if (getAll().statusEsp.espControll.status === false) {
          arraySensorError.push("ESPCONTROLL");
        }

        if (getAll().statusEsp.espSensor.status === false) {
          arraySensorError.push("ESPSENSOR");
        }

        if (arraySensorError.length > 0) {
          nameSpaceWebapp.emit("sendArraySensorError", arraySensorError);
        }

        nameSpaceWebapp.emit("onMa1", getAll().statusDevice.Device);
      });
      // dữ liệu cảm biến
      socket.on("ok", (data) => {
        saveAuto(data);
      });
      socket.on("mode", (data) => {
        saveMode(data);
      });

      socket.on("reloadDataSensor", (item) => {
        nameSpaceWebapp.emit("sendDataSensor", {
          dataTime: time.getTime(),
          dataTemp: getDataEsp().espSensor.statusDevice.temp,
          dataTemp1: getDataEsp().api.temp - 273.15,
          dataHumi: getDataEsp().espSensor.statusDevice.humi,
          dataHumi1: getDataEsp().api.humidity,
          dataLight: getDataEsp().espSensor.statusDevice.light,
        });

        socket.on("reloadDataDevice", () => {
          nameSpaceWebapp.emit("feedbackDevice", getAll().statusDevice.Device);
        });
        console.log("reload");
      });
    });
  }

  espSensor(nameSpaceEspSensor);
  espControll(nameSpaceEspControll);
  webapp(nameSpaceWebapp);
};
