const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");
const { getAll } = require("../saveData/modeAndDataAuto/create.mode");
const getDataApiAsync = require("../api/api");
const time = require("../time/time");
const { dulieuDb, data1, dulieubieudo } = require("../database/firebase");
const { pushTemp, pushHumi, pushLux, getDataChart, saveDb } = require("../saveData/createDataCharts/create.charts");
const {
  fileSave,
  readFile,
} = require("../saveData/read.database/write.database");
const {
  controllAutoDeviceByLux,
  controllAutoDeviceByTime,
  controllAutoDeviceByTemp
} = require("../autoFunction/auto");
let timeConnect = 0,
  timePushDb = 0,
  timeUp = 0,
  dataApi = {};

function pingEsp(nameSpaceEspControll, nameSpaceEspSensor) {
  if (timeConnect === 2) {
    nameSpaceEspControll.emit("ping", "nam");
    nameSpaceEspSensor.emit("ping", "nam");
    timeConnect = 0;
  } else if (timeUp >= getAll().autoData.setTimePump * 120) timeUp = 0;
}

function pushDataBase() {
  if (timePushDb > 3600 && ) {
    dulieuDb.push([
      getDataEsp().espSensor.statusDevice.temp,
      getDataEsp().espSensor.statusDevice.humi,
      getDataEsp().api.temp - 273.15,
      getDataEsp().api.humidity,
      getDataEsp().espSensor.statusDevice.light,
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
}

function writeDataHistory(nameSpaceWebapp) {
  if (
    readFile()[0].nhietdo !== getDataEsp().espSensor.statusDevice.temp ||
    readFile()[0].doam !== getDataEsp().espSensor.statusDevice.humi ||
    readFile()[0].light !== getDataEsp().espSensor.statusDevice.light
  ) {
    fileSave(
      getDataEsp().espSensor.statusDevice.temp,
      getDataEsp().espSensor.statusDevice.humi,
      getDataEsp().api.temp - 273.15,
      getDataEsp().api.humidity,
      getDataEsp().espSensor.statusDevice.light,
      time.getTime(),
      getAll().statusDevice.Device.Device,
      getAll().statusDevice.Device.Device1,
      getAll().statusDevice.Device.Device2,
      getAll().statusDevice.Device.Device3,
      getAll().statusDevice.Device.Device4,
      getAll().statusDevice.Device.Device5
    );
    nameSpaceWebapp.emit("sendDataLichsu", readFile());
  }
}

function writeDataChart(nameSpaceWebapp) {
  if (
    getDataChart().dataTemp[getDataChart().dataTemp.length - 1].nhietdo !==
    getDataEsp().espSensor.statusDevice.temp
  ) {
    nameSpaceWebapp.emit(
      "pushTemp",
      pushTemp(
        getDataEsp().espSensor.statusDevice.temp,
        time.time(),
        getDataEsp().api.temp
      )
    );
    dulieubieudo.set(getDataChart());
  }
  if (
    getDataChart().dataHumi[getDataChart().dataHumi.length - 1].doam !==
    getDataEsp().espSensor.statusDevice.humi
  ) {
    nameSpaceWebapp.emit(
      "pushHumi",
      pushHumi(
        getDataEsp().espSensor.statusDevice.humi,
        time.time(),
        getDataEsp().api.humidity
      )
    );
    dulieubieudo.set(getDataChart());
  }
  if (
    getDataChart().dataLux[getDataChart().dataLux.length - 1].anhsang !==
    getDataEsp().espSensor.statusDevice.light
  ) {
    console.log("om");
    nameSpaceWebapp.emit(
      "pushLux",
      pushLux(getDataEsp().espSensor.statusDevice.light, time.time())
    );
    dulieubieudo.set(getDataChart());
  }
}

function checkDeviceEspReconnect(nameSpaceEspControll, getAll, getDataEsp) {
  if (
    getAll().statusDevice.Device.Device !=
      getDataEsp().espControll.statusDevice.Device ||
    getAll().statusDevice.Device.Device1 !=
      getDataEsp().espControll.statusDevice.Device1 ||
    getAll().statusDevice.Device.Device2 !=
      getDataEsp().espControll.statusDevice.Device2 ||
    getAll().statusDevice.Device.Device3 !=
      getDataEsp().espControll.statusDevice.Device3 ||
    getAll().statusDevice.Device.Device4 !=
      getDataEsp().espControll.statusDevice.Device4 ||
    getAll().statusDevice.Device.Device5 !=
      getDataEsp().espControll.statusDevice.Device5
  ) {
    nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
  }
}

function timeGetApi() {
  if (getDataEsp().api.temp === undefined) {
    getDataApiAsync();
  }
  if (time.timeDay()[1][1] === 0 || time.timeDay()[1][1] % 10 === 0) {
    getDataApiAsync();
  }
}

module.exports = function loopSync(
  nameSpaceEspControll,
  nameSpaceEspSensor,
  nameSpaceWebapp
) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      timeConnect++;
      timePushDb++;
      if (getAll().mode === 0) {
        timeUp++;
        controllAutoDeviceByTemp(nameSpaceEspControll, nameSpaceWebapp, "Device4", "Device5")
        controllAutoDeviceByLux(nameSpaceEspControll, nameSpaceWebapp, "Device2", "Device3")
        controllAutoDeviceByTime(nameSpaceEspControll, nameSpaceWebapp, timeUp, "Device")
      }
      pushDataBase();
      writeDataChart(nameSpaceWebapp);
      writeDataHistory(nameSpaceWebapp);
      timeGetApi();
      pingEsp(nameSpaceEspControll, nameSpaceEspSensor);
      checkDeviceEspReconnect(nameSpaceEspControll, getAll, getDataEsp);
    }, 1000);
  });
};
