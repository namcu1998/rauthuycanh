const fs = require("fs");
const path = require("path");
const time = require("../../time/time");
const { historyData } = require("../../database/firebase");
let newId;
const dataHistory = path.resolve(__dirname, "../historyData/data.json");
function Object(
  nhietdo,
  doam,
  nhietdo1,
  doam1,
  light,
  time,
  device,
  device1,
  device2,
  device3,
  device4,
  device5,
  device6,
  device7
) {
  this.nhietdo = nhietdo;
  this.doam = doam;
  this.nhietdo1 = nhietdo1;
  this.doam1 = doam1;
  this.anhsang = light;
  this.thoigian = time;
  this.device1 = device1;
  this.device = device;
  this.device2 = device2;
  this.device3 = device3;
  this.device4 = device4;
  this.device5 = device5;
  this.device6 = device6;
  this.device7 = device7;
}
function fileSave(sensorData, devicesStatusData) {
  if (fs.readFileSync(dataHistory, "utf8")) {
    var data = JSON.parse(fs.readFileSync(dataHistory, "utf8"));

    if (data.length > 100) {
      data.splice(100, 1);
    }

    data.unshift(
      new Object(
        sensorData.temparetureInDoorData.data,
        sensorData.humidityInDoorData.data,
        sensorData.temparetureOutDoorData.data,
        sensorData.humidityOutDoorData.data,
        sensorData.lightData.data,
        time.getTime(),
        devicesStatusData.Device,
        devicesStatusData.Device1,
        devicesStatusData.Device2,
        devicesStatusData.Device3,
        devicesStatusData.Device4,
        devicesStatusData.Device5,
        devicesStatusData.Device6,
        devicesStatusData.Device7
      )
    );

    historyData.set(data);

    var data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory, data1);
  } else {
    let data = [];
    data.push(
      new Object(
        sensorData.temparetureInDoorData.data,
        sensorData.humidityInDoorData.data,
        sensorData.temparetureOutDoorData.data,
        sensorData.humidityOutDoorData.data,
        sensorData.lightData.data,
        time.getTime(),
        devicesStatusData.Device,
        devicesStatusData.Device1,
        devicesStatusData.Device2,
        devicesStatusData.Device3,
        devicesStatusData.Device4,
        devicesStatusData.Device5,
        devicesStatusData.Device6,
        devicesStatusData.Device7
      )
    );

    let data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory, data1);
  }
}

function readFile() {
  let data = JSON.parse(fs.readFileSync(dataHistory, "utf8"));
  return data;
}

function getHistoryDataFromDatabase(data) {
  fs.writeFileSync(dataHistory, JSON.stringify(data));
}

module.exports = {
  getHistoryDataFromDatabase,
  fileSave,
  readFile,
};
