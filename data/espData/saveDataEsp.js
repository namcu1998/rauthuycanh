const fs = require("fs");
const path = require("path");
const time = require("../../time/time");
const {
  getAll,
  setDevice,
  saveAuto,
  editAuto,
} = require("../../data/clientData/clientData");
const { fileSave, readFile } = require("../historyData/historyData");
const { writeDataIntoJson } = require("../chartData/create.charts");
const { espData } = require("../../database/firebase");
const dataEsp = path.resolve(__dirname, "../espData/dataEsp.json");
let arrayDataLux = [];
let arrayDataTemp = [];
let arrayDataHumi = [];
let ketquatblight = 0;
let ketquatbnhietdo = 0;
let ketquatbdoam = 0;
let webapp, controll, sensor;

let waterDevice = ["Device"];

let waterDevice1 = ["Device4", "Device5"];

let lightDevice = ["Device2", "Device3"];

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
    upTime: informationData.uptime,
    numberOfRestart: informationData.numberOfRestart
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
  
  const { sensorData } = oldData.espData.espSensorData;
  
  let newData = sensorData.map(item => {
    if (item.id === dataName) {
      return {
        ...item,
        value: data,
        time: time.getTime(),
        isValueUp: data > item.value ? true : false,
        surplusValue: data - item.value,
      }
    }
    return item;
  })
  
  oldData.espData.espSensorData.sensorData = [...newData
  ];

  switch (dataName) {
    case "temperatureInDoorData":
      writeDataIntoJson(
        "Temperature",
        data,
        time.getTime(),
        sensorData.find(item => item.id === "temperatureOutDoorData").value
      );
      break;
    case "humidityInDoorData":
      writeDataIntoJson(
        "Humidity",
        data,
        time.getTime(),
        sensorData.find(item => item.id === "humidityOutDoorData").value
      );
      break;
    case "lightData":
      writeDataIntoJson("Light", data, time.getTime(), data);
      break;
    case "mq135Data":
      writeDataIntoJson("Air", data, time.getTime(), data);
      break;
  }

  fileSave(
    oldData.espData.espSensorData.sensorData,
    getAll().statusDevice
  );

  pushDataOnDatabase(oldData);

  let json = JSON.stringify(oldData);
  fs.writeFileSync(dataEsp, json);
}

function pushSensorStatusIntoJson(SensorName, status) {
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  oldData.espData.espSensorData.sensorStatus[SensorName] = status;

  pushDataOnDatabase(oldData);

  switch (SensorName) {
    case "waterSensorStatus":
      let pumpData = getAll().autoData.setTimePump;
      if (status === 1) {
        editAuto("setTimePump", false);
        for (let i of waterDevice) {
          setDevice(i, 0);
        }
      }
      controll.emit("LED", getAll().statusDevice);
      break;
    case "waterSensorStatus1":
      if (status === 1) {
        editAuto("setTemp", false);
        for (let i of waterDevice1) {
          setDevice(i, 0);
        }
      }
      controll.emit("LED", getAll().statusDevice);
      break;
    case "dht11Status":
      if (status === 1) {
        editAuto("setTemp", false);
        for (let i of waterDevice1) {
          setDevice(i, 0);
        }
      }
      controll.emit("LED", getAll().statusDevice);
      break;
    case "bh1750Status":
      if (status === 1) {
        editAuto("setLux", false);
        for (let i of lightDevice) {
          setDevice(i, 0);
        }
      }
      controll.emit("LED", getAll().statusDevice);
      break;
  }

  let newData = JSON.stringify(oldData);

  fs.writeFileSync(dataEsp, newData);
  getErrorDevicesList();
}

function pushEspConnectStatusIntoJson(espName, status) {
  let oldData = JSON.parse(fs.readFileSync(dataEsp, "utf8"));

  if (oldData.espData[espName].espConnectStatus !== status) {

    console.log(oldData.espData[espName].espConnectStatus, status)

    oldData.espData[espName].espConnectStatus = status;

    
    pushDataOnDatabase(oldData);

    let newData = JSON.stringify(oldData);
    fs.writeFileSync(dataEsp, newData);
    getErrorDevicesList();

  }
}

function getSocket(web, esp, esp1) {
  webapp = web;
  controll = esp;
  sensor = esp1;
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
  let arraySensorError = {
    bh1750Status: getDataAll().espData.espSensorData.sensorStatus.bh1750Status,
    dht11Status: getDataAll().espData.espSensorData.sensorStatus.dht11Status,
    waterSensorStatus: getDataAll().espData.espSensorData.sensorStatus.waterSensorStatus,
    waterSensorStatus1: getDataAll().espData.espSensorData.sensorStatus.waterSensorStatus1,
    espControllData: getDataAll().espData.espControllData.espConnectStatus,
    espSensorData: getDataAll().espData.espSensorData.espConnectStatus};

  console.log("error")

  webapp.emit("sendArraySensorError", arraySensorError);
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
  getSocket,
  saveDataApi,
  getDataAll,
};
