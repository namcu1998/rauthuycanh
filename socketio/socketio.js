const {
  saveDataEspSensor,
  saveDataEspControll,
  getDataEsp,
  error,
} = require("../data/espData/saveDataEsp");
const {
  saveMode,
  saveAuto,
  setDevice,
  getAll,
  saveAll,
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
        getDataAll
      } = require("../data/espData/saveDataEsp");

module.exports = function deviceIO(
  nameSpaceEspControll,
  nameSpaceEspSensor,
  nameSpaceWebapp
) {
  function espControll(nameSpaceEspControll) {
    nameSpaceEspControll.on("connection", function (socket) {

      nameSpaceEspControll.emit("LED", getAll().statusDevice);

      pushEspConnectStatusIntoJson("espControllData", true);

      nameSpaceEspControll.emit("getEspInformation", "getEspInformation");

      nameSpaceEspControll.emit("status", "connected");

      console.log("connected")

      socket.on("disconnect", function () {
        pushEspConnectStatusIntoJson("espControllData", false);
      });
      
      socket.on ("espInformation", data => {
        pushEspInformationDataIntoJson("espControllData", data);
      })

      socket.on ("outputStatus", data => {
        pushDeviceStatusDataIntoJson("espControllData", data);
      })

    });
  }

  function espSensor(nameSpaceEspSensor) {
    nameSpaceEspSensor.on("connection", function (socket) {
      pushEspConnectStatusIntoJson("espSensorData", true);

      nameSpaceEspSensor.emit("getEspInformation", "getEspInformation");

      nameSpaceEspSensor.emit("status", "connected");

      console.log("espSensor Connection");

      socket.on ("disconnect", () => {
        pushEspConnectStatusIntoJson("espSensorData", false);
      })

      socket.on ("espInformation", data => {
        pushEspInformationDataIntoJson("espSensorData", data);
      })

      socket.on ("temparetureInDoorData", data => {
        pushEspSensorDataIntoJson("temparetureInDoorData", data);
      })

      socket.on ("humidityInDoorData", data => {
        pushEspSensorDataIntoJson("humidityInDoorData", data);
      })

      socket.on ("temparetureOutDoorData", data => {
        pushEspSensorDataIntoJson("temparetureOutDoorData", data);
      })

      socket.on ("humidityOutDoorData", data => {
        pushEspSensorDataIntoJson("humidityOutDoorData", data);
      })

      socket.on ("lightData", data => {
        pushEspSensorDataIntoJson("lightData", data);
      })

      socket.on ("waterSensorStatusOne", data => {
        pushSensorStatusIntoJson("waterSensorStatus", data);
      })

      socket.on ("waterSensorStatusTwo", data => {
        pushSensorStatusIntoJson("waterSensorStatus1", data);
      })
      
      socket.on ("temparetureSensorStatus", data => {
        pushSensorStatusIntoJson("dht11Status", data);
      })

      socket.on ("LightSensorStatus", data => {
        pushSensorStatusIntoJson("bh1750Status", data);
      })
    });
  }

  function webapp(nameSpaceWebapp) {
    nameSpaceWebapp.on("connection", function (socket) {
      socket.on("disconnect", function () {});
      socket.on("activeDevice", (item) => {
        if (item[0] === "Device2" && item[1] === 1) {
          setDevice("Device2", 1);
          setDevice("Device3", 0);
          nameSpaceEspControll.emit("LED", getAll().statusDevice);
        } else if (item[0] === "Device3" && item[1] === 1) {
          setDevice("Device3", 1);
          setDevice("Device2", 0);
          nameSpaceEspControll.emit("LED", getAll().statusDevice);
        } else {
          setDevice(item[0], item[1]);
          nameSpaceEspControll.emit("LED", getAll().statusDevice);
        }
      });

      socket.on("getChartData", () => {
        nameSpaceWebapp.emit("onCharts", getDataChart());
      });

      socket.on("getHistoryData", () => {
        nameSpaceWebapp.emit("sendDataLichsu", readFile());
      })

      socket.on("clientData", data => saveAuto(data))

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
    });
  }

  espSensor(nameSpaceEspSensor);
  espControll(nameSpaceEspControll);
  webapp(nameSpaceWebapp);
};
