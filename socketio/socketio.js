const {
  vegetableData,
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

      socket.on("espInformation", (data) => {
        pushEspInformationDataIntoJson("espControllData", data);
      });

      socket.on("ioState", (data) => {
        pushDeviceStatusDataIntoJson("espControllData", data);
      });
    });
  }

  function espSensor(nameSpaceEspSensor) {
    nameSpaceEspSensor.on("connection", function (socket) {
      // pushEspConnectStatusIntoJson("espSensorData", true);

      nameSpaceEspSensor.emit("getEspInformation", "getEspInformation");

      console.log("espSensor Connection");

      socket.on("disconnect", () => {
        // pushEspConnectStatusIntoJson("espSensorData", false);
      });

      socket.on("espInformation", (data) => {
        pushEspInformationDataIntoJson("espSensorData", data);
      });

      socket.on("temparetureInDoorData", (data) => {
        pushEspSensorDataIntoJson("temperatureInDoorData", data);
      });

      socket.on("humidityInDoorData", (data) => {
        pushEspSensorDataIntoJson("humidityInDoorData", data);
      });

      socket.on("temparetureOutDoorData", (data) => {
        pushEspSensorDataIntoJson("temperatureOutDoorData", data);
      });

      socket.on("humidityOutDoorData", (data) => {
        pushEspSensorDataIntoJson("humidityOutDoorData", data);
      });

      socket.on("lightData", (data) => {
        pushEspSensorDataIntoJson("lightData", data);
      });
      
      socket.on("mq135Value", (data) => {
        pushEspSensorDataIntoJson("mq135Data", data);
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
        setDevice(item);
      });

      socket.on("vegetableId", item => {
        vegetableData(item);
      })
    });
  }

  espSensor(nameSpaceEspSensor);
  espControll(nameSpaceEspControll);
  webapp(nameSpaceWebapp);
};
