const fs = require("fs");
const path = require("path");
const time = require("../../time/time");
const { getAll } = require("../../data/clientData/clientData");
const { fileSave, readFile } = require("../historyData/historyData");
const { pushTemp, pushHumi, pushLux } = require("../chartData/create.charts");
const { espData } = require("../../database/firebase");
const dataEsp = path.resolve(__dirname, "../espData/dataEsp.json");
let arrayDataLux = [];
let arrayDataTemp = [];
let arrayDataHumi = [];
let ketquatblight = 0;
let ketquatbnhietdo = 0;
let ketquatbdoam = 0;
let webapp;

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function pushDataOnDatabase(data) {
  espData.set(data);
}

function saveDataEspSensor(item) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  console.log(item.temp, item.humi);
  if (arrayDataLux.length < 1) {
    arrayDataLux.push(item.light);
    arrayDataTemp.push(item.temp);
    arrayDataHumi.push(item.humi);
  } else {
    for (var i = 0; i < arrayDataLux.length; i++) {
      ketquatblight += arrayDataLux[i];
      ketquatbnhietdo += arrayDataTemp[i];
      ketquatbdoam += arrayDataHumi[i];
    }
    data.espSensor.statusDevice.temp = roundToTwo(
      ketquatbnhietdo / arrayDataLux.length
    );
    data.espSensor.statusDevice.humi = roundToTwo(
      ketquatbdoam / arrayDataHumi.length
    );
    data.espSensor.statusDevice.light = roundToTwo(
      ketquatblight / arrayDataLux.length
    );
    arrayDataLux = [];
    arrayDataTemp = [];
    arrayDataHumi = [];
    ketquatblight = 0;
    ketquatbnhietdo = 0;
    ketquatbdoam = 0;
  }
  data.espSensor = {
    statusDevice: {
      temp: data.espSensor.statusDevice.temp,
      humi: data.espSensor.statusDevice.humi,
      light: data.espSensor.statusDevice.light,
      Device6: item.Device6,
    },
    statusSensor: {
      statusWater: item.statusWater,
      statusWater1: item.statusWater1,
      statusDHT: item.statusDHT,
      statusLux: item.statusLux,
    },
  };
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}

function pushEspInformationDataIntoJson(espName, informationData) {
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData[espName].espInformation = {
    ramUsed: informationData.ramLeft,
    cpuSpeed: informationData.clockCPU,
    IPAddress: informationData.ip,
    wifiStrength: informationData.signal,
  };

  pushDataOnDatabase(oldData);

  let newData = JSON.stringify(oldData);

  fs.writeFileSync(dataEsp, newData);

  getErrorDevicesList();
}

function pushDeviceStatusDataIntoJson(espName, data) {

  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData[espName].devicesStatus = data;

  let newData = JSON.stringify(oldData);
  fs.writeFileSync(dataEsp, newData);
  
}

function pushEspSensorDataIntoJson(dataName, data) {
  console.log(dataName, data);
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData.espSensorData.sensorData[dataName] = {
    data: data,
    time: time.getTime(),
  };

  switch (dataName) {
    case "temparetureInDoorData":
      pushTemp(
        data,
        time.getTime(),
        oldData.espData.espSensorData.sensorData.temparetureOutDoorData.data
      );
      webapp.emit("pushTemp", [
        data,
        time.getTime(),
        oldData.espData.espSensorData.sensorData.temparetureOutDoorData.data,
      ]);
      break;
    case "humidityInDoorData":
      pushHumi(
        data,
        time.getTime(),
        oldData.espData.espSensorData.sensorData.humidityOutDoorData.data
      );
      webapp.emit("pushHumi", [
        data,
        time.getTime(),
        oldData.espData.espSensorData.sensorData.humidityOutDoorData.data,
      ]);
      break;
    case "lightData":
      pushLux(data, time.getTime());
      webapp.emit("pushLux", [data, time.getTime()]);
      break;
  }

  fileSave(
    oldData.espData.espSensorData.sensorData,
    oldData.espData.espSensorData.sensorData,
    getAll().statusDevice
  );

  webapp.emit("sendDataLichsu", readFile());

  webapp.emit("sendDataSensor", {
    dataTemp: oldData.espData.espSensorData.sensorData.temparetureData,
    dataTemp1: oldData.api.temp,
    dataHumi: oldData.espData.espSensorData.sensorData.humidityData,
    dataHumi1: oldData.api.humidity,
    dataLight: oldData.espData.espSensorData.sensorData.lightData,
  });

  pushDataOnDatabase(oldData);

  let newData = JSON.stringify(oldData);
  fs.writeFileSync(dataEsp, newData);
}

function pushSensorStatusIntoJson(SensorName, status) {
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData.espSensorData.sensorStatus[SensorName] = status;

  pushDataOnDatabase(oldData);

  let newData = JSON.stringify(oldData);

  fs.writeFileSync(dataEsp, newData);

  getErrorDevicesList();
}

function pushEspConnectStatusIntoJson(espName, status) {
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData[espName].espConnectStatus = status;

  pushDataOnDatabase(oldData);

  let newData = JSON.stringify(oldData);
  fs.writeFileSync(dataEsp, newData);
}

function getWebappSocket(item) {
  webapp = item;
}

function getDataAll() {
  return JSON.parse(fs.readFileSync(dataEsp, "utf8"));
}

function saveDataApi(dataApi) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  data.api = dataApi;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}

function getEspDataFromDatabase(data) {
  fs.writeFileSync(dataEsp, JSON.stringify(data));
}

function getErrorDevicesList() {
  let arraySensorError = [];

  for (let i in getDataAll().espData.espSensorData.sensorStatus) {
    if (getDataAll().espData.espSensorData.sensorStatus[i] === 1) {
      arraySensorError.push(i);
    }
  }

  if (getDataAll().espData.espControllData.espConnectStatus === false) {
    arraySensorError.push("ESPCONTROLL");
  }

  if (getDataAll().espData.espSensorData.espConnectStatus === false) {
    arraySensorError.push("ESPSENSOR");
  }

  if (arraySensorError.length > 0) {
    webapp.emit("sendArraySensorError", arraySensorError);
  }

  webapp.emit("onMa1", getAll().statusDevice);
}

module.exports = {
  pushEspInformationDataIntoJson,
  pushDeviceStatusDataIntoJson,
  pushEspConnectStatusIntoJson,
  pushEspSensorDataIntoJson,
  pushSensorStatusIntoJson,
  getEspDataFromDatabase,
  getErrorDevicesList,
  saveDataEspSensor,
  getWebappSocket,
  saveDataApi,
  getDataAll,
};
