const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");
const { getAll, statusEsp } = require("../saveData/modeAndDataAuto/create.mode");
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
  timeUp = 0;

function pingEsp(nameSpaceEspControll, nameSpaceEspSensor) {
  if (timeConnect === 2) {
    nameSpaceEspControll.emit("ping", "nam");
    nameSpaceEspSensor.emit("ping", "nam");
    timeConnect = 0;
  } else if (timeUp >= getAll().autoData.setTimePump.time * 120) timeUp = 0;
}

function checkEspConnected() {
  if(time.timeSecond()%9 === 0) {
    statusEsp("espControll", 0, "none", "none", "none", "none");
    statusEsp("espSensor", 0, "none", "none", "none", "none");
    console.log("test")
  }
}

function pushDataBase() {
  if ((parseInt(time.time().split(":")[1]) === 0 || parseInt(time.time().split(":")[1]) % 15 === 0) && time.timeSecond() == 00 && getAll().statusEsp.espSensor.status === true) {

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
  }
}

function writeDataHistory(nameSpaceWebapp) {
  if (
    readFile()[0].nhietdo !== getDataEsp().espSensor.statusDevice.temp ||
    readFile()[0].doam !== getDataEsp().espSensor.statusDevice.humi ||
    readFile()[0].anhsang !== getDataEsp().espSensor.statusDevice.light
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
    nameSpaceWebapp.emit("sendDataSensor", {
      dataTime: time.getTime(),
      dataTemp: getDataEsp().espSensor.statusDevice.temp,
      dataTemp1: getDataEsp().api.temp - 273.15,
      dataHumi: getDataEsp().espSensor.statusDevice.humi,
      dataHumi1: getDataEsp().api.humidity,
      dataLight: getDataEsp().espSensor.statusDevice.light,
    });
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
      if (getAll().mode === 0) {
        timeUp++;
        controllAutoDeviceByTemp(nameSpaceEspControll, nameSpaceWebapp, "Device4", "Device5")
        controllAutoDeviceByLux(nameSpaceEspControll, nameSpaceWebapp, "Device2", "Device3")
        controllAutoDeviceByTime(nameSpaceEspControll, nameSpaceWebapp, timeUp, "Device")
      }
      // checkEspConnected();
      pushDataBase();
      writeDataChart(nameSpaceWebapp);
      writeDataHistory(nameSpaceWebapp);
      timeGetApi();
      pingEsp(nameSpaceEspControll, nameSpaceEspSensor);
      checkDeviceEspReconnect(nameSpaceEspControll, getAll, getDataEsp);
    }, 1000);
  });
};
