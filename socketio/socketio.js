const {
  saveAuto,
  setDevice,
  getAll,
} = require("../data/clientData/clientData");

const { getDataChart } = require("../data/chartData/create.charts");
const { readFile } = require("../data/historyData/historyData");
const time = require("../time/time");

const {
  pushEspInformationDataIntoJson,
  pushDeviceStatusDataIntoJson,
  pushEspConnectStatusIntoJson,
  pushEspSensorDataIntoJson,
  pushSensorStatusIntoJson,
  getErrorDevicesList,
  getDataAll,
} = require("../data/espData/saveDataEsp");

module.exports = function deviceIO(
  nameSpaceEspControll,
  nameSpaceEspSensor,
  nameSpaceWebapp
) {
  function espControll(nameSpaceEspControll) {
    nameSpaceEspControll.on("connection", function (socket) {
      // pushEspConnectStatusIntoJson("espControllData", true);

      nameSpaceEspControll.emit("getEspInformation", "getEspInformation");

      nameSpaceEspControll.emit("LED", getAll().statusDevice);

      console.log("connected");

      socket.on("disconnect", function () {
        // pushEspConnectStatusIntoJson("espControllData", false);
      });

      socket.on("espInformation", (data) => {
        pushEspInformationDataIntoJson("espControllData", data);
      });

      socket.on("outputStatus", (data) => {
        pushDeviceStatusDataIntoJson("espControllData", data);
      });
    });
  }

  function espSensor(nameSpaceEspSensor) {
    nameSpaceEspSensor.on("connection", function (socket) {
      // pushEspConnectStatusIntoJson("espSensorData", true);

      nameSpaceEspSensor.emit("getEspInformation", "getEspInformation");

      nameSpaceEspSensor.emit("status", "connected");

      console.log("espSensor Connection");

      socket.on("disconnect", () => {
        // pushEspConnectStatusIntoJson("espSensorData", false);
      });

      socket.on("espInformation", (data) => {
        pushEspInformationDataIntoJson("espSensorData", data);
      });

      socket.on("temparetureInDoorData", (data) => {
        pushEspSensorDataIntoJson("temparetureInDoorData", data);
      });

      socket.on("humidityInDoorData", (data) => {
        pushEspSensorDataIntoJson("humidityInDoorData", data);
      });

      socket.on("temparetureOutDoorData", (data) => {
        pushEspSensorDataIntoJson("temparetureOutDoorData", data);
      });

      socket.on("humidityOutDoorData", (data) => {
        pushEspSensorDataIntoJson("humidityOutDoorData", data);
      });

      socket.on("lightData", (data) => {
        pushEspSensorDataIntoJson("lightData", data);
      });

      socket.on("waterSensorStatusOne", (data) => {
        console.log("waterSensorStatusOne", data);
        pushSensorStatusIntoJson("waterSensorStatus", data);
      });

      socket.on("waterSensorStatusTwo", (data) => {
        console.log("waterSensorStatusTwo", data);
        pushSensorStatusIntoJson("waterSensorStatus1", data);
      });

      socket.on("temparetureSensorStatus", (data) => {
        console.log("temparetureSensorStatus", data);
        pushSensorStatusIntoJson("dht11Status", data);
      });

      socket.on("LightSensorStatus", (data) => {
        console.log("LightSensorStatus", data);
        pushSensorStatusIntoJson("bh1750Status", data);
      });
    });
  }

  function webapp(nameSpaceWebapp) {
    nameSpaceWebapp.on("connection", function (socket) {
      socket.on("disconnect", function () {});

      socket.on("activeDevice", (item) => {
        setDevice(item[0], item[1]);
      });

      socket.on("getChartData", () => {
        nameSpaceWebapp.emit("onCharts", getDataChart());
      });

      socket.on("getHistoryData", () => {
        nameSpaceWebapp.emit("sendDataLichsu", readFile());
      });

      socket.on("clientData", (data) => saveAuto(data));

      socket.on("getDevicesStatus", () => {
        getErrorDevicesList();
      });

      socket.on("reloadDataSensor", (item) => {
        // nameSpaceWebapp.emit("sendDataSensor", {
        //   dataTime: readFile()[0].thoigian,
        //   dataTemp: getDataEsp().espSensor.statusDevice.temp,
        //   dataTemp1: getDataEsp().api.temp,
        //   dataHumi: getDataEsp().espSensor.statusDevice.humi,
        //   dataHumi1: getDataEsp().api.humidity,
        //   dataLight: getDataEsp().espSensor.statusDevice.light,
        // });

        socket.on("reloadDataDevice", () => {
          nameSpaceWebapp.emit("feedbackDevice", getAll().statusDevice);
        });
        console.log("reload");
      });

      socket.on("getDevicesData", (data) => {
        nameSpaceWebapp.emit("feedbackDevice", getAll().statusDevice);
      });
    });
  }

  espSensor(nameSpaceEspSensor);
  espControll(nameSpaceEspControll);
  webapp(nameSpaceWebapp);
};
