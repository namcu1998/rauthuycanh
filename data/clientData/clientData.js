const fs = require("fs");
const path = require("path");
const { clientData } = require("../../database/firebase");
let saveDb, nameSpaceWebapp, nameSpaceEspSensor, nameSpaceEspControll;
const dataModeAuto = path.resolve(__dirname, "../clientData/clientData.json");

function saveAuto(auto) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.autoData = auto;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
}

function editAuto(name, active) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.autoData[name].active = active;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
}

function setDevice(nameDevice, statusDevice) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  if (nameDevice === "Device3" && statusDevice === 1) {
    data.statusDevice.Device2 = 0;
  }
  if (nameDevice === "Device2" && statusDevice === 1) {
    data.statusDevice.Device3 = 0;
  }
  data.statusDevice[nameDevice] = statusDevice;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
  nameSpaceWebapp.emit("feedbackDevice", data.statusDevice);
  nameSpaceEspControll.emit("LED", getAll().statusDevice);
}

function vegetableData(id) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));

  data.vegetable.map((item) => {
    if (parseInt(id) === item.id) {
      data.vegetableId = id;
      data.autoData = {
        setLux: {
          active: true,
          deviceOnMax: data.autoData.setLux.deviceOnMax,
          deviceOnMin: data.autoData.setLux.deviceOnMin,
          max: item.maxLight,
          min: item.minLight,
        },
        setTemp: {
          active: true,
          deviceOnMax: data.autoData.setTemp.deviceOnMax,
          deviceOnMin: data.autoData.setTemp.deviceOnMin,
          max: item.maxTemp,
          min: item.minTemp,
        },
        setTimePump: {
          active: true,
          deviceOnMax: data.autoData.setTimePump.deviceOnMax,
          time: item.TimePump,
        },
      };
    }
  });

  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);

  nameSpaceWebapp.emit("autoData", data.autoData);
}

function getAll() {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  return data;
}

function saveAll(dataDB) {
  var array1 = JSON.stringify(dataDB);
  fs.writeFileSync(dataModeAuto, array1);
}

function pushDb(item) {
  saveDb = item;
}

function getnameSpace(webapp, esp, esp1) {
  nameSpaceWebapp = webapp;
  nameSpaceEspControll = esp;
  nameSpaceEspConSensor = esp1;
}

function getClientDataFromDatabase(data) {
  fs.writeFileSync(dataModeAuto, JSON.stringify(data));
}

module.exports = {
  getClientDataFromDatabase,
  vegetableData,
  getnameSpace,
  setDevice,
  saveAuto,
  editAuto,
  saveAll,
  getAll,
  pushDb,
};
